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
const icsUrl_get = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth");
  if (!token) throw createError({ statusCode: 401 });
  const { uid } = await verifyJwt(token);
  const plan = await prisma.trainingPlan.findFirst({ where: { userId: uid }, orderBy: { createdAt: "desc" } });
  if (!plan) return { icsUrl: "#" };
  const url = `/api/plan/ics?planId=${plan.id}`;
  return { icsUrl: url };
});
async function verifyJwt(token) {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
  return payload;
}

export { icsUrl_get as default };
//# sourceMappingURL=ics-url.get.mjs.map
