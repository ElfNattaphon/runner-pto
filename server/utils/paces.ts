export type PaceTable = {
  easySpm: number;
  marathonSpm: number;
  thresholdSpm: number;
  intervalSpm: number;
  repetitionSpm: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
function secPerKmFromTime(distanceKm: number, seconds: number) { return seconds / distanceKm }

export function derivePaces(params: { best5kSeconds?: number | null; best10kSeconds?: number | null; goalSeconds?: number | null; distanceKm: number }): PaceTable {
  const { best5kSeconds, best10kSeconds, goalSeconds, distanceKm } = params
  let refSpm: number | null = null
  if (best10kSeconds) refSpm = secPerKmFromTime(10, best10kSeconds)
  else if (best5kSeconds) refSpm = secPerKmFromTime(5, best5kSeconds)
  else if (goalSeconds) refSpm = secPerKmFromTime(distanceKm, goalSeconds)
  else refSpm = 360 // 6:00/km default

  // clamp 3:00–10:00 per km
  refSpm = clamp(refSpm!, 180, 600)

  let easySpm       = refSpm + 60
  let marathonSpm   = refSpm + 20
  let thresholdSpm  = refSpm - 10
  let intervalSpm   = refSpm - 25
  let repetitionSpm = refSpm - 40

  easySpm       = clamp(Math.round(easySpm),       180, 900)
  marathonSpm   = clamp(Math.round(marathonSpm),   180, 900)
  thresholdSpm  = clamp(Math.round(thresholdSpm),  150, 900)
  intervalSpm   = clamp(Math.round(intervalSpm),   140, 900)
  repetitionSpm = clamp(Math.round(repetitionSpm), 130, 900)

  const eps = 5
  marathonSpm   = Math.min(marathonSpm,   easySpm - eps)
  thresholdSpm  = Math.min(thresholdSpm,  marathonSpm - eps)
  intervalSpm   = Math.min(intervalSpm,   thresholdSpm - eps)
  repetitionSpm = Math.min(repetitionSpm, intervalSpm - eps)

  return { easySpm, marathonSpm, thresholdSpm, intervalSpm, repetitionSpm }
}
export function fmtPace(spm: number) { const m = Math.floor(spm / 60); const s = Math.round(spm % 60); return `${m}:${s.toString().padStart(2, '0')}/km` }
