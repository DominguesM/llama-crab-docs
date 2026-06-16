import { useSlots, useModel, computed, ref, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, resolveDynamicComponent, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import { T as TabsRoot_default, a as TabsList_default, b as TabsIndicator_default, c as TabsTrigger_default, d as TabsContent_default } from './TabsTrigger-DxApqvYb.mjs';
import { n as useComponentProps, p as useAppConfig, t as tv } from './server.mjs';
import _sfc_main$1 from './CodeIcon-DqYJP6Hz.mjs';
import '@vueuse/core';
import './RovingFocusItem-CxraSrf4.mjs';
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
    "root": "relative group *:not-first:my-0! *:not-first:static! my-5",
    "list": "relative flex items-center gap-1 border border-muted bg-default border-b-0 rounded-t-md overflow-x-auto p-2",
    "indicator": "absolute left-0 inset-y-2 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) transition-[translate,width] duration-200 bg-elevated rounded-md shadow-xs",
    "trigger": [
      "relative inline-flex items-center gap-1.5 text-default data-[state=active]:text-highlighted hover:bg-elevated/50 px-2 py-1.5 text-sm rounded-md disabled:cursor-not-allowed disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary focus:outline-none",
      "transition-colors"
    ],
    "triggerIcon": "size-4 shrink-0",
    "triggerLabel": "truncate"
  }
};

const _sfc_main = {
  __name: "ProseCodeGroup",
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  defaultValue: { type: String, required: false, default: "0" },
  sync: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
}, {
    "modelValue": { type: String },
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("prose.codeGroup", _props);
const model = useModel(__props, "modelValue");
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.codeGroup || {} })());
const rerenderCount = ref(1);
const items = computed(() => {
  rerenderCount.value;
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [];
});
function transformSlot(slot, index) {
  if (typeof slot.type === "symbol") {
    return slot.children?.map(transformSlot);
  }
  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot
  };
}

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(TabsRoot_default), mergeProps({
    modelValue: model.value,
    "onUpdate:modelValue": $event => ((model).value = $event),
    "default-value": unref(props).defaultValue,
    "unmount-on-hide": false,
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(TabsList_default), {
          class: ui.value.list({ class: unref(props).ui?.list })
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(TabsIndicator_default), {
                class: ui.value.indicator({ class: unref(props).ui?.indicator })
              }, null, _parent, _scopeId));
              _push(`<!--[-->`);
              ssrRenderList(items.value, (item, index) => {
                _push(ssrRenderComponent(unref(TabsTrigger_default), {
                  key: index,
                  value: String(index),
                  class: ui.value.trigger({ class: unref(props).ui?.trigger })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      _push(ssrRenderComponent(_sfc_main$1, {
                        icon: item.icon,
                        filename: item.label,
                        class: ui.value.triggerIcon({ class: unref(props).ui?.triggerIcon })
                      }, null, _parent, _scopeId));
                      _push(`<span class="${
                        ssrRenderClass(ui.value.triggerLabel({ class: unref(props).ui?.triggerLabel }))
                      }"${
                        _scopeId
                      }>${
                        ssrInterpolate(item.label)
                      }</span>`);
                    } else {
                      return [
                        createVNode(_sfc_main$1, {
                          icon: item.icon,
                          filename: item.label,
                          class: ui.value.triggerIcon({ class: unref(props).ui?.triggerIcon })
                        }, null, 8, ["icon", "filename", "class"]),
                        createVNode("span", {
                          class: ui.value.triggerLabel({ class: unref(props).ui?.triggerLabel })
                        }, toDisplayString(item.label), 3)
                      ]
                    }
                  }),
                  _: 2
                }, _parent, _scopeId));
              });
              _push(`<!--]-->`);
            } else {
              return [
                createVNode(unref(TabsIndicator_default), {
                  class: ui.value.indicator({ class: unref(props).ui?.indicator })
                }, null, 8, ["class"]),
                (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item, index) => {
                  return (openBlock(), createBlock(unref(TabsTrigger_default), {
                    key: index,
                    value: String(index),
                    class: ui.value.trigger({ class: unref(props).ui?.trigger })
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        icon: item.icon,
                        filename: item.label,
                        class: ui.value.triggerIcon({ class: unref(props).ui?.triggerIcon })
                      }, null, 8, ["icon", "filename", "class"]),
                      createVNode("span", {
                        class: ui.value.triggerLabel({ class: unref(props).ui?.triggerLabel })
                      }, toDisplayString(item.label), 3)
                    ]),
                    _: 2
                  }, 1032, ["value", "class"]))
                }), 128))
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(`<!--[-->`);
        ssrRenderList(items.value, (item, index) => {
          _push(ssrRenderComponent(unref(TabsContent_default), {
            key: index,
            value: String(index),
            "as-child": ""
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), {
                  "hide-header": "",
                  tabindex: "-1"
                }, null), _parent, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(item.component), {
                    "hide-header": "",
                    tabindex: "-1"
                  }))
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
      } else {
        return [
          createVNode(unref(TabsList_default), {
            class: ui.value.list({ class: unref(props).ui?.list })
          }, {
            default: withCtx(() => [
              createVNode(unref(TabsIndicator_default), {
                class: ui.value.indicator({ class: unref(props).ui?.indicator })
              }, null, 8, ["class"]),
              (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item, index) => {
                return (openBlock(), createBlock(unref(TabsTrigger_default), {
                  key: index,
                  value: String(index),
                  class: ui.value.trigger({ class: unref(props).ui?.trigger })
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$1, {
                      icon: item.icon,
                      filename: item.label,
                      class: ui.value.triggerIcon({ class: unref(props).ui?.triggerIcon })
                    }, null, 8, ["icon", "filename", "class"]),
                    createVNode("span", {
                      class: ui.value.triggerLabel({ class: unref(props).ui?.triggerLabel })
                    }, toDisplayString(item.label), 3)
                  ]),
                  _: 2
                }, 1032, ["value", "class"]))
              }), 128))
            ]),
            _: 1
          }, 8, ["class"]),
          (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item, index) => {
            return (openBlock(), createBlock(unref(TabsContent_default), {
              key: index,
              value: String(index),
              "as-child": ""
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(item.component), {
                  "hide-header": "",
                  tabindex: "-1"
                }))
              ]),
              _: 2
            }, 1032, ["value"]))
          }), 128))
        ]
      }
    }),
    _: 1
  }, _parent));
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/CodeGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=CodeGroup-BcXPgDb9.mjs.map
