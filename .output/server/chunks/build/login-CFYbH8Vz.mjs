import { _ as __nuxt_component_0 } from './nuxt-link-D5ZCHyL0.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, isRef, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { C as Card } from './Card-ZF3S32RN.mjs';
import { u as useUiStore } from './ui-BVa8d3Kw.mjs';
import { a as useUserStore, u as usePlanStore, n as navigateTo } from './server.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUiStore();
    const email = ref("");
    const password = ref("");
    const userStore = useUserStore();
    const onSubmit = async () => {
      try {
        await $fetch("/api/auth/login", { method: "POST", body: { email: email.value, password: password.value } });
        const me = await $fetch("/api/auth/me");
        userStore.setUser(me);
        try {
          const latest = await $fetch("/api/plan/latest");
          const ps = usePlanStore();
          if (latest == null ? void 0 : latest.workouts) ps.setWorkouts(latest.workouts);
          if (latest == null ? void 0 : latest.meta) ps.setMeta(latest.meta);
        } catch {
        }
        ui.success("\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
        await navigateTo("/");
      } catch (e) {
        ui.error((e == null ? void 0 : e.statusMessage) || "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-2xl font-semibold mb-4"${_scopeId}>\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A</h2><form class="space-y-3"${_scopeId}><input${ssrRenderAttr("value", unref(email))} placeholder="\u0E2D\u0E35\u0E40\u0E21\u0E25" class="form-input"${_scopeId}><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19" class="form-input"${_scopeId}><button class="w-full btn-primary"${_scopeId}>\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A</button></form><p class="mt-3 text-sm text-gray-400"${_scopeId}>\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              class: "text-skyx-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01`);
                } else {
                  return [
                    createTextVNode("\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode("h2", { class: "text-2xl font-semibold mb-4" }, "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A"),
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
                createVNode("button", { class: "w-full btn-primary" }, "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A")
              ], 32),
              createVNode("p", { class: "mt-3 text-sm text-gray-400" }, [
                createTextVNode("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35? "),
                createVNode(_component_NuxtLink, {
                  to: "/register",
                  class: "text-skyx-400"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CFYbH8Vz.mjs.map
