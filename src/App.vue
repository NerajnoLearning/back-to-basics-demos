<script setup>
import { ref, computed } from 'vue'
import Demo1Counter from './demos/Demo1Counter.vue'
import Demo2FilteredList from './demos/Demo2FilteredList.vue'
import Demo3Weather from './demos/Demo3Weather.vue'
import Demo4Composable from './demos/Demo4Composable.vue'

const demos = [
  { id: 'demo-1', label: '1 · Stale value', component: Demo1Counter },
  { id: 'demo-2', label: '2 · Filtered list', component: Demo2FilteredList },
  { id: 'demo-3', label: '3 · Weather card', component: Demo3Weather },
  { id: 'demo-4', label: '4 · Composable', component: Demo4Composable },
]

// #demo-3 in the URL opens straight to that demo.
const active = ref(window.location.hash.slice(1) || 'demo-1')
const current = computed(() => demos.find((d) => d.id === active.value) ?? demos[0])

function select(id) {
  active.value = id
  history.replaceState(null, '', `#${id}`)
}
</script>

<template>
  <header class="app-header">
    <h1>Back to Basics · Demos</h1>
    <nav class="tabs" aria-label="Demos">
      <button
        v-for="d in demos"
        :key="d.id"
        type="button"
        :aria-current="d.id === current.id ? 'page' : undefined"
        @click="select(d.id)"
      >
        {{ d.label }}
      </button>
    </nav>
  </header>

  <main>
    <component :is="current.component" />
  </main>
</template>
