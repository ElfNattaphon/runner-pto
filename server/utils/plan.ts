import { derivePaces, fmtPace } from './paces'
import { computeHrZones, hrText } from './hr'
type Profile = { longRunDay?: string | null; weeklyMileage?: number | null; best5kSeconds?: number | null; best10kSeconds?: number | null; thresholdHR?: number | null; maxHR?: number | null }
type Goal = { distanceKm: number; raceDate: string; goalSeconds?: number | null; longRunDay?: string | null }
function addDays(date: Date, days: number) { const d = new Date(date); d.setDate(d.getDate() + days); return d }
export function generatePlan(profile: Profile, goal: Goal) {
  const raceDate = new Date(goal.raceDate)
  const today = new Date()
  const totalDays = Math.max(56, Math.round((raceDate.getTime() - today.getTime()) / (1000*60*60*24)))
  const startDate = addDays(raceDate, -totalDays)
  const weeks = Math.ceil(totalDays / 7)
  const paces = derivePaces({ best5kSeconds: profile.best5kSeconds || undefined, best10kSeconds: profile.best10kSeconds || undefined, goalSeconds: goal.goalSeconds || undefined, distanceKm: goal.distanceKm })
  const longRunDay = (goal.longRunDay || profile.longRunDay || 'Sat').slice(0,3)
  const workouts: any[] = []
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const lrIdx = days.indexOf(longRunDay) >= 0 ? days.indexOf(longRunDay) : 6
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = addDays(startDate, w*7 + d)
      const dow = date.getDay()
      let type = 'E', title = 'วิ่งเบา', details = `Easy ${fmtPace(paces.easySpm)} 40-60 นาที` as string; let distanceKm: number | undefined = undefined
      if (dow === lrIdx) { type = 'LR'; const lrKm = Math.min(30, Math.max(8, 10 + w * 1)); title = 'วิ่งยาว'; details = `Long Run ~${lrKm} กม. ที่ ${fmtPace(paces.easySpm)}`; distanceKm = lrKm }
      if ((dow === (lrIdx + 2) % 7) || (dow === (lrIdx + 4) % 7)) {
        if (w < Math.floor(weeks*0.4)) { type = 'T'; title = 'เทมโปเบา'; details = `Tempo 3×8 นาที @ ${fmtPace(paces.thresholdSpm)} พัก 2 นาทีจ็อก` }
        else if (w < Math.floor(weeks*0.8)) { type = 'I'; title = 'อินเทอร์วอล'; details = `Intervals 5×1000 ม. @ ${fmtPace(paces.intervalSpm)} พัก 2-3 นาที` }
        else { type = 'R'; title = 'เรพิทิชัน'; details = `Reps 8×400 ม. @ ${fmtPace(paces.repetitionSpm)} พัก 200 ม. จ็อก` }
      }
      if (w >= weeks - 2) { if (type === 'LR') details = `Long Run ลดระยะ ~${Math.round((distanceKm || 18) * 0.7)} กม. แบบชิล`; if (type === 'I' || type === 'R' || type === 'T') { details = `ลดคิวเป็นเบา 20-40 นาที ที่ ${fmtPace(paces.easySpm)}`; type = 'E'; title = 'วิ่งเบา (Taper)' } }
      if (date.toDateString() === raceDate.toDateString()) { workouts.push({ id: cryptoRandomId(), date, type: 'Race', title: `แข่ง ${goal.distanceKm} กม.`, details: 'Race Day — โชคดี!', distanceKm: goal.distanceKm }); continue }
      if (dow === (lrIdx + 1) % 7) { workouts.push({ id: cryptoRandomId(), date, type: 'Rest', title: 'พัก', details: 'Active recovery: เดิน/ยืดเหยียด/โฟมโรล' }); continue }
      workouts.push({ id: cryptoRandomId(), date, type, title, details, distanceKm })
    }
  }
  return { startDate, weeks, workouts, paces }
}
function cryptoRandomId() { return 'w_' + Math.random().toString(36).slice(2,10) }
