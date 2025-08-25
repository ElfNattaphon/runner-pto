import { defineComponent, ref, withAsyncContext, computed, reactive, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { c as computeHrZones, r as renderDetailsWithHR } from './hr-CPjq97H4.mjs';
import { C as Card } from './Card-ZF3S32RN.mjs';
import { _ as _sfc_main$1 } from './WorkoutTypeBadge-BPMo3NVu.mjs';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { u as useUiStore } from './ui-BVa8d3Kw.mjs';
import { u as usePlanStore } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const planStore = usePlanStore();
    const ui = useUiStore();
    const selected = ref(null);
    const me = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/auth/me").catch(() => null)), __temp = await __temp, __restore(), __temp);
    const prof = computed(() => {
      var _a;
      return (_a = me == null ? void 0 : me.profile) != null ? _a : null;
    });
    const zones = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      return computeHrZones({ method: ((_a = prof.value) == null ? void 0 : _a.hrMethod) || "max", maxHR: (_c = (_b = prof.value) == null ? void 0 : _b.maxHR) != null ? _c : null, thresholdHR: (_e = (_d = prof.value) == null ? void 0 : _d.thresholdHR) != null ? _e : null, ageYears: (_g = (_f = prof.value) == null ? void 0 : _f.ageYears) != null ? _g : null });
    });
    const renderDetails = (w) => renderDetailsWithHR((w == null ? void 0 : w.details) || "", (w == null ? void 0 : w.type) || "", zones.value);
    const formatDate = (d) => new Date(d).toLocaleDateString();
    const events = computed(() => planStore.workouts.map((w) => ({ id: w.id, title: w.title, start: new Date(w.date).toISOString().slice(0, 10), allDay: true, classNames: [`evt-${w.type}`], extendedProps: { workout: w } })));
    const isMobile = ref(false);
    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: isMobile.value ? "dayGridWeek" : "dayGridMonth",
      events,
      eventClick: (info) => {
        var _a, _b;
        const w = (_b = (_a = info == null ? void 0 : info.event) == null ? void 0 : _a.extendedProps) == null ? void 0 : _b.workout;
        if (w) selected.value = w;
      }
    });
    const { icsUrl } = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/plan/ics-url")), __temp = await __temp, __restore(), __temp);
    if (!icsUrl || icsUrl === "#") ui.info("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E41\u0E1C\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C .ics");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E49\u0E2D\u0E21</h2><a${ssrRenderAttr("href", unref(icsUrl))} target="_blank" class="btn-ghost"${_scopeId}>\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 .ics</a></div>`);
            _push2(ssrRenderComponent(unref(FullCalendar), { options: unref(calendarOptions) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("h2", { class: "text-xl font-semibold" }, "\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E49\u0E2D\u0E21"),
                createVNode("a", {
                  href: unref(icsUrl),
                  target: "_blank",
                  class: "btn-ghost"
                }, "\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14 .ics", 8, ["href"])
              ]),
              createVNode(unref(FullCalendar), { options: unref(calendarOptions) }, null, 8, ["options"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(selected)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div class="w-full max-w-lg rounded-2xl border border-white/10 bg-ink-800/90 backdrop-blur p-5"><div class="flex items-start justify-between gap-3"><h3 class="text-lg font-semibold text-white">${ssrInterpolate(unref(selected).title)}</h3><button class="btn-ghost">\u0E1B\u0E34\u0E14</button></div><div class="mt-3 space-y-2 text-sm text-gray-300"><div><span class="text-gray-400">\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48:</span> ${ssrInterpolate(formatDate(unref(selected).date))}</div><div class="flex items-center gap-2"><span class="text-gray-400">\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17:</span>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          type: unref(selected).type
        }, null, _parent));
        _push(`</div>`);
        if (unref(selected).distanceKm) {
          _push(`<div><span class="text-gray-400">\u0E23\u0E30\u0E22\u0E30:</span> ${ssrInterpolate(unref(selected).distanceKm)} \u0E01\u0E21.</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selected).details) {
          _push(`<div class="whitespace-pre-wrap"><span class="text-gray-400">\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14:</span> ${ssrInterpolate(renderDetails(unref(selected)))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/calendar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=calendar-KgK_0ib5.mjs.map
