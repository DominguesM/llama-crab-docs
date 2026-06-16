import { useSlots, computed, ref, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, renderSlot, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderVNode, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv, G as transformUI, q as useForwardProps, ar as AccordionRoot_default, as as AccordionItem_default, m as get, at as AccordionTrigger_default, w as _sfc_main$K, au as AccordionContent_default, ap as injectAccordionRootContext, aq as injectAccordionItemContext, i as useForwardExpose, P as Primitive } from './server.mjs';
import { reactivePick } from '@vueuse/core';
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

//#region src/Accordion/AccordionHeader.vue?vue&type=script&setup=true&lang.ts
var AccordionHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "AccordionHeader",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "h3"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectAccordionRootContext();
		const itemContext = injectAccordionItemContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"data-orientation": unref(rootContext).orientation,
				"data-state": unref(itemContext).dataState.value,
				"data-disabled": unref(itemContext).dataDisabled.value
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-orientation",
				"data-state",
				"data-disabled"
			]);
		};
	}
});

//#endregion
//#region src/Accordion/AccordionHeader.vue
var AccordionHeader_default = AccordionHeader_vue_vue_type_script_setup_true_lang_default;

const theme$1 = {
  "slots": {
    "root": "w-full",
    "item": "border-b border-default last:border-b-0",
    "header": "flex",
    "trigger": "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0",
    "content": "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
    "body": "text-sm pb-3.5",
    "leadingIcon": "shrink-0 size-5",
    "trailingIcon": "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
    "label": "text-start break-words"
  },
  "variants": {
    "disabled": {
      "true": {
        "trigger": "cursor-not-allowed opacity-75"
      }
    }
  }
};

