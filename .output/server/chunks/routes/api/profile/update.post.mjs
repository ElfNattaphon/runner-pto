import { c as defineEventHandler, h as getCookie, e as createError, r as readBody, u as useRuntimeConfig } from '../../../_/nitro.mjs';
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
function toIntOrNull(v) {
  if (v === void 0 || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}
function sanitize(body) {
  var _a, _b, _c, _d, _e, _f;
  const hrMethod = (body == null ? void 0 : body.hrMethod) === "threshold" ? "threshold" : (body == null ? void 0 : body.hrMethod) === "max" ? "max" : null;
  return {
    fullName: (_a = body == null ? void 0 : body.fullName) != null ? _a : null,
    dob: (_b = body == null ? void 0 : body.dob) != null ? _b : null,
    sex: (_c = body == null ? void 0 : body.sex) != null ? _c : null,
    heightCm: (body == null ? void 0 : body.heightCm) === "" ? null : (_d = body == null ? void 0 : body.heightCm) != null ? _d : null,
    weightKg: (body == null ? void 0 : body.weightKg) === "" ? null : (_e = body == null ? void 0 : body.weightKg) != null ? _e : null,
    maxHR: toIntOrNull(body == null ? void 0 : body.maxHR),
    thresholdHR: toIntOrNull(body == null ? void 0 : body.thresholdHR),
    weeklyMileage: toIntOrNull(body == null ? void 0 : body.weeklyMileage),
    daysAvailable: (_f = body == null ? void 0 : body.daysAvailable) != null ? _f : null,
    best5kSeconds: toIntOrNull(body == null ? void 0 : body.best5kSeconds),
    best10kSeconds: toIntOrNull(body == null ? void 0 : body.best10kSeconds),
    bestHMSeconds: toIntOrNull(body == null ? void 0 : body.bestHMSeconds),
    bestMarSeconds: toIntOrNull(body == null ? void 0 : body.bestMarSeconds),
    ageYears: toIntOrNull(body == null ? void 0 : body.ageYears),
    hrMethod
  };
}
const update_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth");
  if (!token) throw createError({ statusCode: 401 });
  const { uid } = await verifyJwt(token);
  const raw = await readBody(event);
  const data = sanitize(raw);
  try {
    const profile = await prisma.profile.upsert({
      where: { userId: uid },
      update: data,
      create: { userId: uid, ...data }
    });
    return { ok: true, profile, persistedAgeHr: true };
  } catch (e) {
    const msg = String((e == null ? void 0 : e.message) || "");
    const unknownAge = msg.includes("Unknown argument `ageYears`");
    const unknownMethod = msg.includes("Unknown argument `hrMethod`");
    if (unknownAge || unknownMethod) {
      const { ageYears, hrMethod, ...fallback } = data;
      const profile = await prisma.profile.upsert({
        where: { userId: uid },
        update: fallback,
        create: { userId: uid, ...fallback }
      });
      return { ok: true, profile, persistedAgeHr: false, note: "DB schema missing ageYears/hrMethod. Please run prisma migrate." };
    }
    throw e;
  }
});
async function verifyJwt(token) {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
  return payload;
}

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
