import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth')
  if (!token) throw createError({ statusCode: 401 })
  const { uid } = await verifyJwt(token)
  const plan = await prisma.trainingPlan.findFirst({ where: { userId: uid }, orderBy: { createdAt: 'desc' }, include: { workouts: true, goal: true } })
  if (!plan) return { ok: true, planId: null, workouts: [] }
  // sort workouts by date ASC before returning
  const workouts = plan.workouts.sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return { ok: true, planId: plan.id, workouts, meta: { distanceKm: plan.goal?.distanceKm || null, raceDate: plan.goal?.raceDate?.toISOString?.() || null, goalSeconds: plan.goal?.goalSeconds || null } }
})
async function verifyJwt(token: string) { const jwtSecret = useRuntimeConfig().jwtSecret; const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret)); return payload as any }
