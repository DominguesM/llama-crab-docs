import { computed, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv, P as Primitive } from './server.mjs';
import '../nitro/nitro.mjs';
import 'lru-cache';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'unhead';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'minimark/hast';
import 'node:url';
import 'minimark/stringify';
import 'zod';
import 'ms';
import '@modelcontextprotocol/sdk/server/mcp.js';
import '@modelcontextprotocol/sdk/server/streamableHttp.js';
import 'node:fs/promises';
import 'satori';
import '@iconify/utils';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'ipx';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import '@iconify/vue';
import 'tailwindcss/colors';
import '@vueuse/core';
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'aria-hidden';
import 'vaul-vue';
import '@floating-ui/vue';
import 'motion-v';

const theme = {
  "base": "my-5 divide-y divide-default *:not-last:pb-5"
};

const _sfc_main = {
  __name: "ProseFieldGroup",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;

const props = useComponentProps("prose.fieldGroup", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.fieldGroup || {} }));

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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/FieldGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=FieldGroup-j9vMAcz6.mjs.map
