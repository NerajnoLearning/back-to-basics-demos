import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const MOCK_FILE = fileURLToPath(new URL('./mock/weather.json', import.meta.url))

// "San José" and "san jose" should find the same entry.
const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase()

// Local stand-in for a weather API, so no demo depends on conference Wi-Fi.
//   GET /api/weather?city=Atlanta          → 200 + JSON
//   GET /api/weather?city=Atlantis         → 404 + { error }
//   GET /api/weather?city=Atlanta&delay=0  → skip the fake network delay
export function weatherMock() {
  const handler = (req, res, next) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname !== '/api/weather') return next()

    // Re-read on every request so you can edit the JSON mid-talk.
    const data = JSON.parse(readFileSync(MOCK_FILE, 'utf8'))
    const city = normalize(url.searchParams.get('city') ?? '')
    const entry = data[city]
    const delay = Number(url.searchParams.get('delay') ?? 600)

    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json')
      if (!entry) {
        res.statusCode = 404
        res.end(JSON.stringify({ error: `No weather data for "${city}"` }))
        return
      }
      res.end(JSON.stringify(entry))
    }, Number.isFinite(delay) ? delay : 600)
  }

  return {
    name: 'weather-mock',
    configureServer(server) { server.middlewares.use(handler) },
    configurePreviewServer(server) { server.middlewares.use(handler) },
  }
}

export default defineConfig({
  plugins: [vue(), weatherMock()],
})
