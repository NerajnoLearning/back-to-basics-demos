<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  city: { type: String, required: true },
})

const weather = ref(null)
const loading = ref(false)
const error = ref(null)

// DEMO 3 · Weather card (slide 39)
// 1. async/await: fetch(`/api/weather?city=${encodeURIComponent(props.city)}`)
// 2. loading: true before the fetch, false after
// 3. try/catch/finally + check res.ok (fetch does NOT reject on a 404)
// 4. Search "Brigadoon" and "Atlantis": the template must never throw
async function load() {
  // TODO
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
