import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth')
  if (!token) throw createError({ statusCode: 401, statusMessage: 'No token' })
  const jwtSecret = useRuntimeConfig().jwtSecret
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret))
  const uid = (payload as any).uid
  const user = await prisma.user.findUnique({ where: { id: uid }, include: { profile: true } })
  if (!user) throw createError({ statusCode: 401, statusMessage: 'User not found' })
  return { id: user.id, email: user.email, profile: user.profile }
})
