<script setup>
import cities from '../data/cities.js'

defineProps({
  selected: { type: String, default: '' },
})

// DEMO 4, step 4 (slide 48): announce the choice to the parent
//   const emit = defineEmits(['city-selected'])
//   then on the button: @click="emit('city-selected', c.name)"
</script>

<template>
  <ul class="picker" aria-label="Cities">
    <li v-for="c in cities" :key="c.id">
      <button type="button" :aria-pressed="c.name === selected">
        {{ c.name }}
      </button>
    </li>
  </ul>
</template>
