<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0 })

// Plain destructuring copies the number out of the proxy:
//   let { count } = state      → typeof count === 'number', never updates
// toRefs gives each property a ref linked back to `state`.
const { count } = toRefs(state)
const increment = () => state.count++
</script>

<template>
  <section class="demo">
    <h2>Demo 1 · Fix the Stale Value</h2>
    <button type="button" class="big-button" @click="increment">
      Clicked {{ count }} times
    </button>
    <p class="hint">[1] Variables &amp; data types · [4] Destructuring</p>
  </section>
</template>
