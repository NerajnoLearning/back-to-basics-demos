# Demo Run Sheet

Keep this open on the laptop, not the projector. Editor at 22pt+, high-contrast theme, notifications off.

**Before the talk:** `npm install` at home. On the day, run `git checkout demo-1-start && npm run dev` and open `#demo-1`. Do a full click-through 30 minutes before.

---

## Demo 1 · Fix the Stale Value (4 min, by 20:00)

Branch: `demo-1-start` · File: `src/demos/Demo1Counter.vue` · Tab: `#demo-1`

1. Click the button a few times. It stays at **0**. Ask the room: Vue bug or JavaScript bug?
2. Add `console.log(typeof count)` under the destructuring line. Show the console: `"number"`.
3. **Fix 1:** change the template to `{{ state.count }}`. Click. It works.
4. Undo Fix 1. **Fix 2:** `import { reactive, toRefs } from 'vue'` and `const { count } = toRefs(state)`. Click. It works, and `count` is now a ref.

Say: destructuring copied a number. `toRefs` gives you refs that stay linked to the source.

**Rescue:** `git stash && git checkout demo-2-start`

---

## Demo 2 · Filtered List (3 min)

Branch: `demo-2-start` · File: `src/demos/Demo2FilteredList.vue` · Tab: `#demo-2`

1. Show the unsorted list and the empty search box.
2. Add `filter()`: `const q = query.value.trim().toLowerCase()` then `cities.filter(c => c.name.toLowerCase().includes(q))`. Type "an".
3. Chain `map()`: `.map(c => ({ ...c, label: \`${c.name}, ${c.country}\` }))`. The labels appear.
4. Chain `.toSorted((a, b) => a.name.localeCompare(b.name))`. Open **Source array**: still in the original order.

Say: computed should READ, never mutate. `sort()` would have reordered the source.

**Checkpoint:** you should be into Act 3 by 28:00. If not, start cutting (backup slide).

**Rescue:** `git stash && git checkout demo-3-start`

---

## Demo 3 · Weather Card (4 min, by 38:00)

Branch: `demo-3-start` · File: `src/components/WeatherCard.vue` · Tab: `#demo-3`

1. Fill in `load()` with `async`/`await`: fetch `/api/weather?city=...`, then `weather.value = await res.json()`. Atlanta shows up.
2. Add `loading.value = true` before and `false` after. Point out the 600 ms loading message.
3. Search **Atlantis**. Blank or broken. Wrap in `try`/`catch`/`finally`, add `if (!res.ok) throw new Error(...)`. Search again: friendly error.
4. Search **Brigadoon** (no `current`): the card shows `--` instead of throwing. Briefly delete a `?.` to show the TypeError, then put it back.
5. Bonus if time: **Reykjavik** shows a real `0°`. With `||` it would show `--`.

**Rescue:** `git stash && git checkout demo-4-start`

---

## Demo 4 · Extract a Composable (3 min, by 45:00)

Branch: `demo-4-start` · Files: `src/components/WeatherCard.vue`, new `src/composables/useWeather.js`, `src/components/CityPicker.vue` · Tab: `#demo-4`

1. In `WeatherCard.vue`, cut the three refs and `load()`.
2. Create `src/composables/useWeather.js`, paste them inside `export function useWeather(city) { ... }`, swap `props.city` for `toValue(city)`, replace `onMounted` + `watch` with `watch(() => toValue(city), load, { immediate: true })`, and `return { weather, loading, error }`.
3. Back in the card: `const { weather, loading, error } = useWeather(() => props.city)`. The script shrinks to a few lines.
4. In `CityPicker.vue`: `const emit = defineEmits(['city-selected'])` and `@click="emit('city-selected', c.name)"` on the button. Click cities: the card follows.

**If running long:** skip typing. `git checkout main` and walk through `useWeather.js` as a code reveal (~2 min).
