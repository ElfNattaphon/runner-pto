<template>
  <teleport to="body">
    <div class="fixed z-[1000] top-4 right-4 space-y-3 w-[min(92vw,360px)]">
      <div v-for="t in ui.toasts" :key="t.id"
        class="rounded-xl border shadow-soft p-4 backdrop-blur text-sm"
        :class="boxCls(t.type)">
        <div class="flex items-start gap-3">
          <div class="text-lg">
            <span v-if="t.type==='success'">✅</span>
            <span v-else-if="t.type==='error'">⚠️</span>
            <span v-else>🔔</span>
          </div>
          <div class="flex-1">
            <div class="font-semibold" v-if="t.title">{{ t.title }}</div>
            <div class="text-gray-200/90">{{ t.message }}</div>
          </div>
          <button class="opacity-70 hover:opacity-100" @click="ui.remove(t.id)">✖</button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
const ui = useUiStore()
const boxCls = (type: 'success'|'error'|'info') => {
  if (type === 'success') return 'bg-emerald-600/20 border-emerald-400/30 text-emerald-100'
  if (type === 'error') return 'bg-rose-600/20 border-rose-400/30 text-rose-100'
  return 'bg-skyx-600/20 border-skyx-400/30 text-skyx-100'
}
</script>
