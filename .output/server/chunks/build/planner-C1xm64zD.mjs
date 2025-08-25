import { _ as __nuxt_component_0 } from './nuxt-link-D5ZCHyL0.mjs';
import { defineComponent, ref, computed, withCtx, unref, isRef, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, withDirectives, vModelSelect, vModelText, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { C as Card } from './Card-ZF3S32RN.mjs';
import { _ as _sfc_main$2 } from './WorkoutTypeBadge-BPMo3NVu.mjs';
import { _ as _sfc_main$1 } from './TimeHMSInput-DArq7jMJ.mjs';
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
  __name: "planner",
  __ssrInlineRender: true,
  setup(__props) {
    const distanceKm = ref(10);
    const raceDate = ref(new Date(Date.now() + 1e3 * 60 * 60 * 24 * 84).toISOString().slice(0, 10));
    const goalSeconds = ref(null);
    const longRunDay = ref("Sat");
    const planStore = usePlanStore();
    const workouts = computed(() => planStore.workouts);
    const meta = computed(() => planStore.planMeta);
    const hasPlan = computed(() => workouts.value.length > 0);
    const ui = useUiStore();
    const formatHMS = (sec) => {
      if (!sec) return "\u2014";
      const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };
    const onDeletePlan = async () => {
      const ok = confirm("\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14?");
      if (!ok) return;
      try {
        const del = await $fetch("/api/plan/delete", { method: "POST" });
        ui.success(`\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E41\u0E25\u0E49\u0E27 (${del.deleted})`);
        planStore.setWorkouts([]);
        planStore.setMeta({});
      } catch (e) {
        ui.error((e == null ? void 0 : e.statusMessage) || "\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
      }
    };
    const create = async () => {
      try {
        const res = await $fetch("/api/plan/generate", { method: "POST", body: { distanceKm: distanceKm.value, raceDate: raceDate.value, goalSeconds: goalSeconds.value, longRunDay: longRunDay.value } });
        planStore.setWorkouts(res.workouts || []);
        if (res == null ? void 0 : res.meta) planStore.setMeta(res.meta);
        ui.success("\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
      } catch (e) {
        if ((e == null ? void 0 : e.statusCode) === 409) {
          const ok = confirm("\u0E04\u0E38\u0E13\u0E21\u0E35\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E2D\u0E22\u0E39\u0E48 \u0E15\u0E49\u0E2D\u0E07\u0E25\u0E1A\u0E2D\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E43\u0E2B\u0E21\u0E48\n\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48?");
          if (ok) {
            try {
              const del = await $fetch("/api/plan/delete", { method: "POST" });
              ui.info(`\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E41\u0E25\u0E49\u0E27 (${del.deleted} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23) \u0E25\u0E2D\u0E07\u0E01\u0E14\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07`);
            } catch (delErr) {
              ui.error((delErr == null ? void 0 : delErr.statusMessage) || "\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
            }
          }
        } else {
          ui.error((e == null ? void 0 : e.statusMessage) || "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(Card, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold mb-4"${_scopeId}>\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E15\u0E32\u0E23\u0E32\u0E07\u0E0B\u0E49\u0E2D\u0E21</h2>`);
            if (unref(hasPlan)) {
              _push2(`<div class="rounded-xl border border-white/10 p-4 bg-ink-800/60 mb-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><div class="font-medium"${_scopeId}>\u0E21\u0E35\u0E41\u0E1C\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27</div><div class="text-sm text-gray-400"${_scopeId}>\u0E23\u0E30\u0E22\u0E30 ${ssrInterpolate(unref(meta).distanceKm || "\u2014")} \u0E01\u0E21. | \u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 ${ssrInterpolate(formatHMS(unref(meta).goalSeconds))} | \u0E27\u0E31\u0E19\u0E41\u0E02\u0E48\u0E07 ${ssrInterpolate(unref(meta).raceDate ? new Date(unref(meta).raceDate).toLocaleDateString() : "\u2014")}</div></div><button class="btn-ghost"${_scopeId}>\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21</button></div><p class="text-xs text-gray-400 mt-2"${_scopeId}>\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19 \u0E08\u0E36\u0E07\u0E08\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E43\u0E2B\u0E21\u0E48\u0E44\u0E14\u0E49</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!unref(hasPlan)) {
              _push2(`<form class="grid md:grid-cols-4 gap-4"${_scopeId}><div class="md:col-span-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E23\u0E30\u0E22\u0E30</label><select class="form-input"${_scopeId}><option${ssrRenderAttr("value", 5)}${ssrIncludeBooleanAttr(Array.isArray(unref(distanceKm)) ? ssrLooseContain(unref(distanceKm), 5) : ssrLooseEqual(unref(distanceKm), 5)) ? " selected" : ""}${_scopeId}>5K</option><option${ssrRenderAttr("value", 10)}${ssrIncludeBooleanAttr(Array.isArray(unref(distanceKm)) ? ssrLooseContain(unref(distanceKm), 10) : ssrLooseEqual(unref(distanceKm), 10)) ? " selected" : ""}${_scopeId}>10K</option><option${ssrRenderAttr("value", 21.097)}${ssrIncludeBooleanAttr(Array.isArray(unref(distanceKm)) ? ssrLooseContain(unref(distanceKm), 21.097) : ssrLooseEqual(unref(distanceKm), 21.097)) ? " selected" : ""}${_scopeId}>Half Marathon</option><option${ssrRenderAttr("value", 42.195)}${ssrIncludeBooleanAttr(Array.isArray(unref(distanceKm)) ? ssrLooseContain(unref(distanceKm), 42.195) : ssrLooseEqual(unref(distanceKm), 42.195)) ? " selected" : ""}${_scopeId}>Marathon</option><option${ssrRenderAttr("value", 1.5)}${ssrIncludeBooleanAttr(Array.isArray(unref(distanceKm)) ? ssrLooseContain(unref(distanceKm), 1.5) : ssrLooseEqual(unref(distanceKm), 1.5)) ? " selected" : ""}${_scopeId}>1500m (\u0E25\u0E39\u0E48)</option></select></div><div class="md:col-span-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E27\u0E31\u0E19\u0E41\u0E02\u0E48\u0E07</label><input${ssrRenderAttr("value", unref(raceDate))} type="date" class="form-input"${_scopeId}></div><div class="md:col-span-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E27\u0E31\u0E19\u0E27\u0E34\u0E48\u0E07\u0E22\u0E32\u0E27</label><select class="form-input"${_scopeId}><option value="Mon"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Mon") : ssrLooseEqual(unref(longRunDay), "Mon")) ? " selected" : ""}${_scopeId}>\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C</option><option value="Tue"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Tue") : ssrLooseEqual(unref(longRunDay), "Tue")) ? " selected" : ""}${_scopeId}>\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23</option><option value="Wed"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Wed") : ssrLooseEqual(unref(longRunDay), "Wed")) ? " selected" : ""}${_scopeId}>\u0E1E\u0E38\u0E18</option><option value="Thu"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Thu") : ssrLooseEqual(unref(longRunDay), "Thu")) ? " selected" : ""}${_scopeId}>\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E2F</option><option value="Fri"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Fri") : ssrLooseEqual(unref(longRunDay), "Fri")) ? " selected" : ""}${_scopeId}>\u0E28\u0E38\u0E01\u0E23\u0E4C</option><option value="Sat"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Sat") : ssrLooseEqual(unref(longRunDay), "Sat")) ? " selected" : ""}${_scopeId}>\u0E40\u0E2A\u0E32\u0E23\u0E4C</option><option value="Sun"${ssrIncludeBooleanAttr(Array.isArray(unref(longRunDay)) ? ssrLooseContain(unref(longRunDay), "Sun") : ssrLooseEqual(unref(longRunDay), "Sun")) ? " selected" : ""}${_scopeId}>\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C</option></select></div><div class="md:col-span-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 (hh:mm:ss)</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: unref(goalSeconds),
                "onUpdate:modelValue": ($event) => isRef(goalSeconds) ? goalSeconds.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="md:col-span-4 flex items-center gap-3"${_scopeId}><button class="btn-accent"${_scopeId}>\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19</button>`);
              if (unref(workouts).length) {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: "/calendar",
                  class: "btn-ghost"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`\u0E14\u0E39\u0E43\u0E19 Calendar`);
                    } else {
                      return [
                        createTextVNode("\u0E14\u0E39\u0E43\u0E19 Calendar")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(workouts).length) {
              _push2(`<div class="mt-6"${_scopeId}><h3 class="font-semibold mb-3"${_scopeId}>\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E41\u0E23\u0E01</h3><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(workouts).slice(0, 7), (w) => {
                _push2(`<div class="rounded-xl border border-white/10 p-4 bg-ink-800/60"${_scopeId}><div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(new Date(w.date).toLocaleDateString())}</div><div class="font-medium text-white"${_scopeId}>${ssrInterpolate(w.title)}</div><div class="text-sm text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(w.details)}</div><div class="mt-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  type: w.type
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold mb-4" }, "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E15\u0E32\u0E23\u0E32\u0E07\u0E0B\u0E49\u0E2D\u0E21"),
              unref(hasPlan) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-xl border border-white/10 p-4 bg-ink-800/60 mb-4"
              }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "font-medium" }, "\u0E21\u0E35\u0E41\u0E1C\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27"),
                    createVNode("div", { class: "text-sm text-gray-400" }, "\u0E23\u0E30\u0E22\u0E30 " + toDisplayString(unref(meta).distanceKm || "\u2014") + " \u0E01\u0E21. | \u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 " + toDisplayString(formatHMS(unref(meta).goalSeconds)) + " | \u0E27\u0E31\u0E19\u0E41\u0E02\u0E48\u0E07 " + toDisplayString(unref(meta).raceDate ? new Date(unref(meta).raceDate).toLocaleDateString() : "\u2014"), 1)
                  ]),
                  createVNode("button", {
                    class: "btn-ghost",
                    onClick: withModifiers(onDeletePlan, ["prevent"])
                  }, "\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21")
                ]),
                createVNode("p", { class: "text-xs text-gray-400 mt-2" }, "\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E1A\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19 \u0E08\u0E36\u0E07\u0E08\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E43\u0E2B\u0E21\u0E48\u0E44\u0E14\u0E49")
              ])) : createCommentVNode("", true),
              !unref(hasPlan) ? (openBlock(), createBlock("form", {
                key: 1,
                onSubmit: withModifiers(create, ["prevent"]),
                class: "grid md:grid-cols-4 gap-4"
              }, [
                createVNode("div", { class: "md:col-span-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E23\u0E30\u0E22\u0E30"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => isRef(distanceKm) ? distanceKm.value = $event : null,
                    class: "form-input"
                  }, [
                    createVNode("option", { value: 5 }, "5K"),
                    createVNode("option", { value: 10 }, "10K"),
                    createVNode("option", { value: 21.097 }, "Half Marathon"),
                    createVNode("option", { value: 42.195 }, "Marathon"),
                    createVNode("option", { value: 1.5 }, "1500m (\u0E25\u0E39\u0E48)")
                  ], 8, ["onUpdate:modelValue"]), [
                    [
                      vModelSelect,
                      unref(distanceKm),
                      void 0,
                      { number: true }
                    ]
                  ])
                ]),
                createVNode("div", { class: "md:col-span-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E27\u0E31\u0E19\u0E41\u0E02\u0E48\u0E07"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => isRef(raceDate) ? raceDate.value = $event : null,
                    type: "date",
                    class: "form-input"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(raceDate)]
                  ])
                ]),
                createVNode("div", { class: "md:col-span-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E27\u0E31\u0E19\u0E27\u0E34\u0E48\u0E07\u0E22\u0E32\u0E27"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => isRef(longRunDay) ? longRunDay.value = $event : null,
                    class: "form-input"
                  }, [
                    createVNode("option", { value: "Mon" }, "\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C"),
                    createVNode("option", { value: "Tue" }, "\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23"),
                    createVNode("option", { value: "Wed" }, "\u0E1E\u0E38\u0E18"),
                    createVNode("option", { value: "Thu" }, "\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E2F"),
                    createVNode("option", { value: "Fri" }, "\u0E28\u0E38\u0E01\u0E23\u0E4C"),
                    createVNode("option", { value: "Sat" }, "\u0E40\u0E2A\u0E32\u0E23\u0E4C"),
                    createVNode("option", { value: "Sun" }, "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(longRunDay)]
                  ])
                ]),
                createVNode("div", { class: "md:col-span-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 (hh:mm:ss)"),
                  createVNode(_sfc_main$1, {
                    modelValue: unref(goalSeconds),
                    "onUpdate:modelValue": ($event) => isRef(goalSeconds) ? goalSeconds.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "md:col-span-4 flex items-center gap-3" }, [
                  createVNode("button", { class: "btn-accent" }, "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19"),
                  unref(workouts).length ? (openBlock(), createBlock(_component_NuxtLink, {
                    key: 0,
                    to: "/calendar",
                    class: "btn-ghost"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u0E14\u0E39\u0E43\u0E19 Calendar")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ])
              ], 32)) : createCommentVNode("", true),
              unref(workouts).length ? (openBlock(), createBlock("div", {
                key: 2,
                class: "mt-6"
              }, [
                createVNode("h3", { class: "font-semibold mb-3" }, "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E41\u0E23\u0E01"),
                createVNode("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(workouts).slice(0, 7), (w) => {
                    return openBlock(), createBlock("div", {
                      key: w.id,
                      class: "rounded-xl border border-white/10 p-4 bg-ink-800/60"
                    }, [
                      createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(new Date(w.date).toLocaleDateString()), 1),
                      createVNode("div", { class: "font-medium text-white" }, toDisplayString(w.title), 1),
                      createVNode("div", { class: "text-sm text-gray-400 mt-1" }, toDisplayString(w.details), 1),
                      createVNode("div", { class: "mt-2" }, [
                        createVNode(_sfc_main$2, {
                          type: w.type
                        }, null, 8, ["type"])
                      ])
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/planner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=planner-C1xm64zD.mjs.map
