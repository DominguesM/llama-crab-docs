import { _ as _sfc_main$1 } from './Main-CcEaKypT.mjs';
import { withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { aH as _export_sfc } from './server.mjs';
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

const _sfc_main = {  };

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UMain = _sfc_main$1;

  _push(ssrRenderComponent(_component_UMain, _attrs, {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/docus/app/layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const _default = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-DNTpjft9.mjs.map
