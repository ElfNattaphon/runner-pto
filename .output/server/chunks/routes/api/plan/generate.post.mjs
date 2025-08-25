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

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function secPerKmFromTime(distanceKm, seconds) {
  return seconds / distanceKm;
}
function derivePaces(params) {
  const { best5kSeconds, best10kSeconds, goalSeconds, distanceKm } = params;
  let refSpm = null;
  if (best10kSeconds) refSpm = secPerKmFromTime(10, best10kSeconds);
  else if (best5kSeconds) refSpm = secPerKmFromTime(5, best5kSeconds);
  else if (goalSeconds) refSpm = secPerKmFromTime(distanceKm, goalSeconds);
  else refSpm = 360;
  refSpm = clamp(refSpm, 180, 600);
  let easySpm = refSpm + 60;
  let marathonSpm = refSpm + 20;
  let thresholdSpm = refSpm - 10;
  let intervalSpm = refSpm - 25;
  let repetitionSpm = refSpm - 40;
  easySpm = clamp(Math.round(easySpm), 180, 900);
  marathonSpm = clamp(Math.round(marathonSpm), 180, 900);
  thresholdSpm = clamp(Math.round(thresholdSpm), 150, 900);
  intervalSpm = clamp(Math.round(intervalSpm), 140, 900);
  repetitionSpm = clamp(Math.round(repetitionSpm), 130, 900);
  const eps = 5;
  marathonSpm = Math.min(marathonSpm, easySpm - eps);
  thresholdSpm = Math.min(thresholdSpm, marathonSpm - eps);
  intervalSpm = Math.min(intervalSpm, thresholdSpm - eps);
  repetitionSpm = Math.min(repetitionSpm, intervalSpm - eps);
  return { easySpm, marathonSpm, thresholdSpm, intervalSpm, repetitionSpm };
}
function fmtPace(spm) {
  const m = Math.floor(spm / 60);
  const s = Math.round(spm % 60);
  return `${m}:${s.toString().padStart(2, "0")}/km`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function generatePlan(profile, goal) {
  const raceDate = new Date(goal.raceDate);
  const today = /* @__PURE__ */ new Date();
  const totalDays = Math.max(56, Math.round((raceDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24)));
  const startDate = addDays(raceDate, -totalDays);
  const weeks = Math.ceil(totalDays / 7);
  const paces = derivePaces({ best5kSeconds: profile.best5kSeconds || void 0, best10kSeconds: profile.best10kSeconds || void 0, goalSeconds: goal.goalSeconds || void 0, distanceKm: goal.distanceKm });
  const longRunDay = (goal.longRunDay || profile.longRunDay || "Sat").slice(0, 3);
  const workouts = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const lrIdx = days.indexOf(longRunDay) >= 0 ? days.indexOf(longRunDay) : 6;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = addDays(startDate, w * 7 + d);
      const dow = date.getDay();
      let type = "E", title = "\u0E27\u0E34\u0E48\u0E07\u0E40\u0E1A\u0E32", details = `Easy ${fmtPace(paces.easySpm)} 40-60 \u0E19\u0E32\u0E17\u0E35`;
      let distanceKm = void 0;
      if (dow === lrIdx) {
        type = "LR";
        const lrKm = Math.min(30, Math.max(8, 10 + w * 1));
        title = "\u0E27\u0E34\u0E48\u0E07\u0E22\u0E32\u0E27";
        details = `Long Run ~${lrKm} \u0E01\u0E21. \u0E17\u0E35\u0E48 ${fmtPace(paces.easySpm)}`;
        distanceKm = lrKm;
      }
      if (dow === (lrIdx + 2) % 7 || dow === (lrIdx + 4) % 7) {
        if (w < Math.floor(weeks * 0.4)) {
          type = "T";
          title = "\u0E40\u0E17\u0E21\u0E42\u0E1B\u0E40\u0E1A\u0E32";
          details = `Tempo 3\xD78 \u0E19\u0E32\u0E17\u0E35 @ ${fmtPace(paces.thresholdSpm)} \u0E1E\u0E31\u0E01 2 \u0E19\u0E32\u0E17\u0E35\u0E08\u0E47\u0E2D\u0E01`;
        } else if (w < Math.floor(weeks * 0.8)) {
          type = "I";
          title = "\u0E2D\u0E34\u0E19\u0E40\u0E17\u0E2D\u0E23\u0E4C\u0E27\u0E2D\u0E25";
          details = `Intervals 5\xD71000 \u0E21. @ ${fmtPace(paces.intervalSpm)} \u0E1E\u0E31\u0E01 2-3 \u0E19\u0E32\u0E17\u0E35`;
        } else {
          type = "R";
          title = "\u0E40\u0E23\u0E1E\u0E34\u0E17\u0E34\u0E0A\u0E31\u0E19";
          details = `Reps 8\xD7400 \u0E21. @ ${fmtPace(paces.repetitionSpm)} \u0E1E\u0E31\u0E01 200 \u0E21. \u0E08\u0E47\u0E2D\u0E01`;
        }
      }
      if (w >= weeks - 2) {
        if (type === "LR") details = `Long Run \u0E25\u0E14\u0E23\u0E30\u0E22\u0E30 ~${Math.round((distanceKm || 18) * 0.7)} \u0E01\u0E21. \u0E41\u0E1A\u0E1A\u0E0A\u0E34\u0E25`;
        if (type === "I" || type === "R" || type === "T") {
          details = `\u0E25\u0E14\u0E04\u0E34\u0E27\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1A\u0E32 20-40 \u0E19\u0E32\u0E17\u0E35 \u0E17\u0E35\u0E48 ${fmtPace(paces.easySpm)}`;
          type = "E";
          title = "\u0E27\u0E34\u0E48\u0E07\u0E40\u0E1A\u0E32 (Taper)";
        }
      }
      if (date.toDateString() === raceDate.toDateString()) {
        workouts.push({ id: cryptoRandomId(), date, type: "Race", title: `\u0E41\u0E02\u0E48\u0E07 ${goal.distanceKm} \u0E01\u0E21.`, details: "Race Day \u2014 \u0E42\u0E0A\u0E04\u0E14\u0E35!", distanceKm: goal.distanceKm });
        continue;
      }
      if (dow === (lrIdx + 1) % 7) {
        workouts.push({ id: cryptoRandomId(), date, type: "Rest", title: "\u0E1E\u0E31\u0E01", details: "Active recovery: \u0E40\u0E14\u0E34\u0E19/\u0E22\u0E37\u0E14\u0E40\u0E2B\u0E22\u0E35\u0E22\u0E14/\u0E42\u0E1F\u0E21\u0E42\u0E23\u0E25" });
        continue;
      }
      workouts.push({ id: cryptoRandomId(), date, type, title, details, distanceKm });
    }
  }
  return { startDate, weeks, workouts, paces };
}
function cryptoRandomId() {
  return "w_" + Math.random().toString(36).slice(2, 10);
}

