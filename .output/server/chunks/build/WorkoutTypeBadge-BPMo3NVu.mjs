import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkoutTypeBadge",
  __ssrInlineRender: true,
  props: {
    type: {}
  },
  setup(__props) {
    const props = __props;
    const map = {
      E: "chip-E",
      M: "chip-M",
      T: "chip-T",
      I: "chip-I",
      R: "chip-R",
      Rest: "chip-Rest",
      Race: "chip-Race",
      LR: "chip-LR"
    };
    const labels = { E: "Easy", M: "Marathon", T: "Tempo", I: "Intervals", R: "Reps", Rest: "Rest", Race: "Race", LR: "Long Run" };
    const cls = computed(() => map[props.type] || "chip");
    const label = computed(() => labels[props.type] || props.type);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["chip", unref(cls)]
      }, _attrs))}>${ssrInterpolate(unref(label))}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WorkoutTypeBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=WorkoutTypeBadge-BPMo3NVu.mjs.map
