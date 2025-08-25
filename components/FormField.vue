<template>
  <div>
    <label class="form-label">{{ label }}</label>
    <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" class="form-input" />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ label: string; modelValue?: any }>(), { modelValue: '' })
const emit = defineEmits(['update:modelValue'])
</script>
