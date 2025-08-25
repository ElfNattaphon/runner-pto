import { c as defineEventHandler, i as getQuery, e as createError, j as setHeader } from '../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { createEvents } from 'ics';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const prisma = new PrismaClient();
const ics_get = defineEventHandler(async (event) => {
  const planId = getQuery(event).planId;
  if (!planId) throw createError({ statusCode: 400 });
  const plan = await prisma.trainingPlan.findUnique({ where: { id: planId }, include: { workouts: true } });
  if (!plan) throw createError({ statusCode: 404 });
  const events = plan.workouts.map((w) => {
    const dt = new Date(w.date);
    const start = [dt.getFullYear(), dt.getMonth() + 1, dt.getDate(), 6, 0];
    return { title: w.title, start, duration: { hours: 1, minutes: 0 }, description: `${w.type} \u2014 ${w.details || ""}` };
  });
  const { error, value } = createEvents(events);
  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  setHeader(event, "Content-Type", "text/calendar; charset=utf-8");
  setHeader(event, "Content-Disposition", `attachment; filename="plan_${planId}.ics"`);
  return value;
});

export { ics_get as default };
//# sourceMappingURL=ics.get.mjs.map
