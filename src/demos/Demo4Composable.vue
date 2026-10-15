<script setup>
import { ref } from 'vue'
import CityPicker from '../components/CityPicker.vue'
import WeatherCard from '../components/WeatherCard.vue'

const selected = ref('Atlanta')
</script>

<template>
  <section class="demo">
    <h2>Demo 4 · Extract a Composable</h2>

    <div class="split">
      <CityPicker :selected="selected" @city-selected="selected = $event" />
      <WeatherCard :city="selected" />
    </div>

    <p class="hint">[7] Modules &amp; exports · [10] Event handling</p>
  </section>
</template>
