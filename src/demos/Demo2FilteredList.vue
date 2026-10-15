<script setup>
import { ref, computed } from 'vue'
import cities from '../data/cities.js'

const query = ref('')

// Computed should READ, never mutate.
// toSorted() returns a new array; sort() would reorder `cities` itself.
const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return cities
    .filter((c) => c.name.toLowerCase().includes(q))
    .map((c) => ({ ...c, label: `${c.name}, ${c.country}` }))
    .toSorted((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <section class="demo">
    <h2>Demo 2 · Filtered List</h2>

    <div class="row">
      <label for="city-search">Search cities</label>
      <input id="city-search" v-model="query" type="search" autocomplete="off" />
    </div>

    <p>{{ visible.length }} of {{ cities.length }} cities</p>
    <ul class="list">
      <li v-for="c in visible" :key="c.id">{{ c.label ?? c.name }}</li>
    </ul>

    <details>
      <summary>Source array (original order)</summary>
      <ol>
        <li v-for="c in cities" :key="c.id">{{ c.name }}</li>
      </ol>
    </details>

    <p class="hint">[3] Arrow functions · [5] Array methods</p>
  </section>
</template>
