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
const delete_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth");
  if (!token) throw createError({ statusCode: 401 });
  const { uid } = await verifyJwt(token);
  const plans = await prisma.trainingPlan.findMany({ where: { userId: uid } });
  if (!plans.length) return { ok: true, deleted: 0 };
  const planIds = plans.map((p) => p.id);
  await prisma.workout.deleteMany({ where: { planId: { in: planIds } } });
  const goalIds = plans.map((p) => p.goalId).filter((x) => !!x);
  if (goalIds.length) await prisma.raceGoal.deleteMany({ where: { id: { in: goalIds } } });
  const del = await prisma.trainingPlan.deleteMany({ where: { id: { in: planIds } } });
  return { ok: true, deleted: del.count };
});
async function verifyJwt(token) {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
  return payload;
}

export { delete_post as default };
//# sourceMappingURL=delete.post.mjs.map
