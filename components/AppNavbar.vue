<template>
  <header class="sticky top-0 z-40 w-full border-b border-white/10 bg-ink-900/70 backdrop-blur">
    <div class="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-run-500 text-2xl">🏃</span>
        <span class="font-semibold text-white">RunPlanner Pro</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <NuxtLink v-if="user" to="/planner" class="hidden sm:inline-block text-sm font-medium text-gray-200 hover:text-run-500">Planner</NuxtLink>
        <NuxtLink v-if="user" to="/calendar" class="hidden sm:inline-block text-sm font-medium text-gray-200 hover:text-run-500">Calendar</NuxtLink>
        <NuxtLink v-if="user" to="/profile" class="hidden sm:inline-block text-sm font-medium text-gray-200 hover:text-run-500">Profile</NuxtLink>
        <button v-if="user" class="sm:hidden btn-ghost" @click="mobileOpen=!mobileOpen">☰</button>
        <button v-if="user" @click="logout" class="hidden sm:inline-flex ml-2 btn-accent">Logout</button>
        <NuxtLink v-else to="/login" class="ml-2 btn-primary">Login</NuxtLink>
      </div>
    </div>
  </header>

  <!-- Mobile menu -->
  <div v-if="user && mobileOpen" class="sm:hidden absolute top-14 left-0 right-0 bg-ink-800/95 border-b border-white/10">
    <div class="px-4 py-3 space-y-2">
      <NuxtLink to="/planner" class="block text-gray-200 hover:text-run-500" @click="mobileOpen=false">Planner</NuxtLink>
      <NuxtLink to="/calendar" class="block text-gray-200 hover:text-run-500" @click="mobileOpen=false">Calendar</NuxtLink>
      <NuxtLink to="/profile" class="block text-gray-200 hover:text-run-500" @click="mobileOpen=false">Profile</NuxtLink>
      <button class="w-full btn-accent mt-2" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
const userStore = useUserStore()
const user = computed(() => userStore.user)
const logout = async () => { await $fetch('/api/auth/logout', { method: 'POST' }); userStore.setUser(null); navigateTo('/login') }
</script>
