import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
const prisma = new PrismaClient()

type ProfilePayload = {
  fullName?: string | null
  dob?: string | null
  sex?: string | null
  heightCm?: number | null
  weightKg?: number | null
  maxHR?: number | null
  thresholdHR?: number | null
  weeklyMileage?: number | null
  daysAvailable?: string | null
  best5kSeconds?: number | null
  best10kSeconds?: number | null
  bestHMSeconds?: number | null
  bestMarSeconds?: number | null
  ageYears?: number | null
  hrMethod?: 'max' | 'threshold' | null
}

function toIntOrNull(v: any): number | null {
  if (v === undefined || v === null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? Math.trunc(n) : null
}

function sanitize(body: any): ProfilePayload {
  const hrMethod = body?.hrMethod === 'threshold' ? 'threshold' : (body?.hrMethod === 'max' ? 'max' : null)
  return {
    fullName: body?.fullName ?? null,
    dob: body?.dob ?? null,
    sex: body?.sex ?? null,
    heightCm: body?.heightCm === '' ? null : (body?.heightCm ?? null),
    weightKg: body?.weightKg === '' ? null : (body?.weightKg ?? null),
    maxHR: toIntOrNull(body?.maxHR),
    thresholdHR: toIntOrNull(body?.thresholdHR),
    weeklyMileage: toIntOrNull(body?.weeklyMileage),
    daysAvailable: body?.daysAvailable ?? null,
    best5kSeconds: toIntOrNull(body?.best5kSeconds),
    best10kSeconds: toIntOrNull(body?.best10kSeconds),
    bestHMSeconds: toIntOrNull(body?.bestHMSeconds),
    bestMarSeconds: toIntOrNull(body?.bestMarSeconds),
    ageYears: toIntOrNull(body?.ageYears),
    hrMethod
  }
}

export default defineEventHandler( async (event) => {
  const token = getCookie(event, 'auth')
  if (!token) throw createError({ statusCode: 401 })
  const { uid } = await verifyJwt(token)

  const raw = await readBody(event)
  const data = sanitize(raw)

try {
    const profile = await prisma.profile.upsert({
      where: { userId: uid },
      update: data,
      create: { userId: uid, ...data }
    })
    return { ok: true, profile, persistedAgeHr: true }
  } catch (e: any) {
    const msg = String(e?.message || '')
    const unknownAge = msg.includes('Unknown argument `ageYears`')
    const unknownMethod = msg.includes('Unknown argument `hrMethod`')
    if (unknownAge || unknownMethod) {
      // Retry without new fields so saving won't 500 even if DB schema isn't migrated yet
      const { ageYears, hrMethod, ...fallback } = data as any
      const profile = await prisma.profile.upsert({
        where: { userId: uid },
        update: fallback,
        create: { userId: uid, ...fallback }
      })
      return { ok: true, profile, persistedAgeHr: false, note: 'DB schema missing ageYears/hrMethod. Please run prisma migrate.' }
    }
    throw e
  }
})

async function verifyJwt(token: string) {
  const jwtSecret = useRuntimeConfig().jwtSecret
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret))
  return payload as any
}
