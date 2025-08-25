import { _ as __nuxt_component_0 } from './nuxt-link-D5ZCHyL0.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { c as computeHrZones, r as renderDetailsWithHR } from './hr-CPjq97H4.mjs';
import { C as Card } from './Card-ZF3S32RN.mjs';
import { _ as _sfc_main$2 } from './WorkoutTypeBadge-BPMo3NVu.mjs';
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
const lastGoal = "\u2014";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
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
    const planStore = usePlanStore();
    const workouts = computed(() => planStore.workouts);
    const meta = computed(() => planStore.planMeta);
    const weeklyKm = computed(() => Math.round(workouts.value.slice(0, 7).reduce((s, w) => s + (w.distanceKm || 0), 0)));
    const formatHMS = (sec) => {
      if (!sec) return "\u2014";
      const h = Math.floor(sec / 3600);
      const m = Math.floor(sec % 3600 / 60);
      const s = sec % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-end justify-between"><div><h1 class="text-2xl font-semibold">\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35 ${ssrInterpolate(((_b = (_a = unref(me)) == null ? void 0 : _a.profile) == null ? void 0 : _b.fullName) || ((_c = unref(me)) == null ? void 0 : _c.email))}</h1><p class="text-gray-400">\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E15\u0E32\u0E23\u0E32\u0E07\u0E0B\u0E49\u0E2D\u0E21\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E44\u0E14\u0E49\u0E08\u0E32\u0E01\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/planner",
        class: "btn-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19`);
          } else {
            return [
              createTextVNode("\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49",
        value: unref(weeklyKm) + " \u0E01\u0E21.",
        sub: "\u0E23\u0E30\u0E22\u0E30\u0E23\u0E27\u0E21\u0E15\u0E32\u0E21\u0E41\u0E1C\u0E19"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "\u0E27\u0E31\u0E19\u0E27\u0E34\u0E48\u0E07\u0E22\u0E32\u0E27",
        value: ((_e = (_d = unref(me)) == null ? void 0 : _d.profile) == null ? void 0 : _e.longRunDay) || unref(meta).longRunDay || "Sat",
        sub: "\u0E27\u0E31\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "\u0E23\u0E30\u0E22\u0E30\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22",
        value: lastGoal,
        sub: "\u0E08\u0E32\u0E01\u0E41\u0E1C\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg font-semibold mb-2"${_scopeId}>\u0E41\u0E1C\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19</h2><div class="text-sm text-gray-300 space-y-1"${_scopeId}><div${_scopeId}>\u0E23\u0E30\u0E22\u0E30: <span class="font-medium"${_scopeId}>${ssrInterpolate(unref(meta).distanceKm ? unref(meta).distanceKm + " \u0E01\u0E21." : "\u2014")}</span></div><div${_scopeId}>\u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22: <span class="font-medium"${_scopeId}>${ssrInterpolate(formatHMS(unref(meta).goalSeconds))}</span></div><div${_scopeId}>\u0E27\u0E31\u0E19\u0E41\u0E02\u0E48\u0E07: <span class="font-medium"${_scopeId}>${ssrInterpolate(unref(meta).raceDate ? new Date(unref(meta).raceDate).toLocaleDateString() : "\u2014")}</span></div></div><div class="mt-3"${_scopeId}><h3 class="text-sm font-semibold mb-1"${_scopeId}>\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08 (\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23)</h3><ul class="text-xs text-gray-300 space-y-0.5"${_scopeId}><li${_scopeId}>Easy / Long Run: Z2</li><li${_scopeId}>Marathon: Z3</li><li${_scopeId}>Tempo: Z3\u2013Z4</li><li${_scopeId}>Intervals: Z4</li><li${_scopeId}>Reps: Z5</li></ul><p class="text-[11px] text-gray-400 mt-2"${_scopeId}>* \u0E04\u0E33\u0E19\u0E27\u0E13\u0E08\u0E32\u0E01 Threshold/Max HR \u0E43\u0E19\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C \u0E2B\u0E32\u0E01\u0E43\u0E2A\u0E48\u0E04\u0E48\u0E32\u0E04\u0E23\u0E1A\u0E08\u0E30\u0E23\u0E30\u0E1A\u0E38 BPM \u0E43\u0E19\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E04\u0E34\u0E27\u0E0B\u0E49\u0E2D\u0E21</p></div>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg font-semibold mb-2" }, "\u0E41\u0E1C\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"),
              createVNode("div", { class: "text-sm text-gray-300 space-y-1" }, [
                createVNode("div", null, [
                  createTextVNode("\u0E23\u0E30\u0E22\u0E30: "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(meta).distanceKm ? unref(meta).distanceKm + " \u0E01\u0E21." : "\u2014"), 1)
                ]),
                createVNode("div", null, [
                  createTextVNode("\u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22: "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(formatHMS(unref(meta).goalSeconds)), 1)
                ]),
                createVNode("div", null, [
                  createTextVNode("\u0E27\u0E31\u0E19\u0E41\u0E02\u0E48\u0E07: "),
                  createVNode("span", { class: "font-medium" }, toDisplayString(unref(meta).raceDate ? new Date(unref(meta).raceDate).toLocaleDateString() : "\u2014"), 1)
                ])
              ]),
              createVNode("div", { class: "mt-3" }, [
                createVNode("h3", { class: "text-sm font-semibold mb-1" }, "\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08 (\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23)"),
                createVNode("ul", { class: "text-xs text-gray-300 space-y-0.5" }, [
                  createVNode("li", null, "Easy / Long Run: Z2"),
                  createVNode("li", null, "Marathon: Z3"),
                  createVNode("li", null, "Tempo: Z3\u2013Z4"),
                  createVNode("li", null, "Intervals: Z4"),
                  createVNode("li", null, "Reps: Z5")
                ]),
                createVNode("p", { class: "text-[11px] text-gray-400 mt-2" }, "* \u0E04\u0E33\u0E19\u0E27\u0E13\u0E08\u0E32\u0E01 Threshold/Max HR \u0E43\u0E19\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C \u0E2B\u0E32\u0E01\u0E43\u0E2A\u0E48\u0E04\u0E48\u0E32\u0E04\u0E23\u0E1A\u0E08\u0E30\u0E23\u0E30\u0E1A\u0E38 BPM \u0E43\u0E19\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E04\u0E34\u0E27\u0E0B\u0E49\u0E2D\u0E21")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg font-semibold mb-3"${_scopeId}>\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E41\u0E23\u0E01</h2><ul class="divide-y divide-white/10"${_scopeId}><!--[-->`);
            ssrRenderList(unref(workouts).slice(0, 7), (w) => {
              _push2(`<li class="py-2 flex items-center justify-between"${_scopeId}><div class="space-y-0.5"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(new Date(w.date).toLocaleDateString())} \u2014 ${ssrInterpolate(w.title)}</div><div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(renderDetails(w))}</div></div>`);
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
                  _push3(`\u0E40\u0E1B\u0E34\u0E14\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19`);
                } else {
                  return [
                    createTextVNode("\u0E40\u0E1B\u0E34\u0E14\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg font-semibold mb-3" }, "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E41\u0E23\u0E01"),
              createVNode("ul", { class: "divide-y divide-white/10" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(workouts).slice(0, 7), (w) => {
                  return openBlock(), createBlock("li", {
                    key: w.id,
                    class: "py-2 flex items-center justify-between"
                  }, [
                    createVNode("div", { class: "space-y-0.5" }, [
                      createVNode("div", { class: "font-medium" }, toDisplayString(new Date(w.date).toLocaleDateString()) + " \u2014 " + toDisplayString(w.title), 1),
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
                    createTextVNode("\u0E40\u0E1B\u0E34\u0E14\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19")
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

export { _sfc_main as default };
//# sourceMappingURL=index-V1WwtrUU.mjs.map
