<template>
  <Card>
    <div class="text-sm text-gray-400">{{ title }}</div>
    <div class="text-2xl font-semibold text-white mt-1">{{ value }}</div>
    <div v-if="sub" class="text-xs text-gray-500 mt-1">{{ sub }}</div>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
const props = defineProps<{ title: string; value: string; sub?: string }>()
</script>
