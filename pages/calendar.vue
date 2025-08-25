<template>
  <Card>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">ปฏิทินการซ้อม</h2>
      <a :href="icsUrl" target="_blank" class="btn-ghost">ดาวน์โหลด .ics</a>
    </div>
    <FullCalendar :options="calendarOptions" />
  </Card>

  <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="selected=null">
    <div class="w-full max-w-lg rounded-2xl border border-white/10 bg-ink-800/90 backdrop-blur p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold text-white">{{ selected.title }}</h3>
        <button class="btn-ghost" @click="selected = null">ปิด</button>
      </div>
      <div class="mt-3 space-y-2 text-sm text-gray-300">
        <div><span class="text-gray-400">วันที่:</span> {{ formatDate(selected.date) }}</div>
        <div class="flex items-center gap-2">
          <span class="text-gray-400">ประเภท:</span>
          <WorkoutTypeBadge :type="(selected.type as any)" />
        </div>
        <div v-if="selected.distanceKm"><span class="text-gray-400">ระยะ:</span> {{ selected.distanceKm }} กม.</div>
        <div v-if="selected.details" class="whitespace-pre-wrap"><span class="text-gray-400">รายละเอียด:</span> {{ renderDetails(selected) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computeHrZones, renderDetailsWithHR } from '@/utils/hr'
import Card from '@/components/UI/Card.vue'
import WorkoutTypeBadge from '@/components/WorkoutTypeBadge.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useUiStore } from '@/stores/ui'

type Workout = { id: string; date: string | Date; type: 'E'|'M'|'T'|'I'|'R'|'Rest'|'Race'|'LR'; title: string; details?: string; distanceKm?: number }
const planStore = usePlanStore()
const ui = useUiStore()
const selected = ref<Workout|null>(null)
const me = await $fetch('/api/auth/me').catch(()=> null)

type HRProfile = { hrMethod?: 'max'|'threshold'|null; ageYears?: number|null; maxHR?: number|null; thresholdHR?: number|null }
const prof = computed<HRProfile | null>(() => ((me as any)?.profile ?? null))
const zones = computed(()=> computeHrZones({ method: prof.value?.hrMethod || 'max', maxHR: prof.value?.maxHR ?? null, thresholdHR: prof.value?.thresholdHR ?? null, ageYears: prof.value?.ageYears ?? null }))
const renderDetails = (w:any)=> renderDetailsWithHR(w?.details||'', w?.type||'', zones.value)
const formatDate = (d: string | Date) => new Date(d).toLocaleDateString()
const events = computed(() => planStore.workouts.map((w: Workout) => ({ id:w.id, title:w.title, start: new Date(w.date).toISOString().slice(0,10), allDay:true, classNames:[`evt-${w.type}`], extendedProps:{ workout:w } })))

const isMobile = ref(false)
if (process.client) {
  const set = () => { isMobile.value = window.innerWidth < 640 }
  set(); window.addEventListener('resize', set)
  onUnmounted(()=> window.removeEventListener('resize', set))
}
const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: isMobile.value ? 'dayGridWeek' : 'dayGridMonth',
  events,
  eventClick: (info:any) => { const w = info?.event?.extendedProps?.workout as Workout|undefined; if (w) selected.value = w }
})

const { icsUrl } = await $fetch('/api/plan/ics-url'); if (!icsUrl || icsUrl === '#') ui.info('ยังไม่มีแผนสำหรับสร้างไฟล์ .ics')
</script>
