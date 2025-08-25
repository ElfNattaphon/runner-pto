<template>
  <Card>
    <h2 class="text-xl font-semibold mb-4">สร้างตารางซ้อม</h2>
    <div v-if="hasPlan" class="rounded-xl border border-white/10 p-4 bg-ink-800/60 mb-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">มีแผนปัจจุบันอยู่แล้ว</div>
          <div class="text-sm text-gray-400">ระยะ {{ meta.distanceKm || '—' }} กม. | เวลาเป้าหมาย {{ formatHMS(meta.goalSeconds) }} | วันแข่ง {{ meta.raceDate ? new Date(meta.raceDate).toLocaleDateString() : '—' }}</div>
        </div>
        <button class="btn-ghost" @click.prevent="onDeletePlan">ลบแผนเดิม</button>
      </div>
      <p class="text-xs text-gray-400 mt-2">ต้องลบแผนเดิมก่อน จึงจะสร้างแผนใหม่ได้</p>
    </div>
    <form v-if="!hasPlan"  @submit.prevent="create" class="grid md:grid-cols-4 gap-4">
      <div class="md:col-span-1">
        <label class="form-label">ระยะ</label>
        <select v-model.number="distanceKm" class="form-input">
          <option :value="5">5K</option>
          <option :value="10">10K</option>
          <option :value="21.097">Half Marathon</option>
          <option :value="42.195">Marathon</option>
          <option :value="1.5">1500m (ลู่)</option>
        </select>
      </div>
      <div class="md:col-span-1">
        <label class="form-label">วันแข่ง</label>
        <input v-model="raceDate" type="date" class="form-input"/>
      </div>
      <div class="md:col-span-1">
        <label class="form-label">วันวิ่งยาว</label>
        <select v-model="longRunDay" class="form-input">
          <option value="Mon">จันทร์</option>
          <option value="Tue">อังคาร</option>
          <option value="Wed">พุธ</option>
          <option value="Thu">พฤหัสฯ</option>
          <option value="Fri">ศุกร์</option>
          <option value="Sat">เสาร์</option>
          <option value="Sun">อาทิตย์</option>
        </select>
      </div>
      <div class="md:col-span-1">

        <label class="form-label">เวลาเป้าหมาย (hh:mm:ss)</label>
        <TimeHMSInput v-model="goalSeconds" />
      </div>
      <div class="md:col-span-4 flex items-center gap-3">
        <button class="btn-accent">สร้างแผน</button>
        <NuxtLink v-if="workouts.length" to="/calendar" class="btn-ghost">ดูใน Calendar</NuxtLink>
      </div>
    </form>

    <div v-if="workouts.length" class="mt-6">
      <h3 class="font-semibold mb-3">ตัวอย่างสัปดาห์แรก</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="w in workouts.slice(0,7)" :key="w.id" class="rounded-xl border border-white/10 p-4 bg-ink-800/60">
          <div class="text-sm text-gray-400">{{ new Date(w.date).toLocaleDateString() }}</div>
          <div class="font-medium text-white">{{ w.title }}</div>
          <div class="text-sm text-gray-400 mt-1">{{ w.details }}</div>
          <div class="mt-2"><WorkoutTypeBadge :type="w.type" /></div>
        </div>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
import WorkoutTypeBadge from '@/components/WorkoutTypeBadge.vue'
import TimeHMSInput from '@/components/TimeHMSInput.vue'
import { useUiStore } from '@/stores/ui'
const distanceKm = ref(10)
const raceDate = ref(new Date(Date.now()+1000*60*60*24*84).toISOString().slice(0,10))
const goalSeconds = ref<number|null>(null)
const longRunDay = ref<string>('Sat')
const planStore = usePlanStore()
const workouts = computed(()=> planStore.workouts)
const meta = computed(()=> planStore.planMeta)
const hasPlan = computed(()=> workouts.value.length > 0)
const ui = useUiStore()
const formatHMS = (sec:number|null|undefined)=>{ if(!sec) return '—'; const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` }
const onDeletePlan = async ()=>{
  const ok = confirm('ยืนยันลบแผนปัจจุบันทั้งหมด?')
  if (!ok) return
  try {
    const del:any = await $fetch('/api/plan/delete', { method: 'POST' })
    ui.success(`ลบแผนแล้ว (${del.deleted})`)
    planStore.setWorkouts([]); planStore.setMeta({})
  } catch (e:any) {
    ui.error(e?.statusMessage || 'ลบแผนไม่สำเร็จ')
  }
}

const create = async () => {
  try {
    const res:any = await $fetch('/api/plan/generate', { method: 'POST', body: { distanceKm: distanceKm.value, raceDate: raceDate.value, goalSeconds: goalSeconds.value, longRunDay: longRunDay.value }})
    planStore.setWorkouts(res.workouts || []); if (res?.meta) planStore.setMeta(res.meta)
    ui.success('สร้างแผนสำเร็จ')
  } catch (e: any) {
    if (e?.statusCode === 409) {
      const ok = confirm('คุณมีแผนเดิมอยู่ ต้องลบออกก่อนสร้างใหม่\nต้องการลบแผนเดิมตอนนี้หรือไม่?')
      if (ok) {
        try {
          const del:any = await $fetch('/api/plan/delete', { method: 'POST' })
          ui.info(`ลบแผนเดิมแล้ว (${del.deleted} รายการ) ลองกดสร้างอีกครั้ง`)
        } catch (delErr: any) {
          ui.error(delErr?.statusMessage || 'ลบแผนเดิมไม่สำเร็จ')
        }
      }
    } else {
      ui.error(e?.statusMessage || 'สร้างแผนไม่สำเร็จ')
    }
  }
}
</script>
