import { _ as __nuxt_component_0 } from "./nuxt-link-D5ZCHyL0.js";
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, isRef, vModelText, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { C as Card } from "./Card-ZF3S32RN.js";
import { u as useUiStore } from "./ui-BVa8d3Kw.js";
import { n as navigateTo } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUiStore();
    const email = ref("");
    const password = ref("");
    const fullName = ref("");
    const onSubmit = async () => {
      try {
        await $fetch("/api/auth/register", { method: "POST", body: { email: email.value, password: password.value, fullName: fullName.value } });
        ui.success("สมัครสมาชิกสำเร็จ");
        await navigateTo("/login");
      } catch (e) {
        ui.error(e?.statusMessage || "สมัครสมาชิกไม่สำเร็จ");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-semibold mb-4"${_scopeId}>สมัครสมาชิก</h2><form class="space-y-3"${_scopeId}><input${ssrRenderAttr("value", unref(email))} placeholder="อีเมล" class="form-input"${_scopeId}><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="รหัสผ่าน" class="form-input"${_scopeId}><input${ssrRenderAttr("value", unref(fullName))} placeholder="ชื่อ-นามสกุล" class="form-input"${_scopeId}><button class="w-full btn-accent"${_scopeId}>สมัคร</button></form><p class="mt-3 text-sm text-gray-400"${_scopeId}>มีบัญชีแล้ว? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/login",
              class: "text-skyx-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`เข้าสู่ระบบ`);
                } else {
                  return [
                    createTextVNode("เข้าสู่ระบบ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-semibold mb-4" }, "สมัครสมาชิก"),
              createVNode("form", {
                onSubmit: withModifiers(onSubmit, ["prevent"]),
                class: "space-y-3"
              }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                  placeholder: "อีเมล",
                  class: "form-input"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(email)]
                ]),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                  type: "password",
                  placeholder: "รหัสผ่าน",
                  class: "form-input"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(password)]
                ]),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(fullName) ? fullName.value = $event : null,
                  placeholder: "ชื่อ-นามสกุล",
                  class: "form-input"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(fullName)]
                ]),
                createVNode("button", { class: "w-full btn-accent" }, "สมัคร")
              ], 32),
              createVNode("p", { class: "mt-3 text-sm text-gray-400" }, [
                createTextVNode("มีบัญชีแล้ว? "),
                createVNode(_component_NuxtLink, {
                  to: "/login",
                  class: "text-skyx-400"
                }, {
                  default: withCtx(() => [
                    createTextVNode("เข้าสู่ระบบ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=register-DMhW6AD3.js.map
