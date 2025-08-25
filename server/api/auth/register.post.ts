import { PrismaClient } from '@prisma/client'
import { hashPassword } from '~/server/utils/bcrypt'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, fullName } = body || {}
  if (!email || !password) throw createError({ statusCode: 400, statusMessage: 'email/password required' })
  const hash = await hashPassword(password, 10)
  const user = await prisma.user.create({ data: { email, passwordHash: hash, profile: { create: { fullName } } }, include: { profile: true } })
  return { ok: true, userId: user.id }
})
