<script setup>
import cities from '../data/cities.js'

defineProps({
  selected: { type: String, default: '' },
})

// Declaring the event documents this component's API.
const emit = defineEmits(['city-selected'])
</script>

<template>
  <ul class="picker" aria-label="Cities">
    <li v-for="c in cities" :key="c.id">
      <button
        type="button"
        :aria-pressed="c.name === selected"
        @click="emit('city-selected', c.name)"
      >
        {{ c.name }}
      </button>
    </li>
  </ul>
</template>
