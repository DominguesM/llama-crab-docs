import { useTemplateRef, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useClipboard } from '@vueuse/core';
import { n as useComponentProps, o as useLocale, p as useAppConfig, t as tv, A as _sfc_main$E } from './server.mjs';
import _sfc_main$1 from './CodeIcon-DqYJP6Hz.mjs';
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
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'aria-hidden';
import 'vaul-vue';
import '@floating-ui/vue';
import 'motion-v';

const theme = {
  "slots": {
    "root": "relative my-5 group",
    "header": "flex items-center gap-1.5 border border-muted bg-default border-b-0 relative rounded-t-md px-4 py-3",
    "filename": "text-default text-sm/6",
    "icon": "size-4 shrink-0",
    "copy": "absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition",
    "base": "group font-mono text-sm/6 border border-muted bg-muted rounded-md px-4 py-3 whitespace-pre-wrap wrap-break-word overflow-x-auto focus:outline-none **:[.line]:block **:[.line.highlight]:-mx-4 **:[.line.highlight]:px-4 **:[.line.highlight]:bg-accented/50!"
  },
  "variants": {
    "filename": {
      "true": {
        "root": "[&>pre]:rounded-t-none [&>pre]:my-0 my-5"
      }
    }
  }
};

const _sfc_main = {
  __name: "ProsePre",
  __ssrInlineRender: true,
  props: {
  icon: { type: null, required: false },
  code: { type: String, required: false },
  language: { type: String, required: false },
  filename: { type: String, required: false },
  highlights: { type: Array, required: false },
  hideHeader: { type: Boolean, required: false },
  meta: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;

const props = useComponentProps("prose.pre", _props);
const { t } = useLocale();
const { copy, copied } = useClipboard();
const appConfig = useAppConfig();
const baseRef = useTemplateRef("baseRef");
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.pre || {} })());
function copyCode() {
  const code = props.code ?? baseRef.value?.textContent ?? "";
  copy(code);
}

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ui.value.root({ class: [unref(props).ui?.root], filename: !!unref(props).filename })
  }, _attrs))}>`);
  if (unref(props).filename && !unref(props).hideHeader) {
    _push(`<div class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}">`);
    _push(ssrRenderComponent(_sfc_main$1, {
      icon: unref(props).icon,
      filename: unref(props).filename,
      class: ui.value.icon({ class: unref(props).ui?.icon })
    }, null, _parent));
    _push(`<span class="${
      ssrRenderClass(ui.value.filename({ class: unref(props).ui?.filename }))
    }">${
      ssrInterpolate(unref(props).filename)
    }</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_sfc_main$E, {
    icon: unref(copied) ? unref(appConfig).ui.icons.copyCheck : unref(appConfig).ui.icons.copy,
    color: "neutral",
    variant: "outline",
    size: "sm",
    "aria-label": unref(t)('prose.pre.copy'),
    class: ui.value.copy({ class: unref(props).ui?.copy }),
    tabindex: "-1",
    onClick: copyCode
  }, null, _parent));
  _push(`<pre${ssrRenderAttrs(mergeProps({
    ref_key: "baseRef",
    ref: baseRef,
    class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] })
  }, _ctx.$attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</pre></div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/Pre.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=Pre-ap5-iVf-.mjs.map
