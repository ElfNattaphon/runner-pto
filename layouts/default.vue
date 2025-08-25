<template>
  <div class="min-h-dvh bg-ink-900 bg-run-gradient text-gray-100">
    <AppNavbar />
    <div class="bg-track-lines">
      <div class="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 px-4 py-6">
        <AppSidebar />
        <main>
          <slot />
          <ToastHost />
        </main>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import ToastHost from '@/components/ToastHost.vue'
</script>
