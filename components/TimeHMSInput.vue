<template>
  <div class="flex items-center gap-2">
    <input ref="hRef" type="number" inputmode="numeric" min="0" placeholder="hh" class="form-input w-20 text-center"
      :value="h" @input="onNum('h', $event)" @keydown="onKey('h', $event)" />
    <span>:</span>
    <input ref="mRef" type="number" inputmode="numeric" min="0" max="59" placeholder="mm" class="form-input w-16 text-center"
      :value="m" @input="onNum('m', $event)" @keydown="onKey('m', $event)" />
    <span>:</span>
    <input ref="sRef" type="number" inputmode="numeric" min="0" max="59" placeholder="ss" class="form-input w-16 text-center"
      :value="s" @input="onNum('s', $event)" @keydown="onKey('s', $event)" />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue?: number | null }>(), { modelValue: null })
const emit = defineEmits(['update:modelValue'])
const hRef = ref<HTMLInputElement|null>(null)
const mRef = ref<HTMLInputElement|null>(null)
const sRef = ref<HTMLInputElement|null>(null)
const h = computed(() => Math.floor((props.modelValue ?? 0) / 3600))
const m = computed(() => Math.floor(((props.modelValue ?? 0) % 3600) / 60))
const s = computed(() => Math.floor((props.modelValue ?? 0) % 60))
function clamp(n: number, min: number, max: number) { return Math.min(max, Math.max(min, n)) }
function toSecs(hh: number, mm: number, ss: number) {
  const H = clamp(hh, 0, 99999), M = clamp(mm, 0, 59), S = clamp(ss, 0, 59)
  return H * 3600 + M * 60 + S
}
function onNum(field: 'h'|'m'|'s', e: Event) {
  const val = Number((e.target as HTMLInputElement).value || 0)
  const next = { h: h.value, m: m.value, s: s.value }; (next as any)[field] = val
  emit('update:modelValue', toSecs(next.h, next.m, next.s))
  const target = e.target as HTMLInputElement
  if (field === 'm' && target.value.length >= 2) sRef.value?.focus()
}
function onKey(field: 'h'|'m'|'s', e: KeyboardEvent) {
  if (e.key === 'Backspace' && (e.target as HTMLInputElement).selectionStart === 0) {
    if (field === 'm') hRef.value?.focus(); if (field === 's') mRef.value?.focus()
  }
}
</script>
