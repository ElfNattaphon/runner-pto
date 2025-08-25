import { defineComponent, withAsyncContext, reactive, computed, withCtx, unref, createVNode, withModifiers, withDirectives, vModelSelect, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { c as computeHrZones } from './hr-CPjq97H4.mjs';
import { C as Card } from './Card-ZF3S32RN.mjs';
import { _ as _sfc_main$2 } from './TimeHMSInput-DArq7jMJ.mjs';
import { u as useUiStore } from './ui-BVa8d3Kw.mjs';
import './server.mjs';
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
  __name: "FormField",
  __ssrInlineRender: true,
  props: {
    label: {},
    modelValue: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><label class="form-label">${ssrInterpolate(_ctx.label)}</label><input${ssrRenderAttr("value", _ctx.modelValue)} class="form-input"></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FormField.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const ui = useUiStore();
    const me = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/auth/me")), __temp = await __temp, __restore(), __temp);
    const defaults = { fullName: null, dob: null, sex: null, daysAvailable: null, ageYears: null, hrMethod: "max" };
    const form = reactive({ ...defaults, ...(me == null ? void 0 : me.profile) || {} });
    const hrPreview = computed(() => {
      var _a, _b, _c;
      return computeHrZones({ method: form.hrMethod || "max", maxHR: (_a = form.maxHR) != null ? _a : null, thresholdHR: (_b = form.thresholdHR) != null ? _b : null, ageYears: (_c = form.ageYears) != null ? _c : null });
    });
    const save = async () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      try {
        const payload = {
          fullName: (_a = form.fullName) != null ? _a : null,
          dob: (_b = form.dob) != null ? _b : null,
          sex: (_c = form.sex) != null ? _c : null,
          heightCm: (_d = form.heightCm) != null ? _d : null,
          weightKg: (_e = form.weightKg) != null ? _e : null,
          maxHR: (_f = form.maxHR) != null ? _f : null,
          thresholdHR: (_g = form.thresholdHR) != null ? _g : null,
          weeklyMileage: (_h = form.weeklyMileage) != null ? _h : null,
          daysAvailable: (_i = form.daysAvailable) != null ? _i : null,
          best5kSeconds: (_j = form.best5kSeconds) != null ? _j : null,
          best10kSeconds: (_k = form.best10kSeconds) != null ? _k : null,
          bestHMSeconds: (_l = form.bestHMSeconds) != null ? _l : null,
          bestMarSeconds: (_m = form.bestMarSeconds) != null ? _m : null,
          ageYears: (_n = form.ageYears) != null ? _n : null,
          hrMethod: (_o = form.hrMethod) != null ? _o : "max"
        };
        const res = await $fetch("/api/profile/update", { method: "POST", body: payload });
        ui.success("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E41\u0E25\u0E49\u0E27");
        if (res && res.persistedAgeHr === false) {
          ui.info("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E25\u0E49\u0E27 \u0E41\u0E15\u0E48\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A ageYears/hrMethod \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E23\u0E31\u0E19 prisma migrate dev");
        }
      } catch (e) {
        ui.error((e == null ? void 0 : e.statusMessage) || "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Card, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold mb-4"${_scopeId}>\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E19\u0E31\u0E01\u0E27\u0E34\u0E48\u0E07</h2><form class="grid md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).heightCm,
              "onUpdate:modelValue": ($event) => unref(form).heightCm = $event,
              modelModifiers: { number: true },
              label: "\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (\u0E0B\u0E21.)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).weightKg,
              "onUpdate:modelValue": ($event) => unref(form).weightKg = $event,
              modelModifiers: { number: true },
              label: "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 (\u0E01\u0E01.)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).maxHR,
              "onUpdate:modelValue": ($event) => unref(form).maxHR = $event,
              modelModifiers: { number: true },
              label: "Max HR"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).thresholdHR,
              "onUpdate:modelValue": ($event) => unref(form).thresholdHR = $event,
              modelModifiers: { number: true },
              label: "Threshold HR"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).weeklyMileage,
              "onUpdate:modelValue": ($event) => unref(form).weeklyMileage = $event,
              modelModifiers: { number: true },
              label: "\u0E27\u0E34\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C (\u0E01\u0E21.)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).ageYears,
              "onUpdate:modelValue": ($event) => unref(form).ageYears = $event,
              modelModifiers: { number: true },
              label: "\u0E2D\u0E32\u0E22\u0E38 (\u0E1B\u0E35)"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><label class="form-label"${_scopeId}>\u0E27\u0E34\u0E18\u0E35\u0E04\u0E33\u0E19\u0E27\u0E13\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08</label><select class="form-input"${_scopeId}><option value="max"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hrMethod) ? ssrLooseContain(unref(form).hrMethod, "max") : ssrLooseEqual(unref(form).hrMethod, "max")) ? " selected" : ""}${_scopeId}>\u0E08\u0E32\u0E01\u0E2D\u0E32\u0E22\u0E38 (Max HR ~ 220-\u0E2D\u0E32\u0E22\u0E38)</option><option value="threshold"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hrMethod) ? ssrLooseContain(unref(form).hrMethod, "threshold") : ssrLooseEqual(unref(form).hrMethod, "threshold")) ? " selected" : ""}${_scopeId}>\u0E08\u0E32\u0E01 Threshold HR (LTHR)</option></select><p class="text-xs text-gray-400 mt-1"${_scopeId}>Max HR (\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13): ${ssrInterpolate(unref(form).ageYears ? 220 - Number(unref(form).ageYears) : "\u2014")} bpm</p></div><div class="space-y-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E2A\u0E16\u0E34\u0E15\u0E34 10K (hh:mm:ss)</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).best10kSeconds,
              "onUpdate:modelValue": ($event) => unref(form).best10kSeconds = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60"${_scopeId}><div class="text-sm font-medium mb-1"${_scopeId}>\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08 (\u0E15\u0E32\u0E21\u0E04\u0E48\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01)</div><ul class="text-xs text-gray-300 space-y-1"${_scopeId}><li${_scopeId}>Easy / Long Run: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}\u2013${unref(hrPreview).Z2[1]} bpm (Z2)` : "\u2014")}</li><li${_scopeId}>Marathon: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z3[1]} bpm (Z3)` : "\u2014")}</li><li${_scopeId}>Tempo: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z3\u2013Z4)` : "\u2014")}</li><li${_scopeId}>Intervals: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z4)` : "\u2014")}</li><li${_scopeId}>Reps: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}\u2013${unref(hrPreview).Z5[1]} bpm (Z5)` : "\u2014")}</li></ul></div><div class="space-y-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E2A\u0E16\u0E34\u0E15\u0E34 Half (hh:mm:ss)</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).bestHMSeconds,
              "onUpdate:modelValue": ($event) => unref(form).bestHMSeconds = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60"${_scopeId}><div class="text-sm font-medium mb-1"${_scopeId}>\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08 (\u0E15\u0E32\u0E21\u0E04\u0E48\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01)</div><ul class="text-xs text-gray-300 space-y-1"${_scopeId}><li${_scopeId}>Easy / Long Run: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}\u2013${unref(hrPreview).Z2[1]} bpm (Z2)` : "\u2014")}</li><li${_scopeId}>Marathon: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z3[1]} bpm (Z3)` : "\u2014")}</li><li${_scopeId}>Tempo: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z3\u2013Z4)` : "\u2014")}</li><li${_scopeId}>Intervals: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z4)` : "\u2014")}</li><li${_scopeId}>Reps: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}\u2013${unref(hrPreview).Z5[1]} bpm (Z5)` : "\u2014")}</li></ul></div><div class="space-y-1"${_scopeId}><label class="form-label"${_scopeId}>\u0E2A\u0E16\u0E34\u0E15\u0E34 Full (hh:mm:ss)</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).bestMarSeconds,
              "onUpdate:modelValue": ($event) => unref(form).bestMarSeconds = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}><button class="btn-primary"${_scopeId}>\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01</button></div></form>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold mb-4" }, "\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C\u0E19\u0E31\u0E01\u0E27\u0E34\u0E48\u0E07"),
              createVNode("form", {
                onSubmit: withModifiers(save, ["prevent"]),
                class: "grid md:grid-cols-2 gap-4"
              }, [
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).heightCm,
                  "onUpdate:modelValue": ($event) => unref(form).heightCm = $event,
                  modelModifiers: { number: true },
                  label: "\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (\u0E0B\u0E21.)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).weightKg,
                  "onUpdate:modelValue": ($event) => unref(form).weightKg = $event,
                  modelModifiers: { number: true },
                  label: "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 (\u0E01\u0E01.)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).maxHR,
                  "onUpdate:modelValue": ($event) => unref(form).maxHR = $event,
                  modelModifiers: { number: true },
                  label: "Max HR"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).thresholdHR,
                  "onUpdate:modelValue": ($event) => unref(form).thresholdHR = $event,
                  modelModifiers: { number: true },
                  label: "Threshold HR"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).weeklyMileage,
                  "onUpdate:modelValue": ($event) => unref(form).weeklyMileage = $event,
                  modelModifiers: { number: true },
                  label: "\u0E27\u0E34\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C (\u0E01\u0E21.)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).ageYears,
                  "onUpdate:modelValue": ($event) => unref(form).ageYears = $event,
                  modelModifiers: { number: true },
                  label: "\u0E2D\u0E32\u0E22\u0E38 (\u0E1B\u0E35)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", null, [
                  createVNode("label", { class: "form-label" }, "\u0E27\u0E34\u0E18\u0E35\u0E04\u0E33\u0E19\u0E27\u0E13\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).hrMethod = $event,
                    class: "form-input"
                  }, [
                    createVNode("option", { value: "max" }, "\u0E08\u0E32\u0E01\u0E2D\u0E32\u0E22\u0E38 (Max HR ~ 220-\u0E2D\u0E32\u0E22\u0E38)"),
                    createVNode("option", { value: "threshold" }, "\u0E08\u0E32\u0E01 Threshold HR (LTHR)")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).hrMethod]
                  ]),
                  createVNode("p", { class: "text-xs text-gray-400 mt-1" }, "Max HR (\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13): " + toDisplayString(unref(form).ageYears ? 220 - Number(unref(form).ageYears) : "\u2014") + " bpm", 1)
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E2A\u0E16\u0E34\u0E15\u0E34 10K (hh:mm:ss)"),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).best10kSeconds,
                    "onUpdate:modelValue": ($event) => unref(form).best10kSeconds = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60" }, [
                  createVNode("div", { class: "text-sm font-medium mb-1" }, "\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08 (\u0E15\u0E32\u0E21\u0E04\u0E48\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01)"),
                  createVNode("ul", { class: "text-xs text-gray-300 space-y-1" }, [
                    createVNode("li", null, "Easy / Long Run: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}\u2013${unref(hrPreview).Z2[1]} bpm (Z2)` : "\u2014"), 1),
                    createVNode("li", null, "Marathon: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z3[1]} bpm (Z3)` : "\u2014"), 1),
                    createVNode("li", null, "Tempo: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z3\u2013Z4)` : "\u2014"), 1),
                    createVNode("li", null, "Intervals: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z4)` : "\u2014"), 1),
                    createVNode("li", null, "Reps: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}\u2013${unref(hrPreview).Z5[1]} bpm (Z5)` : "\u2014"), 1)
                  ])
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E2A\u0E16\u0E34\u0E15\u0E34 Half (hh:mm:ss)"),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).bestHMSeconds,
                    "onUpdate:modelValue": ($event) => unref(form).bestHMSeconds = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60" }, [
                  createVNode("div", { class: "text-sm font-medium mb-1" }, "\u0E42\u0E0B\u0E19\u0E2B\u0E31\u0E27\u0E43\u0E08 (\u0E15\u0E32\u0E21\u0E04\u0E48\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01)"),
                  createVNode("ul", { class: "text-xs text-gray-300 space-y-1" }, [
                    createVNode("li", null, "Easy / Long Run: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}\u2013${unref(hrPreview).Z2[1]} bpm (Z2)` : "\u2014"), 1),
                    createVNode("li", null, "Marathon: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z3[1]} bpm (Z3)` : "\u2014"), 1),
                    createVNode("li", null, "Tempo: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z3\u2013Z4)` : "\u2014"), 1),
                    createVNode("li", null, "Intervals: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}\u2013${unref(hrPreview).Z4[1]} bpm (Z4)` : "\u2014"), 1),
                    createVNode("li", null, "Reps: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}\u2013${unref(hrPreview).Z5[1]} bpm (Z5)` : "\u2014"), 1)
                  ])
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("label", { class: "form-label" }, "\u0E2A\u0E16\u0E34\u0E15\u0E34 Full (hh:mm:ss)"),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).bestMarSeconds,
                    "onUpdate:modelValue": ($event) => unref(form).bestMarSeconds = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "md:col-span-2" }, [
                  createVNode("button", { class: "btn-primary" }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01")
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-C0NX1CfT.mjs.map
