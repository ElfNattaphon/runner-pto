<template>
  <span :class="['chip', cls]">{{ label }}</span>
</template>
<script setup lang="ts">
const props = defineProps<{ type: 'E'|'M'|'T'|'I'|'R'|'Rest'|'Race'|'LR' }>()
const map = {
  E:'chip-E', M:'chip-M', T:'chip-T', I:'chip-I', R:'chip-R', Rest:'chip-Rest', Race:'chip-Race', LR:'chip-LR'
} as Record<string,string>
const labels = { E:'Easy', M:'Marathon', T:'Tempo', I:'Intervals', R:'Reps', Rest:'Rest', Race:'Race', LR:'Long Run' } as Record<string,string>
const cls = computed(()=> map[props.type] || 'chip')
const label = computed(()=> labels[props.type] || props.type)
</script>
