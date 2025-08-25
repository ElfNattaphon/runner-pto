import { defineComponent, ref, computed, withCtx, createVNode, unref, createTextVNode, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderTeleport, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as __nuxt_component_0 } from "./nuxt-link-D5ZCHyL0.js";
import { a as useUserStore, _ as _export_sfc } from "../server.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/hookable/dist/index.mjs";
import { u as useUiStore } from "./ui-BVa8d3Kw.js";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/unctx/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/radix3/dist/index.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/defu/dist/defu.mjs";
import "D:/disk2/Test/runplanner-pro-ui-v3-profile-update-fallback/node_modules/klona/dist/index.mjs";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileOpen = ref(false);
    const userStore = useUserStore();
    const user = computed(() => userStore.user);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><header class="sticky top-0 z-40 w-full border-b border-white/10 bg-ink-900/70 backdrop-blur"><div class="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-run-500 text-2xl"${_scopeId}>🏃</span><span class="font-semibold text-white"${_scopeId}>RunPlanner Pro</span>`);
          } else {
            return [
              createVNode("span", { class: "text-run-500 text-2xl" }, "🏃"),
              createVNode("span", { class: "font-semibold text-white" }, "RunPlanner Pro")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-3">`);
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/planner",
          class: "hidden sm:inline-block text-sm font-medium text-gray-200 hover:text-run-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Planner`);
            } else {
              return [
                createTextVNode("Planner")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/calendar",
          class: "hidden sm:inline-block text-sm font-medium text-gray-200 hover:text-run-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Calendar`);
            } else {
              return [
                createTextVNode("Calendar")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "hidden sm:inline-block text-sm font-medium text-gray-200 hover:text-run-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Profile`);
            } else {
              return [
                createTextVNode("Profile")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(`<button class="sm:hidden btn-ghost">☰</button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(`<button class="hidden sm:inline-flex ml-2 btn-accent">Logout</button>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "ml-2 btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></header>`);
      if (unref(user) && unref(mobileOpen)) {
        _push(`<div class="sm:hidden absolute top-14 left-0 right-0 bg-ink-800/95 border-b border-white/10"><div class="px-4 py-3 space-y-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/planner",
          class: "block text-gray-200 hover:text-run-500",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Planner`);
            } else {
              return [
                createTextVNode("Planner")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/calendar",
          class: "block text-gray-200 hover:text-run-500",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Calendar`);
            } else {
              return [
                createTextVNode("Calendar")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "block text-gray-200 hover:text-run-500",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Profile`);
            } else {
              return [
                createTextVNode("Profile")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="w-full btn-accent mt-2">Logout</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppNavbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = computed(() => useUserStore().user);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(user)) {
        _push(`<aside${ssrRenderAttrs(mergeProps({ class: "hidden md:block w-72 border-r border-white/10 bg-ink-800/70 backdrop-blur p-4 space-y-2 rounded-2xl" }, _attrs))} data-v-8accf690><div class="text-xs uppercase tracking-wide text-gray-400 px-2" data-v-8accf690>Navigation</div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-item",
          to: "/"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`🏠 Dashboard`);
            } else {
              return [
                createTextVNode("🏠 Dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-item",
          to: "/planner"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`🧩 Planner`);
            } else {
              return [
                createTextVNode("🧩 Planner")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-item",
          to: "/calendar"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`📅 Calendar`);
            } else {
              return [
                createTextVNode("📅 Calendar")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-item",
          to: "/profile"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`👤 Profile`);
            } else {
              return [
                createTextVNode("👤 Profile")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8accf690"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToastHost",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUiStore();
    const boxCls = (type) => {
      if (type === "success") return "bg-emerald-600/20 border-emerald-400/30 text-emerald-100";
      if (type === "error") return "bg-rose-600/20 border-rose-400/30 text-rose-100";
      return "bg-skyx-600/20 border-skyx-400/30 text-skyx-100";
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed z-[1000] top-4 right-4 space-y-3 w-[min(92vw,360px)]"><!--[-->`);
        ssrRenderList(unref(ui).toasts, (t) => {
          _push2(`<div class="${ssrRenderClass([boxCls(t.type), "rounded-xl border shadow-soft p-4 backdrop-blur text-sm"])}"><div class="flex items-start gap-3"><div class="text-lg">`);
          if (t.type === "success") {
            _push2(`<span>✅</span>`);
          } else if (t.type === "error") {
            _push2(`<span>⚠️</span>`);
          } else {
            _push2(`<span>🔔</span>`);
          }
          _push2(`</div><div class="flex-1">`);
          if (t.title) {
            _push2(`<div class="font-semibold">${ssrInterpolate(t.title)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="text-gray-200/90">${ssrInterpolate(t.message)}</div></div><button class="opacity-70 hover:opacity-100">✖</button></div></div>`);
        });
        _push2(`<!--]--></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ToastHost.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-dvh bg-ink-900 bg-run-gradient text-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<div class="bg-track-lines"><div class="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 px-4 py-6">`);
      _push(ssrRenderComponent(AppSidebar, null, null, _parent));
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-D7Kq4iVF.js.map
