import { _ as __nuxt_component_0 } from "./nuxt-link-D5ZCHyL0.js";
import { defineComponent, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext, withAsyncContext, computed, mergeProps, unref, createTextVNode, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
import { c as computeHrZones, r as renderDetailsWithHR } from "./hr-CPjq97H4.js";
import { C as Card } from "./Card-ZF3S32RN.js";
import { _ as _sfc_main$2 } from "./WorkoutTypeBadge-BPMo3NVu.js";
import { u as usePlanStore } from "../server.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/hookable/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/unctx/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/radix3/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/defu/dist/defu.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/klona/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Stat",
  __ssrInlineRender: true,
  props: {
    title: {},
    value: {},
    sub: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Card, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.title)}</div><div class="text-2xl font-semibold text-white mt-1"${_scopeId}>${ssrInterpolate(_ctx.value)}</div>`);
            if (_ctx.sub) {
              _push2(`<div class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(_ctx.sub)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(_ctx.title), 1),
              createVNode("div", { class: "text-2xl font-semibold text-white mt-1" }, toDisplayString(_ctx.value), 1),
              _ctx.sub ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-xs text-gray-500 mt-1"
              }, toDisplayString(_ctx.sub), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Stat.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const lastGoal = "—";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const me = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/auth/me").catch(() => null)), __temp = await __temp, __restore(), __temp);
    const prof = computed(() => me?.profile ?? null);
    const zones = computed(() => computeHrZones({ method: prof.value?.hrMethod || "max", maxHR: prof.value?.maxHR ?? null, thresholdHR: prof.value?.thresholdHR ?? null, ageYears: prof.value?.ageYears ?? null }));
    const renderDetails = (w) => renderDetailsWithHR(w?.details || "", w?.type || "", zones.value);
    const planStore = usePlanStore();
    const workouts = computed(() => planStore.workouts);
    const meta = computed(() => planStore.planMeta);
    const weeklyKm = computed(() => Math.round(workouts.value.slice(0, 7).reduce((s, w) => s + (w.distanceKm || 0), 0)));
    const formatHMS = (sec) => {
      if (!sec) return "—";
      const h = Math.floor(sec / 3600);
      const m = Math.floor(sec % 3600 / 60);
      const s = sec % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-end justify-between"><div><h1 class="text-2xl font-semibold">สวัสดี ${ssrInterpolate(unref(me)?.profile?.fullName || unref(me)?.email)}</h1><p class="text-gray-400">จัดการตารางซ้อมของคุณได้จากที่นี่</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/planner",
        class: "btn-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`เริ่มสร้างแผน`);
          } else {
            return [
              createTextVNode("เริ่มสร้างแผน")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "สัปดาห์นี้",
        value: unref(weeklyKm) + " กม.",
        sub: "ระยะรวมตามแผน"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "วันวิ่งยาว",
        value: unref(me)?.profile?.longRunDay || unref(meta).longRunDay || "Sat",
        sub: "วันประจำสัปดาห์"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "ระยะเป้าหมาย",
        value: lastGoal,
        sub: "จากแผนล่าสุด"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg font-semibold mb-2"${_scopeId}>แผนปัจจุบัน</h2><div class="text-sm text-gray-300 space-y-1"${_scopeId}><div${_scopeId}>ระยะ: <span class="font-medium"${_scopeId}>${ssrInterpolate(unref(meta).distanceKm ? unref(meta).distanceKm + " กม." : "—")}</span></div><div${_scopeId}>เวลาเป้าหมาย: <span class="font-medium"${_scopeId}>${ssrInterpolate(formatHMS(unref(meta).goalSeconds))}</span></div><div${_scopeId}>วันแข่ง: <span class="font-medium"${_scopeId}>${ssrInterpolate(unref(meta).raceDate ? new Date(unref(meta).raceDate).toLocaleDateString() : "—")}</span></div></div><div class="mt-3"${_scopeId}><h3 class="text-sm font-semibold mb-1"${_scopeId}>โซนหัวใจ (ประมาณการ)</h3><ul class="text-xs text-gray-300 space-y-0.5"${_scopeId}><li${_scopeId}>Easy / Long Run: Z2</li><li${_scopeId}>Marathon: Z3</li><li${_scopeId}>Tempo: Z3–Z4</li><li${_scopeId}>Intervals: Z4</li><li${_scopeId}>Reps: Z5</li></ul><p class="text-[11px] text-gray-400 mt-2"${_scopeId}>* คำนวณจาก Threshold/Max HR ในโปรไฟล์ หากใส่ค่าครบจะระบุ BPM ในรายละเอียดคิวซ้อม</p></div>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg font-semibold mb-2" }, "แผนปัจจุบัน"),
              createVNode("div", { class: "text-sm text-gray-300 space-y-1" }, [
                createVNode("div", null, [
                  createTextVNode("ระยะ: "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(meta).distanceKm ? unref(meta).distanceKm + " กม." : "—"), 1)
                ]),
                createVNode("div", null, [
                  createTextVNode("เวลาเป้าหมาย: "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(formatHMS(unref(meta).goalSeconds)), 1)
                ]),
                createVNode("div", null, [
                  createTextVNode("วันแข่ง: "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(meta).raceDate ? new Date(unref(meta).raceDate).toLocaleDateString() : "—"), 1)
                ])
              ]),
              createVNode("div", { class: "mt-3" }, [
                createVNode("h3", { class: "text-sm font-semibold mb-1" }, "โซนหัวใจ (ประมาณการ)"),
                createVNode("ul", { class: "text-xs text-gray-300 space-y-0.5" }, [
                  createVNode("li", null, "Easy / Long Run: Z2"),
                  createVNode("li", null, "Marathon: Z3"),
                  createVNode("li", null, "Tempo: Z3–Z4"),
                  createVNode("li", null, "Intervals: Z4"),
                  createVNode("li", null, "Reps: Z5")
                ]),
                createVNode("p", { class: "text-[11px] text-gray-400 mt-2" }, "* คำนวณจาก Threshold/Max HR ในโปรไฟล์ หากใส่ค่าครบจะระบุ BPM ในรายละเอียดคิวซ้อม")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg font-semibold mb-3"${_scopeId}>สรุปสัปดาห์แรก</h2><ul class="divide-y divide-white/10"${_scopeId}><!--[-->`);
            ssrRenderList(unref(workouts).slice(0, 7), (w) => {
              _push2(`<li class="py-2 flex items-center justify-between"${_scopeId}><div class="space-y-0.5"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(new Date(w.date).toLocaleDateString())} — ${ssrInterpolate(w.title)}</div><div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(renderDetails(w))}</div></div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                type: w.type
              }, null, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/calendar",
              class: "text-skyx-400 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`เปิดปฏิทิน`);
                } else {
                  return [
                    createTextVNode("เปิดปฏิทิน")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg font-semibold mb-3" }, "สรุปสัปดาห์แรก"),
              createVNode("ul", { class: "divide-y divide-white/10" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(workouts).slice(0, 7), (w) => {
                  return openBlock(), createBlock("li", {
                    key: w.id,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    createVNode("div", { class: "space-y-0.5" }, [
                      createVNode("div", { class: "font-medium" }, toDisplayString(new Date(w.date).toLocaleDateString()) + " — " + toDisplayString(w.title), 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(renderDetails(w)), 1)
                    ]),
                    createVNode(_sfc_main$2, {
                      type: w.type
                    }, null, 8, ["type"])
                  ]);
                }), 128))
              ]),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_component_NuxtLink, {
                  to: "/calendar",
                  class: "text-skyx-400 hover:underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode("เปิดปฏิทิน")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-V1WwtrUU.js.map
