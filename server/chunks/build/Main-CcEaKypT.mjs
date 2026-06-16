import { computed, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv, P as Primitive } from './server.mjs';

const theme = {
  "base": "min-h-[calc(100vh-var(--ui-header-height))]"
};

const _sfc_main = {
  __name: "UMain",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "main" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;

const props = useComponentProps("main", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.main || {} }));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
//# sourceMappingURL=Main-CcEaKypT.mjs.map
