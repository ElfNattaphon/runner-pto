<template>
  <Card>
    <h2 class="text-xl font-semibold mb-4">โปรไฟล์นักวิ่ง</h2>
    <form @submit.prevent="save" class="grid md:grid-cols-2 gap-4">
      <FormField v-model.number="form.heightCm" label="ส่วนสูง (ซม.)"/>
      <FormField v-model.number="form.weightKg" label="น้ำหนัก (กก.)"/>
      <FormField v-model.number="form.maxHR" label="Max HR"/>
      <FormField v-model.number="form.thresholdHR" label="Threshold HR"/>
      <FormField v-model.number="form.weeklyMileage" label="วิ่งต่อสัปดาห์ (กม.)"/>
      <FormField v-model.number="form.ageYears" label="อายุ (ปี)"/>
      <div>
        <label class="form-label">วิธีคำนวณโซนหัวใจ</label>
        <select v-model="form.hrMethod" class="form-input">
          <option value="max">จากอายุ (Max HR ~ 220-อายุ)</option>
          <option value="threshold">จาก Threshold HR (LTHR)</option>
        </select>
        <p class="text-xs text-gray-400 mt-1">Max HR (ประมาณ): {{ form.ageYears ? 220 - Number(form.ageYears) : '—' }} bpm</p>
      </div>
            <div class="space-y-1">
        <label class="form-label">สถิติ 10K (hh:mm:ss)</label>
        <TimeHMSInput v-model="form.best10kSeconds" />
      </div>
      <div class="mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60">
        <div class="text-sm font-medium mb-1">โซนหัวใจ (ตามค่าที่เลือก)</div>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>Easy / Long Run: {{ hrPreview ? `${hrPreview.Z2[0]}–${hrPreview.Z2[1]} bpm (Z2)` : '—' }}</li>
          <li>Marathon: {{ hrPreview ? `${hrPreview.Z3[0]}–${hrPreview.Z3[1]} bpm (Z3)` : '—' }}</li>
          <li>Tempo: {{ hrPreview ? `${hrPreview.Z3[0]}–${hrPreview.Z4[1]} bpm (Z3–Z4)` : '—' }}</li>
          <li>Intervals: {{ hrPreview ? `${hrPreview.Z4[0]}–${hrPreview.Z4[1]} bpm (Z4)` : '—' }}</li>
          <li>Reps: {{ hrPreview ? `${hrPreview.Z5[0]}–${hrPreview.Z5[1]} bpm (Z5)` : '—' }}</li>
        </ul>
      </div>
      <div class="space-y-1">
        <label class="form-label">สถิติ Half (hh:mm:ss)</label>
        <TimeHMSInput v-model="form.bestHMSeconds" />
      </div>
      <div class="mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60">
        <div class="text-sm font-medium mb-1">โซนหัวใจ (ตามค่าที่เลือก)</div>
        <ul class="text-xs text-gray-300 space-y-1">
          <li>Easy / Long Run: {{ hrPreview ? `${hrPreview.Z2[0]}–${hrPreview.Z2[1]} bpm (Z2)` : '—' }}</li>
          <li>Marathon: {{ hrPreview ? `${hrPreview.Z3[0]}–${hrPreview.Z3[1]} bpm (Z3)` : '—' }}</li>
          <li>Tempo: {{ hrPreview ? `${hrPreview.Z3[0]}–${hrPreview.Z4[1]} bpm (Z3–Z4)` : '—' }}</li>
          <li>Intervals: {{ hrPreview ? `${hrPreview.Z4[0]}–${hrPreview.Z4[1]} bpm (Z4)` : '—' }}</li>
          <li>Reps: {{ hrPreview ? `${hrPreview.Z5[0]}–${hrPreview.Z5[1]} bpm (Z5)` : '—' }}</li>
        </ul>
      </div>
      <div class="space-y-1">
        <label class="form-label">สถิติ Full (hh:mm:ss)</label>
        <TimeHMSInput v-model="form.bestMarSeconds" />
      </div>

      <div class="md:col-span-2">
        <button class="btn-primary">บันทึก</button>
      </div>
    </form>
  </Card>
</template>
<script setup lang="ts">
import { computeHrZones } from '@/utils/hr'
import Card from '@/components/UI/Card.vue'
import FormField from '@/components/FormField.vue'
import TimeHMSInput from '@/components/TimeHMSInput.vue'
import { useUiStore } from '@/stores/ui'
const ui = useUiStore()
const me = await $fetch('/api/auth/me')

type ProfileForm = {
  fullName?: string | null
  dob?: string | null
  sex?: string | null
  daysAvailable?: string | null
  heightCm?: number | null
  weightKg?: number | null
  maxHR?: number | null
  thresholdHR?: number | null
  weeklyMileage?: number | null
  ageYears?: number | null
  hrMethod?: 'max' | 'threshold' | null
  best5kSeconds?: number | null
  best10kSeconds?: number | null
  bestHMSeconds?: number | null
  bestMarSeconds?: number | null
}

const defaults: ProfileForm = { fullName: null, dob: null, sex: null, daysAvailable: null, ageYears: null, hrMethod: 'max' }
const form = reactive<ProfileForm>({ ...defaults, ...((me as any)?.profile || {}) })
const hrPreview = computed(()=> computeHrZones({ method: form.hrMethod || 'max', maxHR: form.maxHR ?? null, thresholdHR: form.thresholdHR ?? null, ageYears: form.ageYears ?? null }))
const save = async () => {
  try {
    const payload = {
      fullName: form.fullName ?? null,
      dob: form.dob ?? null,
      sex: form.sex ?? null,
      heightCm: form.heightCm ?? null,
      weightKg: form.weightKg ?? null,
      maxHR: form.maxHR ?? null,
      thresholdHR: form.thresholdHR ?? null,
      weeklyMileage: form.weeklyMileage ?? null,
      daysAvailable: form.daysAvailable ?? null,
      best5kSeconds: form.best5kSeconds ?? null,
      best10kSeconds: form.best10kSeconds ?? null,
      bestHMSeconds: form.bestHMSeconds ?? null,
      bestMarSeconds: form.bestMarSeconds ?? null,
      ageYears: form.ageYears ?? null,
      hrMethod: form.hrMethod ?? 'max'
    }
    const res:any = await $fetch('/api/profile/update', { method: 'POST', body: payload }); ui.success('บันทึกโปรไฟล์แล้ว'); if (res && res.persistedAgeHr === false) { ui.info('บันทึกแล้ว แต่ฐานข้อมูลยังไม่รองรับ ageYears/hrMethod — แนะนำให้รัน prisma migrate dev'); } }
  catch (e:any) { ui.error(e?.statusMessage || 'บันทึกโปรไฟล์ไม่สำเร็จ') }
}
</script>
