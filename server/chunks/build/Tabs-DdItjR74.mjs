import { useSlots, useModel, computed, ref, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, mergeModels, renderSlot, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderVNode, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv, G as transformUI, q as useForwardProps, m as get, w as _sfc_main$K, x as _sfc_main$H, av as _sfc_main$e } from './server.mjs';
import { T as TabsRoot_default, a as TabsList_default, b as TabsIndicator_default, c as TabsTrigger_default, d as TabsContent_default } from './TabsTrigger-DxApqvYb.mjs';
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
import './RovingFocusItem-CxraSrf4.mjs';

const theme$1 = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};

const _sfc_main$1 = {
  __name: "UTabs",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  items: { type: Array, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  content: { type: Boolean, required: false, default: true },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultValue: { type: [String, Number], required: false, default: "0" },
  modelValue: { type: [String, Number], required: false },
  activationMode: { type: String, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
},
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {

const _props = __props;
const emits = __emit;
const slots = useSlots();
const props = useComponentProps("tabs", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.tabs || {} })({
  color: props.color,
  variant: props.variant,
  size: props.size,
  orientation: props.orientation
}));
const triggersRef = ref([]);
function setTriggerRef(index, el) {
  triggersRef.value[index] = el;
}
__expose({
  triggersRef
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(TabsRoot_default), mergeProps(unref(rootProps), {
    "model-value": unref(props).modelValue,
    "default-value": unref(props).defaultValue,
    orientation: unref(props).orientation,
    "activation-mode": unref(props).activationMode,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(TabsList_default), {
          "data-slot": "list",
          class: ui.value.list({ class: unref(props).ui?.list })
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(TabsIndicator_default), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: unref(props).ui?.indicator })
              }, null, _parent, _scopeId));
              ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push, _parent, _scopeId);
              _push(`<!--[-->`);
              ssrRenderList(unref(props).items, (item, index) => {
                _push(ssrRenderComponent(unref(TabsTrigger_default), {
                  key: unref(get)(item, unref(props).valueKey) ?? index,
                  ref_for: true,
                  ref: (el) => setTriggerRef(index, el),
                  value: unref(get)(item, unref(props).valueKey) ?? String(index),
                  disabled: item.disabled,
                  "data-slot": "trigger",
                  class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger] })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "leading", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => {
                        if (item.icon) {
                          _push(ssrRenderComponent(_sfc_main$K, {
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, _parent, _scopeId));
                        } else if (item.avatar) {
                          _push(ssrRenderComponent(_sfc_main$H, mergeProps({
                            size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            "data-slot": "leadingAvatar",
                            class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, _parent, _scopeId));
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
                          index: index
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
                        ui: ui.value
                      }, () => {
                        if (item.badge || item.badge === 0) {
                          _push(ssrRenderComponent(_sfc_main$e, mergeProps({
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, _parent, _scopeId));
                        } else {
                          _push(`<!---->`);
                        }
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "leading", {
                          item: item,
                          index: index,
                          ui: ui.value
                        }, () => [
                          (item.icon)
                            ? (openBlock(), createBlock(_sfc_main$K, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"]))
                            : (item.avatar)
                              ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                                  key: 1,
                                  size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  "data-slot": "leadingAvatar",
                                  class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
                                }), null, 16, ["size", "class"]))
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
                                index: index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                              ])
                            ], 2))
                          : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item: item,
                          index: index,
                          ui: ui.value
                        }, () => [
                          (item.badge || item.badge === 0)
                            ? (openBlock(), createBlock(_sfc_main$e, mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16, ["size", "class"]))
                            : createCommentVNode("", true)
                        ])
                      ]
                    }
                  }),
                  _: 2
                }, _parent, _scopeId));
              });
              _push(`<!--]-->`);
              ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push, _parent, _scopeId);
            } else {
              return [
                createVNode(unref(TabsIndicator_default), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: unref(props).ui?.indicator })
                }, null, 8, ["class"]),
                renderSlot(_ctx.$slots, "list-leading"),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(props).items, (item, index) => {
                  return (openBlock(), createBlock(unref(TabsTrigger_default), {
                    key: unref(get)(item, unref(props).valueKey) ?? index,
                    ref_for: true,
                    ref: (el) => setTriggerRef(index, el),
                    value: unref(get)(item, unref(props).valueKey) ?? String(index),
                    disabled: item.disabled,
                    "data-slot": "trigger",
                    class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger] })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "leading", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => [
                        (item.icon)
                          ? (openBlock(), createBlock(_sfc_main$K, {
                              key: 0,
                              name: item.icon,
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8, ["name", "class"]))
                          : (item.avatar)
                            ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16, ["size", "class"]))
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
                              index: index
                            }, () => [
                              createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                            ])
                          ], 2))
                        : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "trailing", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => [
                        (item.badge || item.badge === 0)
                          ? (openBlock(), createBlock(_sfc_main$e, mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                              "data-slot": "trailingBadge",
                              class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16, ["size", "class"]))
                          : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["value", "disabled", "class"]))
                }), 128)),
                renderSlot(_ctx.$slots, "list-trailing")
              ]
            }
          }),
          _: 3
        }, _parent, _scopeId));
        if (!!unref(props).content) {
          _push(`<!--[-->`);
          ssrRenderList(unref(props).items, (item, index) => {
            _push(ssrRenderComponent(unref(TabsContent_default), {
              key: unref(get)(item, unref(props).valueKey) ?? index,
              value: unref(get)(item, unref(props).valueKey) ?? String(index),
              "data-slot": "content",
              class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content, item.class] })
            }, {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  ssrRenderSlot(_ctx.$slots, item.slot || 'content', {
                    item: item,
                    index: index,
                    ui: ui.value
                  }, () => {
                    _push(`${ssrInterpolate(item.content)}`);
                  }, _push, _parent, _scopeId);
                } else {
                  return [
                    renderSlot(_ctx.$slots, item.slot || 'content', {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]
                }
              }),
              _: 2
            }, _parent, _scopeId));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode(unref(TabsList_default), {
            "data-slot": "list",
            class: ui.value.list({ class: unref(props).ui?.list })
          }, {
            default: withCtx(() => [
              createVNode(unref(TabsIndicator_default), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: unref(props).ui?.indicator })
              }, null, 8, ["class"]),
              renderSlot(_ctx.$slots, "list-leading"),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(props).items, (item, index) => {
                return (openBlock(), createBlock(unref(TabsTrigger_default), {
                  key: unref(get)(item, unref(props).valueKey) ?? index,
                  ref_for: true,
                  ref: (el) => setTriggerRef(index, el),
                  value: unref(get)(item, unref(props).valueKey) ?? String(index),
                  disabled: item.disabled,
                  "data-slot": "trigger",
                  class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "leading", {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      (item.icon)
                        ? (openBlock(), createBlock(_sfc_main$K, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8, ["name", "class"]))
                        : (item.avatar)
                          ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              "data-slot": "leadingAvatar",
                              class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16, ["size", "class"]))
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
                            index: index
                          }, () => [
                            createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                          ])
                        ], 2))
                      : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "trailing", {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      (item.badge || item.badge === 0)
                        ? (openBlock(), createBlock(_sfc_main$e, mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16, ["size", "class"]))
                        : createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "class"]))
              }), 128)),
              renderSlot(_ctx.$slots, "list-trailing")
            ]),
            _: 3
          }, 8, ["class"]),
          (!!unref(props).content)
            ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(props).items, (item, index) => {
                return (openBlock(), createBlock(unref(TabsContent_default), {
                  key: unref(get)(item, unref(props).valueKey) ?? index,
                  value: unref(get)(item, unref(props).valueKey) ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || 'content', {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]))
              }), 128))
            : createCommentVNode("", true)
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const theme = {
  "slots": {
    "root": "my-5 gap-4"
  }
};

const _sfc_main = {
  __name: "ProseTabs",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    defaultValue: { type: String, required: false, default: "0" },
    sync: { type: String, required: false },
    hash: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  }, {
    "modelValue": { type: String },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const _props = __props;
    const slots = useSlots();
    const props = useComponentProps("prose.tabs", _props);
    const model = useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.tabs || {} }));
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
    async function onUpdateModelValue() {
      if (props.hash) {
        const hash = props.hash.startsWith("#") ? props.hash : `#${props.hash}`;
        setTimeout(() => {
          (void 0).querySelector(hash)?.scrollIntoView();
        }, 200);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        modelValue: model.value,
        "onUpdate:modelValue": [($event) => model.value = $event, onUpdateModelValue],
        color: "primary",
        variant: "link",
        items: items.value,
        class: unref(props).class,
        "unmount-on-hide": false,
        ui: unref(transformUI)(ui.value(), unref(props).ui)
      }, _attrs), {
        content: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.component), null, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(item.component)))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/Tabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Tabs-DdItjR74.mjs.map
