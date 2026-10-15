# Back to Basics · Live Demos

Demo code for **"Back to Basics: Essential JavaScript Foundations for Modern Framework Development"** by Nerando Johnson ([@Nerajno](https://developingdvlpr.com)), TechBash 2026.

Four small Vue 3.5 demos, each showing that the "Vue bug" is usually a JavaScript bug. Everything runs locally. The weather data comes from a mock built into the dev server, so you never need Wi-Fi or an API key.

## Run it

```bash
npm install     # do this at home, on good Wi-Fi
npm run dev     # works offline after that
```

Open the URL Vite prints. Use the tabs, or jump straight to a demo with `#demo-1` … `#demo-4` at the end of the URL.

Needs Node 20+ and a browser from 2023 or later (`toSorted()` is used in Demo 2).

## Branches

Each branch is the starting point for one live demo. The branches build on each other in talk order, so `demo-3-start` already has Demos 1 and 2 solved.

| Branch | Slide | What you build live | Fundamentals |
|---|---|---|---|
| `demo-1-start` | 25 · Fix the Stale Value | Swap `let { count } = state` for `toRefs(state)` | [1] Variables · [4] Destructuring |
| `demo-2-start` | 31 · Filtered List | `filter()` → `map()` → `toSorted()` in a `computed()` | [3] Arrow functions · [5] Array methods |
| `demo-3-start` | 39 · Weather Card | `async`/`await`, loading state, `try`/`catch`/`finally`, `res.ok` | [6] Promises · [9] Optional chaining · [11] Error handling |
| `demo-4-start` | 48 · Extract a Composable | Move the fetch into `useWeather()`, emit `city-selected` | [7] Modules · [10] Events |
| `main` | | All four solved | |

See exactly what each demo adds:

```bash
git diff demo-1-start demo-2-start   # Demo 1 solution
git diff demo-2-start demo-3-start   # Demo 2 solution
git diff demo-3-start demo-4-start   # Demo 3 solution
git diff demo-4-start main           # Demo 4 solution
```

## The weather mock

`vite.config.js` adds a small `/api/weather` endpoint backed by `mock/weather.json`.

| Request | Response | Use it to show |
|---|---|---|
| `?city=Atlanta` | 200 + data | The happy path |
| `?city=Reykjavik` | 200, `temp: 0` | Why `??` beats `||` (0° is real) |
| `?city=Brigadoon` | 200, no `current` | Optional chaining keeps the template alive |
| `?city=Atlantis` | 404 | `fetch` doesn't reject on 404, so check `res.ok` |

Every response waits 600 ms so the loading state is visible. Add `&delay=0` to skip it, or `&delay=3000` to make it obvious. The JSON file is re-read on every request, so you can edit it mid-demo.

## If a demo breaks on stage

```bash
git stash            # park whatever you typed
git checkout demo-N-start   # N = the next demo
```

Then keep talking. The next branch already contains the solution to the demo that broke. See [docs/DEMO-SCRIPT.md](docs/DEMO-SCRIPT.md) for the step-by-step run sheet.

## Deliberate simplifications

This is talk code, trimmed to fit a slide and a 4-minute demo:

- No request cancellation. If you click cities very fast, an older response can land last.
- Cities and weather are hard-coded. Swap the mock for the free [Open-Meteo API](https://open-meteo.com/) if you want live data after the talk.
- Plain JavaScript, no TypeScript, so the JavaScript stays front and center.

## More

- Companion article: [11 JavaScript Fundamentals for Vue Developers](https://developingdvlpr.com/blog/11-javascript-fundamentals-for-vue-developers)
- Slides: [slides.developingdvlpr.com](https://slides.developingdvlpr.com)

Progress over perfection.
