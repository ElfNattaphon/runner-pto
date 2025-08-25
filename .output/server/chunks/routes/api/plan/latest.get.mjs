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
const latest_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const token = getCookie(event, "auth");
  if (!token) throw createError({ statusCode: 401 });
  const { uid } = await verifyJwt(token);
  const plan = await prisma.trainingPlan.findFirst({ where: { userId: uid }, orderBy: { createdAt: "desc" }, include: { workouts: true, goal: true } });
  if (!plan) return { ok: true, planId: null, workouts: [] };
  const workouts = plan.workouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return { ok: true, planId: plan.id, workouts, meta: { distanceKm: ((_a = plan.goal) == null ? void 0 : _a.distanceKm) || null, raceDate: ((_d = (_c = (_b = plan.goal) == null ? void 0 : _b.raceDate) == null ? void 0 : _c.toISOString) == null ? void 0 : _d.call(_c)) || null, goalSeconds: ((_e = plan.goal) == null ? void 0 : _e.goalSeconds) || null } };
});
async function verifyJwt(token) {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
  return payload;
}

export { latest_get as default };
//# sourceMappingURL=latest.get.mjs.map
