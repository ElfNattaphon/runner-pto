<template>
  <div class="space-y-6">
    <div class="flex items-end justify-between">
      <div>
        <h1 class="text-2xl font-semibold">สวัสดี {{ me?.profile?.fullName || me?.email }}</h1>
        <p class="text-gray-400">จัดการตารางซ้อมของคุณได้จากที่นี่</p>
      </div>
      <NuxtLink to="/planner" class="btn-accent">เริ่มสร้างแผน</NuxtLink>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <UIStat title="สัปดาห์นี้" :value="weeklyKm + ' กม.'" sub="ระยะรวมตามแผน"/>
      <UIStat title="วันวิ่งยาว" :value="me?.profile?.longRunDay || meta.longRunDay || 'Sat'" sub="วันประจำสัปดาห์"/>
      <UIStat title="ระยะเป้าหมาย" :value="lastGoal" sub="จากแผนล่าสุด"/>
    </div>

    <Card>
      <h2 class="text-lg font-semibold mb-2">แผนปัจจุบัน</h2>
      <div class="text-sm text-gray-300 space-y-1">
        <div>ระยะ: <span class="font-medium">{{ meta.distanceKm ? meta.distanceKm + ' กม.' : '—' }}</span></div>
        <div>เวลาเป้าหมาย: <span class="font-medium">{{ formatHMS(meta.goalSeconds) }}</span></div>
        <div>วันแข่ง: <span class="font-medium">{{ meta.raceDate ? new Date(meta.raceDate).toLocaleDateString() : '—' }}</span></div>
      </div>
      <div class="mt-3">
        <h3 class="text-sm font-semibold mb-1">โซนหัวใจ (ประมาณการ)</h3>
        <ul class="text-xs text-gray-300 space-y-0.5">
          <li>Easy / Long Run: Z2</li>
          <li>Marathon: Z3</li>
          <li>Tempo: Z3–Z4</li>
          <li>Intervals: Z4</li>
          <li>Reps: Z5</li>
        </ul>
        <p class="text-[11px] text-gray-400 mt-2">* คำนวณจาก Threshold/Max HR ในโปรไฟล์ หากใส่ค่าครบจะระบุ BPM ในรายละเอียดคิวซ้อม</p>
      </div>
    </Card>

    <Card>
      <h2 class="text-lg font-semibold mb-3">สรุปสัปดาห์แรก</h2>
      <ul class="divide-y divide-white/10">
        <li v-for="w in workouts.slice(0,7)" :key="w.id" class="py-2 flex items-center justify-between">
          <div class="space-y-0.5">
            <div class="font-medium">{{ new Date(w.date).toLocaleDateString() }} — {{ w.title }}</div>
            <div class="text-sm text-gray-400">{{ renderDetails(w) }}</div>
          </div>
          <WorkoutTypeBadge :type="w.type" />
        </li>
      </ul>
      <div class="mt-4">
        <NuxtLink to="/calendar" class="text-skyx-400 hover:underline">เปิดปฏิทิน</NuxtLink>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computeHrZones, renderDetailsWithHR } from '@/utils/hr'
import Card from '@/components/UI/Card.vue'
import UIStat from '@/components/UI/Stat.vue'
import WorkoutTypeBadge from '@/components/WorkoutTypeBadge.vue'

const me = await $fetch('/api/auth/me').catch(()=> null)

type HRProfile = { hrMethod?: 'max'|'threshold'|null; ageYears?: number|null; maxHR?: number|null; thresholdHR?: number|null }
const prof = computed<HRProfile | null>(() => ((me as any)?.profile ?? null))
const zones = computed(()=> computeHrZones({ method: prof.value?.hrMethod || 'max', maxHR: prof.value?.maxHR ?? null, thresholdHR: prof.value?.thresholdHR ?? null, ageYears: prof.value?.ageYears ?? null }))
const renderDetails = (w:any)=> renderDetailsWithHR(w?.details||'', w?.type||'', zones.value)
const planStore = usePlanStore()
const workouts = computed(()=> planStore.workouts)
const meta = computed(()=> planStore.planMeta)
const weeklyKm = computed(()=> Math.round(workouts.value.slice(0,7).reduce((s,w)=> s + (w.distanceKm||0), 0)))
const lastGoal = '—'

const formatHMS = (sec: number | null | undefined) => {
  if (!sec) return '—';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

// Auto load latest plan if store empty
onMounted(async ()=>{
  if (!planStore.workouts.length) {
    try {
      const latest:any = await $fetch('/api/plan/latest')
      if (latest?.workouts) planStore.setWorkouts(latest.workouts)
      if (latest?.meta) planStore.setMeta(latest.meta)
    } catch {}
  }
})
</script>
