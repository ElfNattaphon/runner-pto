import { defineComponent, useSSRContext, withAsyncContext, reactive, computed, withCtx, unref, createVNode, withModifiers, withDirectives, vModelSelect, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { c as computeHrZones } from "./hr-CPjq97H4.js";
import { C as Card } from "./Card-ZF3S32RN.js";
import { _ as _sfc_main$2 } from "./TimeHMSInput-DArq7jMJ.js";
import { u as useUiStore } from "./ui-BVa8d3Kw.js";
import "../server.mjs";
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
    const form = reactive({ ...defaults, ...me?.profile || {} });
    const hrPreview = computed(() => computeHrZones({ method: form.hrMethod || "max", maxHR: form.maxHR ?? null, thresholdHR: form.thresholdHR ?? null, ageYears: form.ageYears ?? null }));
    const save = async () => {
      try {
        const payload = {
          fullName: form.fullName ?? null,
          dob: form.dob ?? null,
          sex: form.sex ?? null,
          heightCm: form.heightCm ?? null,
          weightKg: form.weightKg ?? null,
          maxHR: form.maxHR ?? null,
          thresholdHR: form.thresholdHR ?? null,
          weeklyMileage: form.weeklyMileage ?? null,
          daysAvailable: form.daysAvailable ?? null,
          best5kSeconds: form.best5kSeconds ?? null,
          best10kSeconds: form.best10kSeconds ?? null,
          bestHMSeconds: form.bestHMSeconds ?? null,
          bestMarSeconds: form.bestMarSeconds ?? null,
          ageYears: form.ageYears ?? null,
          hrMethod: form.hrMethod ?? "max"
        };
        const res = await $fetch("/api/profile/update", { method: "POST", body: payload });
        ui.success("บันทึกโปรไฟล์แล้ว");
        if (res && res.persistedAgeHr === false) {
          ui.info("บันทึกแล้ว แต่ฐานข้อมูลยังไม่รองรับ ageYears/hrMethod — แนะนำให้รัน prisma migrate dev");
        }
      } catch (e) {
        ui.error(e?.statusMessage || "บันทึกโปรไฟล์ไม่สำเร็จ");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Card, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold mb-4"${_scopeId}>โปรไฟล์นักวิ่ง</h2><form class="grid md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).heightCm,
              "onUpdate:modelValue": ($event) => unref(form).heightCm = $event,
              modelModifiers: { number: true },
              label: "ส่วนสูง (ซม.)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).weightKg,
              "onUpdate:modelValue": ($event) => unref(form).weightKg = $event,
              modelModifiers: { number: true },
              label: "น้ำหนัก (กก.)"
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
              label: "วิ่งต่อสัปดาห์ (กม.)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).ageYears,
              "onUpdate:modelValue": ($event) => unref(form).ageYears = $event,
              modelModifiers: { number: true },
              label: "อายุ (ปี)"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><label class="form-label"${_scopeId}>วิธีคำนวณโซนหัวใจ</label><select class="form-input"${_scopeId}><option value="max"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hrMethod) ? ssrLooseContain(unref(form).hrMethod, "max") : ssrLooseEqual(unref(form).hrMethod, "max")) ? " selected" : ""}${_scopeId}>จากอายุ (Max HR ~ 220-อายุ)</option><option value="threshold"${ssrIncludeBooleanAttr(Array.isArray(unref(form).hrMethod) ? ssrLooseContain(unref(form).hrMethod, "threshold") : ssrLooseEqual(unref(form).hrMethod, "threshold")) ? " selected" : ""}${_scopeId}>จาก Threshold HR (LTHR)</option></select><p class="text-xs text-gray-400 mt-1"${_scopeId}>Max HR (ประมาณ): ${ssrInterpolate(unref(form).ageYears ? 220 - Number(unref(form).ageYears) : "—")} bpm</p></div><div class="space-y-1"${_scopeId}><label class="form-label"${_scopeId}>สถิติ 10K (hh:mm:ss)</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).best10kSeconds,
              "onUpdate:modelValue": ($event) => unref(form).best10kSeconds = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60"${_scopeId}><div class="text-sm font-medium mb-1"${_scopeId}>โซนหัวใจ (ตามค่าที่เลือก)</div><ul class="text-xs text-gray-300 space-y-1"${_scopeId}><li${_scopeId}>Easy / Long Run: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}–${unref(hrPreview).Z2[1]} bpm (Z2)` : "—")}</li><li${_scopeId}>Marathon: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z3[1]} bpm (Z3)` : "—")}</li><li${_scopeId}>Tempo: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z4[1]} bpm (Z3–Z4)` : "—")}</li><li${_scopeId}>Intervals: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}–${unref(hrPreview).Z4[1]} bpm (Z4)` : "—")}</li><li${_scopeId}>Reps: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}–${unref(hrPreview).Z5[1]} bpm (Z5)` : "—")}</li></ul></div><div class="space-y-1"${_scopeId}><label class="form-label"${_scopeId}>สถิติ Half (hh:mm:ss)</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).bestHMSeconds,
              "onUpdate:modelValue": ($event) => unref(form).bestHMSeconds = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60"${_scopeId}><div class="text-sm font-medium mb-1"${_scopeId}>โซนหัวใจ (ตามค่าที่เลือก)</div><ul class="text-xs text-gray-300 space-y-1"${_scopeId}><li${_scopeId}>Easy / Long Run: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}–${unref(hrPreview).Z2[1]} bpm (Z2)` : "—")}</li><li${_scopeId}>Marathon: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z3[1]} bpm (Z3)` : "—")}</li><li${_scopeId}>Tempo: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z4[1]} bpm (Z3–Z4)` : "—")}</li><li${_scopeId}>Intervals: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}–${unref(hrPreview).Z4[1]} bpm (Z4)` : "—")}</li><li${_scopeId}>Reps: ${ssrInterpolate(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}–${unref(hrPreview).Z5[1]} bpm (Z5)` : "—")}</li></ul></div><div class="space-y-1"${_scopeId}><label class="form-label"${_scopeId}>สถิติ Full (hh:mm:ss)</label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).bestMarSeconds,
              "onUpdate:modelValue": ($event) => unref(form).bestMarSeconds = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="md:col-span-2"${_scopeId}><button class="btn-primary"${_scopeId}>บันทึก</button></div></form>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold mb-4" }, "โปรไฟล์นักวิ่ง"),
              createVNode("form", {
                onSubmit: withModifiers(save, ["prevent"]),
                class: "grid md:grid-cols-2 gap-4"
              }, [
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).heightCm,
                  "onUpdate:modelValue": ($event) => unref(form).heightCm = $event,
                  modelModifiers: { number: true },
                  label: "ส่วนสูง (ซม.)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).weightKg,
                  "onUpdate:modelValue": ($event) => unref(form).weightKg = $event,
                  modelModifiers: { number: true },
                  label: "น้ำหนัก (กก.)"
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
                  label: "วิ่งต่อสัปดาห์ (กม.)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  modelValue: unref(form).ageYears,
                  "onUpdate:modelValue": ($event) => unref(form).ageYears = $event,
                  modelModifiers: { number: true },
                  label: "อายุ (ปี)"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", null, [
                  createVNode("label", { class: "form-label" }, "วิธีคำนวณโซนหัวใจ"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).hrMethod = $event,
                    class: "form-input"
                  }, [
                    createVNode("option", { value: "max" }, "จากอายุ (Max HR ~ 220-อายุ)"),
                    createVNode("option", { value: "threshold" }, "จาก Threshold HR (LTHR)")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).hrMethod]
                  ]),
                  createVNode("p", { class: "text-xs text-gray-400 mt-1" }, "Max HR (ประมาณ): " + toDisplayString(unref(form).ageYears ? 220 - Number(unref(form).ageYears) : "—") + " bpm", 1)
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("label", { class: "form-label" }, "สถิติ 10K (hh:mm:ss)"),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).best10kSeconds,
                    "onUpdate:modelValue": ($event) => unref(form).best10kSeconds = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60" }, [
                  createVNode("div", { class: "text-sm font-medium mb-1" }, "โซนหัวใจ (ตามค่าที่เลือก)"),
                  createVNode("ul", { class: "text-xs text-gray-300 space-y-1" }, [
                    createVNode("li", null, "Easy / Long Run: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}–${unref(hrPreview).Z2[1]} bpm (Z2)` : "—"), 1),
                    createVNode("li", null, "Marathon: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z3[1]} bpm (Z3)` : "—"), 1),
                    createVNode("li", null, "Tempo: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z4[1]} bpm (Z3–Z4)` : "—"), 1),
                    createVNode("li", null, "Intervals: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}–${unref(hrPreview).Z4[1]} bpm (Z4)` : "—"), 1),
                    createVNode("li", null, "Reps: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}–${unref(hrPreview).Z5[1]} bpm (Z5)` : "—"), 1)
                  ])
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("label", { class: "form-label" }, "สถิติ Half (hh:mm:ss)"),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).bestHMSeconds,
                    "onUpdate:modelValue": ($event) => unref(form).bestHMSeconds = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-3 rounded-lg border border-white/10 p-3 bg-ink-800/60" }, [
                  createVNode("div", { class: "text-sm font-medium mb-1" }, "โซนหัวใจ (ตามค่าที่เลือก)"),
                  createVNode("ul", { class: "text-xs text-gray-300 space-y-1" }, [
                    createVNode("li", null, "Easy / Long Run: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z2[0]}–${unref(hrPreview).Z2[1]} bpm (Z2)` : "—"), 1),
                    createVNode("li", null, "Marathon: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z3[1]} bpm (Z3)` : "—"), 1),
                    createVNode("li", null, "Tempo: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z3[0]}–${unref(hrPreview).Z4[1]} bpm (Z3–Z4)` : "—"), 1),
                    createVNode("li", null, "Intervals: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z4[0]}–${unref(hrPreview).Z4[1]} bpm (Z4)` : "—"), 1),
                    createVNode("li", null, "Reps: " + toDisplayString(unref(hrPreview) ? `${unref(hrPreview).Z5[0]}–${unref(hrPreview).Z5[1]} bpm (Z5)` : "—"), 1)
                  ])
                ]),
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("label", { class: "form-label" }, "สถิติ Full (hh:mm:ss)"),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).bestMarSeconds,
                    "onUpdate:modelValue": ($event) => unref(form).bestMarSeconds = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "md:col-span-2" }, [
                  createVNode("button", { class: "btn-primary" }, "บันทึก")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-C0NX1CfT.js.map
