<script setup>
import { ref } from 'vue'
import WeatherCard from '../components/WeatherCard.vue'

const draft = ref('Atlanta')
const city = ref('Atlanta')

const search = () => {
  city.value = draft.value.trim() || city.value
}
</script>

<template>
  <section class="demo">
    <h2>Demo 3 · Weather Card</h2>

    <form class="row" @submit.prevent="search">
      <label for="city-input">City</label>
      <input id="city-input" v-model="draft" autocomplete="off" />
      <button type="submit" class="primary">Get weather</button>
    </form>

    <WeatherCard :city="city" />

    <p class="hint">
      Try: Atlanta · Reykjavik (a real 0°) · Brigadoon (no current data) · Atlantis (404)
      <br />[6] Promises · [9] Optional chaining · [11] Error handling
    </p>
  </section>
</template>
