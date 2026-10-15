<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  city: { type: String, required: true },
})

const weather = ref(null)
const loading = ref(false)
const error = ref(null)

// DEMO 4 (slide 48): cut these refs and load() into composables/useWeather.js
async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(props.city)}`)
    // fetch only rejects on network failure. A 404 still "succeeds".
    if (!res.ok) {
      throw new Error(
        res.status === 404
          ? `No weather found for "${props.city}". Try Atlanta, Kingston or Nairobi.`
          : `Weather request failed (HTTP ${res.status})`,
      )
    }
    weather.value = await res.json()
  } catch (e) {
    weather.value = null
    error.value = e.message
  } finally {
    // runs on success AND failure, so loading always turns off
    loading.value = false
  }
}

onMounted(load)
watch(() => props.city, load)
</script>

<template>
  <article class="card" aria-live="polite">
    <p v-if="loading" class="status">Loading weather for {{ city }}…</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <template v-else>
      <h3>{{ weather?.city ?? city }}</h3>
      <p class="temp">{{ weather?.current?.temp ?? '--' }}°C</p>
      <p class="condition">{{ weather?.current?.condition ?? 'No current conditions reported' }}</p>
    </template>
  </article>
</template>
