import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TimeHMSInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: null }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    ref(null);
    ref(null);
    const h = computed(() => Math.floor((props.modelValue ?? 0) / 3600));
    const m = computed(() => Math.floor((props.modelValue ?? 0) % 3600 / 60));
    const s = computed(() => Math.floor((props.modelValue ?? 0) % 60));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><input type="number" inputmode="numeric" min="0" placeholder="hh" class="form-input w-20 text-center"${ssrRenderAttr("value", unref(h))}><span>:</span><input type="number" inputmode="numeric" min="0" max="59" placeholder="mm" class="form-input w-16 text-center"${ssrRenderAttr("value", unref(m))}><span>:</span><input type="number" inputmode="numeric" min="0" max="59" placeholder="ss" class="form-input w-16 text-center"${ssrRenderAttr("value", unref(s))}></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TimeHMSInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=TimeHMSInput-DArq7jMJ.js.map
