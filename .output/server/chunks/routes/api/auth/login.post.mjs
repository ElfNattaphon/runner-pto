import { c as defineEventHandler, r as readBody, e as createError, u as useRuntimeConfig, f as setCookie } from '../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { SignJWT } from 'jose';
import { c as comparePassword } from '../../../_/bcrypt.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const prisma = new PrismaClient();
const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body || {};
  if (!email || !password) throw createError({ statusCode: 400, statusMessage: "Bad request" });
  const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
  if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const token = await new SignJWT({ uid: user.id }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(new TextEncoder().encode(jwtSecret));
  setCookie(event, "auth", token, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  return { ok: true };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
