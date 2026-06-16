import { computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv } from './server.mjs';
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
  "slots": {
    "root": "relative my-5 overflow-x-auto",
    "base": "w-full border-separate border-spacing-0 rounded-md"
  }
};

const _sfc_main = {
  __name: "ProseTable",
  __ssrInlineRender: true,
  props: {
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;

const props = useComponentProps("prose.table", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.table || {} })());

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${
    ssrRenderAttrs(mergeProps({
      class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
    }, _attrs))
  }><table class="${
    ssrRenderClass(ui.value.base({ class: unref(props).ui?.base }))
  }">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</table></div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/Table.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=Table-Dj1vyIjm.mjs.map
