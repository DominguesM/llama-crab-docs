import { useSlots, computed, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, renderSlot, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, a0 as usePrefix, t as tv, aG as getSlotChildrenText, P as Primitive, w as _sfc_main$K, _ as _sfc_main$F } from './server.mjs';
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
    "root": "relative rounded-sm",
    "wrapper": "",
    "leading": "inline-flex items-center justify-center",
    "leadingIcon": "size-5 shrink-0 text-primary",
    "title": "text-base text-pretty font-semibold text-highlighted",
    "description": "text-[15px] text-pretty text-muted"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex items-start gap-2.5",
        "leading": "p-0.5"
      },
      "vertical": {
        "leading": "mb-2.5"
      }
    },
    "to": {
      "true": {
        "root": [
          "has-focus-visible:ring-2 has-focus-visible:ring-primary",
          "transition"
        ]
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  }
};

const _sfc_main = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: "UPageFeature",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {


const _props = __props;
const slots = useSlots();
const props = useComponentProps("pageFeature", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageFeature || {} })({
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
  to: !!props.to || !!props.onClick
}));
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Feature link").trim();
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-orientation": unref(props).orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
    onClick: unref(props).onClick
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (unref(props).icon || !!slots.leading) {
          _push(`<div data-slot="leading" class="${
            ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
            if (unref(props).icon) {
              _push(ssrRenderComponent(_sfc_main$K, {
                name: unref(props).icon,
                "data-slot": "leadingIcon",
                class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
              }, null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-slot="wrapper" class="${
          ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))
        }"${
          _scopeId
        }>`);
        if (unref(props).to) {
          _push(ssrRenderComponent(_sfc_main$F, mergeProps({ "aria-label": ariaLabel.value }, { to: unref(props).to, target: unref(props).target, ..._ctx.$attrs }, {
            class: unref(prefix)('focus:outline-none peer'),
            raw: ""
          }), {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<span class="${
                  ssrRenderClass(unref(prefix)('absolute inset-0'))
                }" aria-hidden="true"${
                  _scopeId
                }></span>`);
              } else {
                return [
                  createVNode("span", {
                    class: unref(prefix)('absolute inset-0'),
                    "aria-hidden": "true"
                  }, null, 2)
                ]
              }
            }),
            _: 1
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          if (unref(props).title || !!slots.title) {
            _push(`<div data-slot="title" class="${
              ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, () => {
              _push(`${ssrInterpolate(unref(props).title)}`);
            }, _push, _parent, _scopeId);
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(props).description || !!slots.description) {
            _push(`<div data-slot="description" class="${
              ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "description", {}, () => {
              _push(`${ssrInterpolate(unref(props).description)}`);
            }, _push, _parent, _scopeId);
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
        _push(`</div>`);
      } else {
        return [
          (unref(props).icon || !!slots.leading)
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: unref(props).ui?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  (unref(props).icon)
                    ? (openBlock(), createBlock(_sfc_main$K, {
                        key: 0,
                        name: unref(props).icon,
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
                      }, null, 8, ["name", "class"]))
                    : createCommentVNode("", true)
                ])
              ], 2))
            : createCommentVNode("", true),
          createVNode("div", {
            "data-slot": "wrapper",
            class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
          }, [
            (unref(props).to)
              ? (openBlock(), createBlock(_sfc_main$F, mergeProps({
                  key: 0,
                  "aria-label": ariaLabel.value
                }, { to: unref(props).to, target: unref(props).target, ..._ctx.$attrs }, {
                  class: unref(prefix)('focus:outline-none peer'),
                  raw: ""
                }), {
                  default: withCtx(() => [
                    createVNode("span", {
                      class: unref(prefix)('absolute inset-0'),
                      "aria-hidden": "true"
                    }, null, 2)
                  ]),
                  _: 1
                }, 16, ["aria-label", "class"]))
              : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "default", {}, () => [
              (unref(props).title || !!slots.title)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-slot": "title",
                    class: ui.value.title({ class: unref(props).ui?.title })
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(unref(props).title), 1)
                    ])
                  ], 2))
                : createCommentVNode("", true),
              (unref(props).description || !!slots.description)
                ? (openBlock(), createBlock("div", {
                    key: 1,
                    "data-slot": "description",
                    class: ui.value.description({ class: unref(props).ui?.description })
                  }, [
                    renderSlot(_ctx.$slots, "description", {}, () => [
                      createTextVNode(toDisplayString(unref(props).description), 1)
                    ])
                  ], 2))
                : createCommentVNode("", true)
            ])
          ], 2)
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageFeature.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=PageFeature-CdZFcCsm.mjs.map
