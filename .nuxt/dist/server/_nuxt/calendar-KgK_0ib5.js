import { defineComponent, ref, withAsyncContext, computed, reactive, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { c as computeHrZones, r as renderDetailsWithHR } from "./hr-CPjq97H4.js";
import { C as Card } from "./Card-ZF3S32RN.js";
import { _ as _sfc_main$1 } from "./WorkoutTypeBadge-BPMo3NVu.js";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { u as useUiStore } from "./ui-BVa8d3Kw.js";
import { u as usePlanStore } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/hookable/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/unctx/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/radix3/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/defu/dist/defu.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/ufo/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const planStore = usePlanStore();
    const ui = useUiStore();
    const selected = ref(null);
    const me = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/auth/me").catch(() => null)), __temp = await __temp, __restore(), __temp);
    const prof = computed(() => me?.profile ?? null);
    const zones = computed(() => computeHrZones({ method: prof.value?.hrMethod || "max", maxHR: prof.value?.maxHR ?? null, thresholdHR: prof.value?.thresholdHR ?? null, ageYears: prof.value?.ageYears ?? null }));
    const renderDetails = (w) => renderDetailsWithHR(w?.details || "", w?.type || "", zones.value);
    const formatDate = (d) => new Date(d).toLocaleDateString();
    const events = computed(() => planStore.workouts.map((w) => ({ id: w.id, title: w.title, start: new Date(w.date).toISOString().slice(0, 10), allDay: true, classNames: [`evt-${w.type}`], extendedProps: { workout: w } })));
    const isMobile = ref(false);
    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: isMobile.value ? "dayGridWeek" : "dayGridMonth",
      events,
      eventClick: (info) => {
        const w = info?.event?.extendedProps?.workout;
        if (w) selected.value = w;
      }
    });
    const { icsUrl } = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/plan/ics-url")), __temp = await __temp, __restore(), __temp);
    if (!icsUrl || icsUrl === "#") ui.info("ยังไม่มีแผนสำหรับสร้างไฟล์ .ics");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>ปฏิทินการซ้อม</h2><a${ssrRenderAttr("href", unref(icsUrl))} target="_blank" class="btn-ghost"${_scopeId}>ดาวน์โหลด .ics</a></div>`);
            _push2(ssrRenderComponent(unref(FullCalendar), { options: unref(calendarOptions) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("h2", { class: "text-xl font-semibold" }, "ปฏิทินการซ้อม"),
                createVNode("a", {
                  href: unref(icsUrl),
                  target: "_blank",
                  class: "btn-ghost"
                }, "ดาวน์โหลด .ics", 8, ["href"])
              ]),
              createVNode(unref(FullCalendar), { options: unref(calendarOptions) }, null, 8, ["options"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(selected)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div class="w-full max-w-lg rounded-2xl border border-white/10 bg-ink-800/90 backdrop-blur p-5"><div class="flex items-start justify-between gap-3"><h3 class="text-lg font-semibold text-white">${ssrInterpolate(unref(selected).title)}</h3><button class="btn-ghost">ปิด</button></div><div class="mt-3 space-y-2 text-sm text-gray-300"><div><span class="text-gray-400">วันที่:</span> ${ssrInterpolate(formatDate(unref(selected).date))}</div><div class="flex items-center gap-2"><span class="text-gray-400">ประเภท:</span>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          type: unref(selected).type
        }, null, _parent));
        _push(`</div>`);
        if (unref(selected).distanceKm) {
          _push(`<div><span class="text-gray-400">ระยะ:</span> ${ssrInterpolate(unref(selected).distanceKm)} กม.</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selected).details) {
          _push(`<div class="whitespace-pre-wrap"><span class="text-gray-400">รายละเอียด:</span> ${ssrInterpolate(renderDetails(unref(selected)))}</div>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=calendar-KgK_0ib5.js.map
