import { useSlots, computed, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { s as ssrRenderSlot } from './ssrSlot-OqzLu9SG.mjs';
import { r as renderSlot } from './slot-D0gfNkfs.mjs';
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
  "slots": {
    "root": "my-5",
    "container": "flex items-center gap-3 font-mono text-sm",
    "name": "font-semibold text-primary",
    "wrapper": "flex-1 flex items-center gap-1.5 text-xs",
    "required": "rounded-sm bg-error/10 text-error px-1.5 py-0.5",
    "type": "rounded-sm bg-elevated text-toned px-1.5 py-0.5",
    "description": "mt-3 text-muted text-sm [&_code]:text-xs/4"
  }
};

const _sfc_main = {
  __name: "ProseField",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  name: { type: String, required: false },
  type: { type: String, required: false },
  description: { type: String, required: false },
  required: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("prose.field", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.field || {} })());

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="${
          ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))
        }"${
          _scopeId
        }>`);
        if (unref(props).name) {
          _push(`<span class="${
            ssrRenderClass(ui.value.name({ class: unref(props).ui?.name }))
          }"${
            _scopeId
          }>${
            ssrInterpolate(unref(props).name)
          }</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(props).type || unref(props).required) {
          _push(`<div class="${
            ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))
          }"${
            _scopeId
          }>`);
          if (unref(props).type) {
            _push(`<span class="${
              ssrRenderClass(ui.value.type({ class: unref(props).ui?.type }))
            }"${
              _scopeId
            }>${
              ssrInterpolate(unref(props).type)
            }</span>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(props).required) {
            _push(`<span class="${
              ssrRenderClass(ui.value.required({ class: unref(props).ui?.required }))
            }"${
              _scopeId
            }> required </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!!slots.default || unref(props).description) {
          _push(`<div class="${
            ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "default", { mdcUnwrap: "p" }, () => {
            _push(`${ssrInterpolate(unref(props).description)}`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode("div", {
            class: ui.value.container({ class: unref(props).ui?.container })
          }, [
            (unref(props).name)
              ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ui.value.name({ class: unref(props).ui?.name })
                }, toDisplayString(unref(props).name), 3))
              : createCommentVNode("", true),
            (unref(props).type || unref(props).required)
              ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
                }, [
                  (unref(props).type)
                    ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: ui.value.type({ class: unref(props).ui?.type })
                      }, toDisplayString(unref(props).type), 3))
                    : createCommentVNode("", true),
                  (unref(props).required)
                    ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: ui.value.required({ class: unref(props).ui?.required })
                      }, " required ", 2))
                    : createCommentVNode("", true)
                ], 2))
              : createCommentVNode("", true)
          ], 2),
          (!!slots.default || unref(props).description)
            ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.description({ class: unref(props).ui?.description })
              }, [
                renderSlot(_ctx.$slots, "default", { mdcUnwrap: "p" }, () => [
                  createTextVNode(toDisplayString(unref(props).description), 1)
                ])
              ], 2))
            : createCommentVNode("", true)
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/Field.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=Field-B25dU_n8.mjs.map
