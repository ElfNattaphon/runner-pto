import { PrismaClient } from '@prisma/client'
import { createEvents, type EventAttributes } from 'ics'
const prisma = new PrismaClient()
export default defineEventHandler( async (event) => {
  const planId = getQuery(event).planId as string
  if (!planId) throw createError({ statusCode: 400 })
  const plan = await prisma.trainingPlan.findUnique({ where: { id: planId }, include: { workouts: true } })
  if (!plan) throw createError({ statusCode: 404 })
  const events: EventAttributes[] = plan.workouts.map((w: any) => {
    const dt = new Date(w.date)
    const start: [number, number, number, number, number] = [dt.getFullYear(), dt.getMonth() + 1, dt.getDate(), 6, 0]
    return { title: w.title, start, duration: { hours: 1, minutes: 0 }, description: `${w.type} — ${w.details || ''}` }
  })
  const { error, value } = createEvents(events)
  if (error) throw createError({ statusCode: 500, statusMessage: (error as Error).message })
  setHeader(event, 'Content-Type', 'text/calendar; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="plan_${planId}.ics"`)
  return value
})
