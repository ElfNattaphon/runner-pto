import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
import { generatePlan } from '~/server/utils/plan'
const prisma = new PrismaClient()
export default defineEventHandler( async (event) => {
  const token = getCookie(event, 'auth')
  if (!token) throw createError({ statusCode: 401 })
  const { uid } = await verifyJwt(token)
  const body = await readBody(event)
  const { distanceKm, raceDate, goalSeconds, longRunDay } = body || {}
  if (!distanceKm || !raceDate) throw createError({ statusCode: 400, statusMessage: 'distanceKm & raceDate required' })
  // Forbid duplicates
  const existing = await prisma.trainingPlan.findFirst({ where: { userId: uid } })
  if (existing) throw createError({ statusCode: 409, statusMessage: 'PLAN_EXISTS: คุณมีแผนเดิมอยู่ โปรดลบก่อนสร้างใหม่' })
  const me = await prisma.user.findUnique({ where: { id: uid }, include: { profile: true } })
  if (!me) throw createError({ statusCode: 404 })
  const planData = generatePlan(me.profile || {}, { distanceKm, raceDate, goalSeconds, longRunDay })
  const plan = await prisma.trainingPlan.create({
    data: {
      userId: uid,
      startDate: planData.startDate,
      weeks: planData.weeks,
      workouts: { create: planData.workouts.map((w:any) => ({ date: w.date, type: w.type, title: w.title, details: w.details || '', distanceKm: w.distanceKm || null })) }
    }
  })
  const goal = await prisma.raceGoal.create({ data: { userId: uid, distanceKm, raceDate: new Date(raceDate), goalSeconds: goalSeconds || null, plan: { connect: { id: plan.id } } } })
  if (longRunDay) { try { await prisma.profile.update({ where: { userId: uid }, data: { longRunDay } }) } catch { /* ignore */ } }
  return { ok: true, planId: plan.id, goalId: goal.id, workouts: planData.workouts, paces: planData.paces, meta: { distanceKm, raceDate, goalSeconds, longRunDay } }
})
async function verifyJwt(token: string) { const jwtSecret = useRuntimeConfig().jwtSecret; const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret)); return payload as any }
