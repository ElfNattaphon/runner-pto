<template>
  <aside v-if="user" class="hidden md:block w-72 border-r border-white/10 bg-ink-800/70 backdrop-blur p-4 space-y-2 rounded-2xl">
    <div class="text-xs uppercase tracking-wide text-gray-400 px-2">Navigation</div>
    <NuxtLink class="nav-item" to="/">🏠 Dashboard</NuxtLink>
    <NuxtLink class="nav-item" to="/planner">🧩 Planner</NuxtLink>
    <NuxtLink class="nav-item" to="/calendar">📅 Calendar</NuxtLink>
    <NuxtLink class="nav-item" to="/profile">👤 Profile</NuxtLink>
  </aside>
</template>
<script setup lang="ts">
const user = computed(()=> useUserStore().user)
</script>
<style scoped>
.nav-item{ @apply flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:bg-white/10; }
</style>
