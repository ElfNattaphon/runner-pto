import { c as defineEventHandler, h as getCookie, e as createError, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const prisma = new PrismaClient();
const me_get = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth");
  if (!token) throw createError({ statusCode: 401, statusMessage: "No token" });
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
  const uid = payload.uid;
  const user = await prisma.user.findUnique({ where: { id: uid }, include: { profile: true } });
  if (!user) throw createError({ statusCode: 401, statusMessage: "User not found" });
  return { id: user.id, email: user.email, profile: user.profile };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
