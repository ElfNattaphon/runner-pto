import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { h as hashPassword } from '../../../_/bcrypt.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const prisma = new PrismaClient();
const register_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, fullName } = body || {};
  if (!email || !password) throw createError({ statusCode: 400, statusMessage: "email/password required" });
  const hash = await hashPassword(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash: hash, profile: { create: { fullName } } }, include: { profile: true } });
  return { ok: true, userId: user.id };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
