<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
let { count } = state
const increment = () => state.count++

// DEMO 1 · Fix the stale value (slide 25)
// 1. Click the button. It stays at 0. Vue bug or JavaScript bug?
// 2. console.log(typeof count)   → "number", not a ref
// 3. Fix 1: read state.count in the template
// 4. Fix 2: import toRefs and use  const { count } = toRefs(state)
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
