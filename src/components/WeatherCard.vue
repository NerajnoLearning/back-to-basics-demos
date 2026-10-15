<script setup>
import { useWeather } from '../composables/useWeather.js'

const props = defineProps({
  city: { type: String, required: true },
})

// Pass a getter so the composable refetches when the prop changes.
const { weather, loading, error } = useWeather(() => props.city)
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
