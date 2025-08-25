<template>
  <div class="max-w-md mx-auto">
    <Card>
      <h2 class="text-2xl font-semibold mb-4">เข้าสู่ระบบ</h2>
      <form @submit.prevent="onSubmit" class="space-y-3">
        <input v-model="email" placeholder="อีเมล" class="form-input"/>
        <input v-model="password" type="password" placeholder="รหัสผ่าน" class="form-input"/>
        <button class="w-full btn-primary">เข้าสู่ระบบ</button>
      </form>
      <p class="mt-3 text-sm text-gray-400">ยังไม่มีบัญชี? <NuxtLink to="/register" class="text-skyx-400">สมัครสมาชิก</NuxtLink></p>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
import { useUiStore } from '@/stores/ui'
const ui = useUiStore()
const email = ref('')
const password = ref('')
const userStore = useUserStore()
const onSubmit = async () => {
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value, password: password.value } })
    const me = await $fetch('/api/auth/me')
    userStore.setUser(me)
    // load latest plan into store
    try { const latest:any = await $fetch('/api/plan/latest'); const ps = usePlanStore(); if (latest?.workouts) ps.setWorkouts(latest.workouts); if (latest?.meta) ps.setMeta(latest.meta) } catch {}
    ui.success('เข้าสู่ระบบสำเร็จ')
    await navigateTo('/')
  } catch (e:any) {
    ui.error(e?.statusMessage || 'เข้าสู่ระบบไม่สำเร็จ')
  }
}
</script>
