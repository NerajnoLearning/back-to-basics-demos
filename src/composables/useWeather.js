import { ref, watch, toValue } from 'vue'

/**
 * Fetches current weather for a city from the local /api/weather mock.
 * A composable is just a function in a module. No magic.
 *
 * @param {string | import('vue').Ref<string> | (() => string)} city
 *   A plain string, a ref, or a getter. Getters and refs refetch when they change.
 */
export function useWeather(city) {
  const weather = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    const name = toValue(city)
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(name)}`)
      // fetch only rejects on network failure. A 404 still "succeeds".
      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? `No weather found for "${name}". Try Atlanta, Kingston or Nairobi.`
            : `Weather request failed (HTTP ${res.status})`,
        )
      }
      weather.value = await res.json()
    } catch (e) {
      weather.value = null
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // Replaces onMounted + watch: run now, and again whenever the city changes.
  watch(() => toValue(city), load, { immediate: true })

  return { weather, loading, error, reload: load }
}
