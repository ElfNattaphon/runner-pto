import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth')
  if (!token) throw createError({ statusCode: 401 })
  const { uid } = await verifyJwt(token)
  const plans = await prisma.trainingPlan.findMany({ where: { userId: uid } })
  if (!plans.length) return { ok: true, deleted: 0 }
  const planIds = plans.map(p => p.id)
  await prisma.workout.deleteMany({ where: { planId: { in: planIds } } })
  const goalIds = plans.map(p => p.goalId).filter((x): x is string => !!x)
  if (goalIds.length) await prisma.raceGoal.deleteMany({ where: { id: { in: goalIds } } })
  const del = await prisma.trainingPlan.deleteMany({ where: { id: { in: planIds } } })
  return { ok: true, deleted: del.count }
})
async function verifyJwt(token: string) { const jwtSecret = useRuntimeConfig().jwtSecret; const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret)); return payload as any }