const _sfc_main$1 = {
  __name: "UAccordion",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  items: { type: Array, required: false },
  trailingIcon: { type: null, required: false },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  collapsible: { type: Boolean, required: false, default: true },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  type: { type: String, required: false, default: "single" },
  disabled: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
},
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {

const _props = __props;
const emits = __emit;
const slots = useSlots();
const props = useComponentProps("accordion", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "collapsible", "defaultValue", "disabled", "modelValue", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.accordion || {} })({
  disabled: props.disabled
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(AccordionRoot_default), mergeProps(unref(rootProps), {
    type: unref(props).type,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<!--[-->`);
        ssrRenderList(unref(props).items, (item, index) => {
          _push(ssrRenderComponent(unref(AccordionItem_default), {
            key: unref(get)(item, unref(props).valueKey) ?? index,
            value: unref(get)(item, unref(props).valueKey) ?? String(index),
            disabled: item.disabled,
            "data-slot": "item",
            class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item, item.class] })
          }, {
            default: withCtx(({ open }, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(unref(AccordionHeader_default), {
                  as: "div",
                  "data-slot": "header",
                  class: ui.value.header({ class: [unref(props).ui?.header, item.ui?.header] })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      _push(ssrRenderComponent(unref(AccordionTrigger_default), {
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                      }, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            ssrRenderSlot(_ctx.$slots, "leading", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => {
                              if (item.icon) {
                                _push(ssrRenderComponent(_sfc_main$K, {
                                  name: item.icon,
                                  "data-slot": "leadingIcon",
                                  class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, _parent, _scopeId));
                              } else {
                                _push(`<!---->`);
                              }
                            }, _push, _parent, _scopeId);
                            if (unref(get)(item, unref(props).labelKey) || !!slots.default) {
                              _push(`<span data-slot="label" class="${
                                ssrRenderClass(ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] }))
                              }"${
                                _scopeId
                              }>`);
                              ssrRenderSlot(_ctx.$slots, "default", {
                                item: item,
                                index: index,
                                open: open
                              }, () => {
                                _push(`${ssrInterpolate(unref(get)(item, unref(props).labelKey))}`);
                              }, _push, _parent, _scopeId);
                              _push(`</span>`);
                            } else {
                              _push(`<!---->`);
                            }
                            ssrRenderSlot(_ctx.$slots, "trailing", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => {
                              _push(ssrRenderComponent(_sfc_main$K, {
                                name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: [unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, _parent, _scopeId));
                            }, _push, _parent, _scopeId);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "leading", {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                (item.icon)
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 0,
                                      name: item.icon,
                                      "data-slot": "leadingIcon",
                                      class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, 8, ["name", "class"]))
                                  : createCommentVNode("", true)
                              ]),
                              (unref(get)(item, unref(props).labelKey) || !!slots.default)
                                ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
                                  }, [
                                    renderSlot(_ctx.$slots, "default", {
                                      item: item,
                                      index: index,
                                      open: open
                                    }, () => [
                                      createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                    ])
                                  ], 2))
                                : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, "trailing", {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                createVNode(_sfc_main$K, {
                                  name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                  "data-slot": "trailingIcon",
                                  class: ui.value.trailingIcon({ class: [unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                                }, null, 8, ["name", "class"])
                              ])
                            ]
                          }
                        }),
                        _: 2
                      }, _parent, _scopeId));
                    } else {
                      return [
                        createVNode(unref(AccordionTrigger_default), {
                          "data-slot": "trigger",
                          class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "leading", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => [
                              (item.icon)
                                ? (openBlock(), createBlock(_sfc_main$K, {
                                    key: 0,
                                    name: item.icon,
                                    "data-slot": "leadingIcon",
                                    class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                  }, null, 8, ["name", "class"]))
                                : createCommentVNode("", true)
                            ]),
                            (unref(get)(item, unref(props).labelKey) || !!slots.default)
                              ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  "data-slot": "label",
                                  class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
                                }, [
                                  renderSlot(_ctx.$slots, "default", {
                                    item: item,
                                    index: index,
                                    open: open
                                  }, () => [
                                    createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                  ])
                                ], 2))
                              : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => [
                              createVNode(_sfc_main$K, {
                                name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: [unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, 8, ["name", "class"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]
                    }
                  }),
                  _: 2
                }, _parent, _scopeId));
                if (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`]) {
                  _push(ssrRenderComponent(unref(AccordionContent_default), {
                    "data-slot": "content",
                    class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        ssrRenderSlot(_ctx.$slots, item.slot || 'content', {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => {
                          _push(`<div data-slot="body" class="${
                            ssrRenderClass(ui.value.body({ class: [unref(props).ui?.body, item.ui?.body] }))
                          }"${
                            _scopeId
                          }>`);
                          ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => {
                            _push(`${ssrInterpolate(item.content)}`);
                          }, _push, _parent, _scopeId);
                          _push(`</div>`);
                        }, _push, _parent, _scopeId);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, item.slot || 'content', {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: [unref(props).ui?.body, item.ui?.body] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                createTextVNode(toDisplayString(item.content), 1)
                              ])
                            ], 2)
                          ])
                        ]
                      }
                    }),
                    _: 2
                  }, _parent, _scopeId));
                } else {
                  _push(`<!---->`);
                }
              } else {
                return [
                  createVNode(unref(AccordionHeader_default), {
                    as: "div",
                    "data-slot": "header",
                    class: ui.value.header({ class: [unref(props).ui?.header, item.ui?.header] })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(AccordionTrigger_default), {
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "leading", {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            (item.icon)
                              ? (openBlock(), createBlock(_sfc_main$K, {
                                  key: 0,
                                  name: item.icon,
                                  "data-slot": "leadingIcon",
                                  class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, 8, ["name", "class"]))
                              : createCommentVNode("", true)
                          ]),
                          (unref(get)(item, unref(props).labelKey) || !!slots.default)
                            ? (openBlock(), createBlock("span", {
                                key: 0,
                                "data-slot": "label",
                                class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
                              }, [
                                renderSlot(_ctx.$slots, "default", {
                                  item: item,
                                  index: index,
                                  open: open
                                }, () => [
                                  createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                ])
                              ], 2))
                            : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "trailing", {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            createVNode(_sfc_main$K, {
                              name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                              "data-slot": "trailingIcon",
                              class: ui.value.trailingIcon({ class: [unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                            }, null, 8, ["name", "class"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["class"]),
                  (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`])
                    ? (openBlock(), createBlock(unref(AccordionContent_default), {
                        key: 0,
                        "data-slot": "content",
                        class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot || 'content', {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: [unref(props).ui?.body, item.ui?.body] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                createTextVNode(toDisplayString(item.content), 1)
                              ])
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class"]))
                    : createCommentVNode("", true)
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(unref(props).items, (item, index) => {
            return (openBlock(), createBlock(unref(AccordionItem_default), {
              key: unref(get)(item, unref(props).valueKey) ?? index,
              value: unref(get)(item, unref(props).valueKey) ?? String(index),
              disabled: item.disabled,
              "data-slot": "item",
              class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item, item.class] })
            }, {
              default: withCtx(({ open }) => [
                createVNode(unref(AccordionHeader_default), {
                  as: "div",
                  "data-slot": "header",
                  class: ui.value.header({ class: [unref(props).ui?.header, item.ui?.header] })
                }, {
                  default: withCtx(() => [
                    createVNode(unref(AccordionTrigger_default), {
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "leading", {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => [
                          (item.icon)
                            ? (openBlock(), createBlock(_sfc_main$K, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"]))
                            : createCommentVNode("", true)
                        ]),
                        (unref(get)(item, unref(props).labelKey) || !!slots.default)
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item: item,
                                index: index,
                                open: open
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                              ])
                            ], 2))
                          : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => [
                          createVNode(_sfc_main$K, {
                            name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: [unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                          }, null, 8, ["name", "class"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 2
                }, 1032, ["class"]),
                (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`])
                  ? (openBlock(), createBlock(unref(AccordionContent_default), {
                      key: 0,
                      "data-slot": "content",
                      class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, item.slot || 'content', {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => [
                          createVNode("div", {
                            "data-slot": "body",
                            class: ui.value.body({ class: [unref(props).ui?.body, item.ui?.body] })
                          }, [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => [
                              createTextVNode(toDisplayString(item.content), 1)
                            ])
                          ], 2)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class"]))
                  : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["value", "disabled", "class"]))
          }), 128))
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Accordion.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const theme = {
  "slots": {
    "root": "my-5",
    "trigger": "text-base"
  }
};

const _sfc_main = {
  __name: "ProseAccordion",
  __ssrInlineRender: true,
  props: {
  type: { type: String, required: false, default: "multiple" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("prose.accordion", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.accordion || {} }));
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
    index,
    label: slot.props?.label || `${index}`,
    description: slot.props?.description,
    icon: slot.props?.icon,
    component: slot
  };
}

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(_sfc_main$1, mergeProps({
    type: unref(props).type,
    items: items.value,
    "unmount-on-hide": false,
    class: unref(props).class,
    ui: unref(transformUI)(ui.value(), unref(props).ui)
  }, _attrs), {
    content: withCtx(({ item }, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), null, null), _parent, _scopeId);
      } else {
        return [
          (openBlock(), createBlock(resolveDynamicComponent(item.component)))
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/Accordion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=Accordion-DTvm9afZ.mjs.map
