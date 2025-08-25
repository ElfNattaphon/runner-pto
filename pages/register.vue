<template>
  <div class="max-w-md mx-auto">
    <Card>
      <h2 class="text-2xl font-semibold mb-4">สมัครสมาชิก</h2>
      <form @submit.prevent="onSubmit" class="space-y-3">
        <input v-model="email" placeholder="อีเมล" class="form-input"/>
        <input v-model="password" type="password" placeholder="รหัสผ่าน" class="form-input"/>
        <input v-model="fullName" placeholder="ชื่อ-นามสกุล" class="form-input"/>
        <button class="w-full btn-accent">สมัคร</button>
      </form>
      <p class="mt-3 text-sm text-gray-400">มีบัญชีแล้ว? <NuxtLink to="/login" class="text-skyx-400">เข้าสู่ระบบ</NuxtLink></p>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
import { useUiStore } from '@/stores/ui'
const ui = useUiStore()
const email = ref('')
const password = ref('')
const fullName = ref('')
const onSubmit = async () => {
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: { email: email.value, password: password.value, fullName: fullName.value } })
    ui.success('สมัครสมาชิกสำเร็จ')
    await navigateTo('/login')
  } catch (e:any) {
    ui.error(e?.statusMessage || 'สมัครสมาชิกไม่สำเร็จ')
  }
}
</script>
