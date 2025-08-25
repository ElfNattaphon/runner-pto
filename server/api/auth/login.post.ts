import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'
import { comparePassword } from '~/server/utils/bcrypt'
const prisma = new PrismaClient()
export default defineEventHandler( async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}
  if (!email || !password) throw createError({ statusCode: 400, statusMessage: 'Bad request' })
  const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } })
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const ok = await comparePassword(password, user.passwordHash)
  if (!ok) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const jwtSecret = useRuntimeConfig().jwtSecret
  const token = await new SignJWT({ uid: user.id }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(new TextEncoder().encode(jwtSecret))
  setCookie(event, 'auth', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' })
  return { ok: true }
})
