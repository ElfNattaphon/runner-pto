import { _ as __nuxt_component_0 } from './nuxt-link-D5ZCHyL0.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, isRef, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { C as Card } from './Card-ZF3S32RN.mjs';
import { u as useUiStore } from './ui-BVa8d3Kw.mjs';
import { n as navigateTo } from './server.mjs';
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
        ui.success("\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
        await navigateTo("/login");
      } catch (e) {
        ui.error((e == null ? void 0 : e.statusMessage) || "\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-semibold mb-4"${_scopeId}>\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01</h2><form class="space-y-3"${_scopeId}><input${ssrRenderAttr("value", unref(email))} placeholder="\u0E2D\u0E35\u0E40\u0E21\u0E25" class="form-input"${_scopeId}><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19" class="form-input"${_scopeId}><input${ssrRenderAttr("value", unref(fullName))} placeholder="\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25" class="form-input"${_scopeId}><button class="w-full btn-accent"${_scopeId}>\u0E2A\u0E21\u0E31\u0E04\u0E23</button></form><p class="mt-3 text-sm text-gray-400"${_scopeId}>\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E49\u0E27? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/login",
              class: "text-skyx-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A`);
                } else {
                  return [
                    createTextVNode("\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-semibold mb-4" }, "\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01"),
              createVNode("form", {
                onSubmit: withModifiers(onSubmit, ["prevent"]),
                class: "space-y-3"
              }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                  placeholder: "\u0E2D\u0E35\u0E40\u0E21\u0E25",
                  class: "form-input"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(email)]
                ]),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                  type: "password",
                  placeholder: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19",
                  class: "form-input"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(password)]
                ]),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => isRef(fullName) ? fullName.value = $event : null,
                  placeholder: "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25",
                  class: "form-input"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, unref(fullName)]
                ]),
                createVNode("button", { class: "w-full btn-accent" }, "\u0E2A\u0E21\u0E31\u0E04\u0E23")
              ], 32),
              createVNode("p", { class: "mt-3 text-sm text-gray-400" }, [
                createTextVNode("\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E49\u0E27? "),
                createVNode(_component_NuxtLink, {
                  to: "/login",
                  class: "text-skyx-400"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A")
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

export { _sfc_main as default };
//# sourceMappingURL=register-DMhW6AD3.mjs.map
