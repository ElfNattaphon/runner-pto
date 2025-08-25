import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth')
  if (!token) throw createError({ statusCode: 401 })
  const { uid } = await verifyJwt(token)
  const plan = await prisma.trainingPlan.findFirst({ where: { userId: uid }, orderBy: { createdAt: 'desc' } })
  if (!plan) return { icsUrl: '#' }
  const url = `/api/plan/ics?planId=${plan.id}`
  return { icsUrl: url }
})
async function verifyJwt(token: string) { const jwtSecret = useRuntimeConfig().jwtSecret; const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret)); return payload as any }