const prisma = new PrismaClient();
const generate_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth");
  if (!token) throw createError({ statusCode: 401 });
  const { uid } = await verifyJwt(token);
  const body = await readBody(event);
  const { distanceKm, raceDate, goalSeconds, longRunDay } = body || {};
  if (!distanceKm || !raceDate) throw createError({ statusCode: 400, statusMessage: "distanceKm & raceDate required" });
  const existing = await prisma.trainingPlan.findFirst({ where: { userId: uid } });
  if (existing) throw createError({ statusCode: 409, statusMessage: "PLAN_EXISTS: \u0E04\u0E38\u0E13\u0E21\u0E35\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E2D\u0E22\u0E39\u0E48 \u0E42\u0E1B\u0E23\u0E14\u0E25\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E43\u0E2B\u0E21\u0E48" });
  const me = await prisma.user.findUnique({ where: { id: uid }, include: { profile: true } });
  if (!me) throw createError({ statusCode: 404 });
  const planData = generatePlan(me.profile || {}, { distanceKm, raceDate, goalSeconds, longRunDay });
  const plan = await prisma.trainingPlan.create({
    data: {
      userId: uid,
      startDate: planData.startDate,
      weeks: planData.weeks,
      workouts: { create: planData.workouts.map((w) => ({ date: w.date, type: w.type, title: w.title, details: w.details || "", distanceKm: w.distanceKm || null })) }
    }
  });
  const goal = await prisma.raceGoal.create({ data: { userId: uid, distanceKm, raceDate: new Date(raceDate), goalSeconds: goalSeconds || null, plan: { connect: { id: plan.id } } } });
  if (longRunDay) {
    try {
      await prisma.profile.update({ where: { userId: uid }, data: { longRunDay } });
    } catch {
    }
  }
  return { ok: true, planId: plan.id, goalId: goal.id, workouts: planData.workouts, paces: planData.paces, meta: { distanceKm, raceDate, goalSeconds, longRunDay } };
});
async function verifyJwt(token) {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));
  return payload;
}

export { generate_post as default };
//# sourceMappingURL=generate.post.mjs.map
