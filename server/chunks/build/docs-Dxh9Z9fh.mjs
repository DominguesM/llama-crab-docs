import { _ as _sfc_main$5 } from './Main-CcEaKypT.mjs';
import { aH as _export_sfc, aI as _sfc_main$y, n as useComponentProps, p as useAppConfig, t as tv, P as Primitive, a8 as useSubNavigation, a7 as _sfc_main$h, aa as _sfc_main$d, _ as _sfc_main$F, r as pickLinkProps, v as _sfc_main$G, w as _sfc_main$K } from './server.mjs';
import { _ as _sfc_main$6 } from './Page-DrQeQ56y.mjs';
import { withCtx, renderSlot, createVNode, useSlots, computed, unref, mergeProps, openBlock, createBlock, createCommentVNode, defineComponent, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

const theme$1 = {
  "slots": {
    "root": "hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height) py-8 lg:ps-4 lg:-ms-4 lg:pe-6.5",
    "container": "relative",
    "top": "sticky -top-8 -mt-8 pointer-events-none z-[1]",
    "topHeader": "h-8 bg-default -mx-4 px-4",
    "topBody": "bg-default relative pointer-events-auto flex flex-col -mx-4 px-4",
    "topFooter": "h-8 bg-gradient-to-b from-default -mx-4 px-4"
  }
};

const _sfc_main$4 = {
  __name: "UPageAside",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "aside" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("pageAside", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.pageAside || {} })());

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="container" class="${
          ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))
        }"${
          _scopeId
        }>`);
        if (!!slots.top) {
          _push(`<div data-slot="top" class="${
            ssrRenderClass(ui.value.top({ class: unref(props).ui?.top }))
          }"${
            _scopeId
          }><div data-slot="topHeader" class="${
            ssrRenderClass(ui.value.topHeader({ class: unref(props).ui?.topHeader }))
          }"${
            _scopeId
          }></div><div data-slot="topBody" class="${
            ssrRenderClass(ui.value.topBody({ class: unref(props).ui?.topBody }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent, _scopeId);
          _push(`</div><div data-slot="topFooter" class="${
            ssrRenderClass(ui.value.topFooter({ class: unref(props).ui?.topFooter }))
          }"${
            _scopeId
          }></div></div>`);
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
        ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent, _scopeId);
        _push(`</div>`);
      } else {
        return [
          createVNode("div", {
            "data-slot": "container",
            class: ui.value.container({ class: unref(props).ui?.container })
          }, [
            (!!slots.top)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "top",
                  class: ui.value.top({ class: unref(props).ui?.top })
                }, [
                  createVNode("div", {
                    "data-slot": "topHeader",
                    class: ui.value.topHeader({ class: unref(props).ui?.topHeader })
                  }, null, 2),
                  createVNode("div", {
                    "data-slot": "topBody",
                    class: ui.value.topBody({ class: unref(props).ui?.topBody })
                  }, [
                    renderSlot(_ctx.$slots, "top")
                  ], 2),
                  createVNode("div", {
                    "data-slot": "topFooter",
                    class: ui.value.topFooter({ class: unref(props).ui?.topFooter })
                  }, null, 2)
                ], 2))
              : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "default"),
            renderSlot(_ctx.$slots, "bottom")
          ], 2)
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageAside.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};

const theme = {
  "slots": {
    "root": "",
    "list": "",
    "item": "relative",
    "link": "group text-sm flex items-center gap-1.5 py-1 focus-visible:outline-primary",
    "linkLeading": "rounded-md p-1 inline-flex ring-inset ring",
    "linkLeadingIcon": "size-4 shrink-0",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "size-3 absolute top-0 text-dimmed"
  },
  "variants": {
    "active": {
      "true": {
        "link": "text-primary font-semibold",
        "linkLeading": "bg-primary ring-primary text-inverted"
      },
      "false": {
        "link": [
          "text-muted hover:text-default font-medium",
          "transition-colors"
        ],
        "linkLeading": [
          "bg-elevated/50 ring-accented text-dimmed group-hover:bg-primary group-hover:ring-primary group-hover:text-inverted",
          "transition"
        ]
      }
    }
  }
};

const _sfc_main$3 = {
  __name: "UPageAnchors",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "nav" },
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("pageAnchors", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageAnchors || {} })());

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<ul data-slot="list" class="${
          ssrRenderClass(ui.value.list({ class: unref(props).ui?.list }))
        }"${
          _scopeId
        }><!--[-->`);
        ssrRenderList(unref(props).links, (link, index) => {
          _push(`<li data-slot="item" class="${
            ssrRenderClass(ui.value.item({ class: [unref(props).ui?.item, link.ui?.item] }))
          }"${
            _scopeId
          }>`);
          _push(ssrRenderComponent(_sfc_main$F, mergeProps({ ref_for: true }, unref(pickLinkProps)(link), { custom: "" }), {
            default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                  "data-slot": "link",
                  class: ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], active })
                }), {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "link", {
                        link: link,
                        active: active,
                        ui: ui.value
                      }, () => {
                        if (link.icon || !!slots['link-leading']) {
                          _push(`<div data-slot="linkLeading" class="${
                            ssrRenderClass(ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading], active }))
                          }"${
                            _scopeId
                          }>`);
                          ssrRenderSlot(_ctx.$slots, "link-leading", {
                            link: link,
                            active: active,
                            ui: ui.value
                          }, () => {
                            if (link.icon) {
                              _push(ssrRenderComponent(_sfc_main$K, {
                                name: link.icon,
                                "data-slot": "linkLeadingIcon",
                                class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })
                              }, null, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                          }, _push, _parent, _scopeId);
                          _push(`</div>`);
                        } else {
                          _push(`<!---->`);
                        }
                        if (link.label || !!slots['link-label']) {
                          _push(`<span data-slot="linkLabel" class="${
                            ssrRenderClass(ui.value.linkLabel({ class: [unref(props).ui?.linkLabel, link.ui?.linkLabel], active }))
                          }"${
                            _scopeId
                          }>`);
                          ssrRenderSlot(_ctx.$slots, "link-label", {
                            link: link,
                            active: active
                          }, () => {
                            _push(`${ssrInterpolate(link.label)}`);
                          }, _push, _parent, _scopeId);
                          if (link.target === '_blank') {
                            _push(ssrRenderComponent(_sfc_main$K, {
                              name: unref(appConfig).ui.icons.external,
                              "data-slot": "linkLabelExternalIcon",
                              class: ui.value.linkLabelExternalIcon({ class: [unref(props).ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })
                            }, null, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          _push(`</span>`);
                        } else {
                          _push(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "link-trailing", {
                          link: link,
                          active: active
                        }, null, _push, _parent, _scopeId);
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "link", {
                          link: link,
                          active: active,
                          ui: ui.value
                        }, () => [
                          (link.icon || !!slots['link-leading'])
                            ? (openBlock(), createBlock("div", {
                                key: 0,
                                "data-slot": "linkLeading",
                                class: ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading], active })
                              }, [
                                renderSlot(_ctx.$slots, "link-leading", {
                                  link: link,
                                  active: active,
                                  ui: ui.value
                                }, () => [
                                  (link.icon)
                                    ? (openBlock(), createBlock(_sfc_main$K, {
                                        key: 0,
                                        name: link.icon,
                                        "data-slot": "linkLeadingIcon",
                                        class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })
                                      }, null, 8, ["name", "class"]))
                                    : createCommentVNode("", true)
                                ])
                              ], 2))
                            : createCommentVNode("", true),
                          (link.label || !!slots['link-label'])
                            ? (openBlock(), createBlock("span", {
                                key: 1,
                                "data-slot": "linkLabel",
                                class: ui.value.linkLabel({ class: [unref(props).ui?.linkLabel, link.ui?.linkLabel], active })
                              }, [
                                renderSlot(_ctx.$slots, "link-label", {
                                  link: link,
                                  active: active
                                }, () => [
                                  createTextVNode(toDisplayString(link.label), 1)
                                ]),
                                (link.target === '_blank')
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 0,
                                      name: unref(appConfig).ui.icons.external,
                                      "data-slot": "linkLabelExternalIcon",
                                      class: ui.value.linkLabelExternalIcon({ class: [unref(props).ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })
                                    }, null, 8, ["name", "class"]))
                                  : createCommentVNode("", true)
                              ], 2))
                            : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "link-trailing", {
                            link: link,
                            active: active
                          })
                        ])
                      ]
                    }
                  }),
                  _: 2
                }, _parent, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                    "data-slot": "link",
                    class: ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], active })
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "link", {
                        link: link,
                        active: active,
                        ui: ui.value
                      }, () => [
                        (link.icon || !!slots['link-leading'])
                          ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "linkLeading",
                              class: ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading], active })
                            }, [
                              renderSlot(_ctx.$slots, "link-leading", {
                                link: link,
                                active: active,
                                ui: ui.value
                              }, () => [
                                (link.icon)
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 0,
                                      name: link.icon,
                                      "data-slot": "linkLeadingIcon",
                                      class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })
                                    }, null, 8, ["name", "class"]))
                                  : createCommentVNode("", true)
                              ])
                            ], 2))
                          : createCommentVNode("", true),
                        (link.label || !!slots['link-label'])
                          ? (openBlock(), createBlock("span", {
                              key: 1,
                              "data-slot": "linkLabel",
                              class: ui.value.linkLabel({ class: [unref(props).ui?.linkLabel, link.ui?.linkLabel], active })
                            }, [
                              renderSlot(_ctx.$slots, "link-label", {
                                link: link,
                                active: active
                              }, () => [
                                createTextVNode(toDisplayString(link.label), 1)
                              ]),
                              (link.target === '_blank')
                                ? (openBlock(), createBlock(_sfc_main$K, {
                                    key: 0,
                                    name: unref(appConfig).ui.icons.external,
                                    "data-slot": "linkLabelExternalIcon",
                                    class: ui.value.linkLabelExternalIcon({ class: [unref(props).ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })
                                  }, null, 8, ["name", "class"]))
                                : createCommentVNode("", true)
                            ], 2))
                          : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "link-trailing", {
                          link: link,
                          active: active
                        })
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class"])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        return [
          createVNode("ul", {
            "data-slot": "list",
            class: ui.value.list({ class: unref(props).ui?.list })
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
              return (openBlock(), createBlock("li", {
                key: index,
                "data-slot": "item",
                class: ui.value.item({ class: [unref(props).ui?.item, link.ui?.item] })
              }, [
                createVNode(_sfc_main$F, mergeProps({ ref_for: true }, unref(pickLinkProps)(link), { custom: "" }), {
                  default: withCtx(({ active, ...slotProps }) => [
                    createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                      "data-slot": "link",
                      class: ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], active })
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "link", {
                          link: link,
                          active: active,
                          ui: ui.value
                        }, () => [
                          (link.icon || !!slots['link-leading'])
                            ? (openBlock(), createBlock("div", {
                                key: 0,
                                "data-slot": "linkLeading",
                                class: ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading], active })
                              }, [
                                renderSlot(_ctx.$slots, "link-leading", {
                                  link: link,
                                  active: active,
                                  ui: ui.value
                                }, () => [
                                  (link.icon)
                                    ? (openBlock(), createBlock(_sfc_main$K, {
                                        key: 0,
                                        name: link.icon,
                                        "data-slot": "linkLeadingIcon",
                                        class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })
                                      }, null, 8, ["name", "class"]))
                                    : createCommentVNode("", true)
                                ])
                              ], 2))
                            : createCommentVNode("", true),
                          (link.label || !!slots['link-label'])
                            ? (openBlock(), createBlock("span", {
                                key: 1,
                                "data-slot": "linkLabel",
                                class: ui.value.linkLabel({ class: [unref(props).ui?.linkLabel, link.ui?.linkLabel], active })
                              }, [
                                renderSlot(_ctx.$slots, "link-label", {
                                  link: link,
                                  active: active
                                }, () => [
                                  createTextVNode(toDisplayString(link.label), 1)
                                ]),
                                (link.target === '_blank')
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 0,
                                      name: unref(appConfig).ui.icons.external,
                                      "data-slot": "linkLabelExternalIcon",
                                      class: ui.value.linkLabelExternalIcon({ class: [unref(props).ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })
                                    }, null, 8, ["name", "class"]))
                                  : createCommentVNode("", true)
                              ], 2))
                            : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "link-trailing", {
                            link: link,
                            active: active
                          })
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class"])
                  ]),
                  _: 2
                }, 1040)
              ], 2))
            }), 128))
          ], 2)
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageAnchors.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideLeftTop",
  __ssrInlineRender: true,
  setup(__props) {
    const { subNavigationMode, sections } = useSubNavigation();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPageAnchors = _sfc_main$3;
      const _component_USeparator = _sfc_main$h;
      if (unref(subNavigationMode) === "aside") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-2" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_UPageAnchors, { links: unref(sections) }, null, _parent));
        _push(ssrRenderComponent(_component_USeparator, {
          type: "dashed",
          class: "my-4"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/docs/DocsAsideLeftTop.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$2, { __name: "DocsAsideLeftTop" });

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideLeftBody",
  __ssrInlineRender: true,
  setup(__props) {
    const { sidebarNavigation } = useSubNavigation();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContentNavigation = _sfc_main$d;
      _push(ssrRenderComponent(_component_UContentNavigation, mergeProps({
        highlight: "",
        navigation: unref(sidebarNavigation)
      }, _attrs), null, _parent));
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/docs/DocsAsideLeftBody.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$1, { __name: "DocsAsideLeftBody" });

const _sfc_main = {  };

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UMain = _sfc_main$5;
  const _component_UContainer = _sfc_main$y;
  const _component_UPage = _sfc_main$6;
  const _component_UPageAside = _sfc_main$4;
  const _component_DocsAsideLeftTop = __nuxt_component_4;
  const _component_DocsAsideLeftBody = __nuxt_component_5;

  _push(ssrRenderComponent(_component_UMain, _attrs, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_component_UContainer, null, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(_component_UPage, null, {
                left: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    _push(ssrRenderComponent(_component_UPageAside, null, {
                      default: withCtx((_, _push, _parent, _scopeId) => {
                        if (_push) {
                          _push(ssrRenderComponent(_component_DocsAsideLeftTop, null, null, _parent, _scopeId));
                          _push(ssrRenderComponent(_component_DocsAsideLeftBody, null, null, _parent, _scopeId));
                        } else {
                          return [
                            createVNode(_component_DocsAsideLeftTop),
                            createVNode(_component_DocsAsideLeftBody)
                          ]
                        }
                      }),
                      _: 1
                    }, _parent, _scopeId));
                  } else {
                    return [
                      createVNode(_component_UPageAside, null, {
                        default: withCtx(() => [
                          createVNode(_component_DocsAsideLeftTop),
                          createVNode(_component_DocsAsideLeftBody)
                        ]),
                        _: 1
                      })
                    ]
                  }
                }),
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
              }, _parent, _scopeId));
            } else {
              return [
                createVNode(_component_UPage, null, {
                  left: withCtx(() => [
                    createVNode(_component_UPageAside, null, {
                      default: withCtx(() => [
                        createVNode(_component_DocsAsideLeftTop),
                        createVNode(_component_DocsAsideLeftBody)
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ]
            }
          }),
          _: 3
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(_component_UContainer, null, {
            default: withCtx(() => [
              createVNode(_component_UPage, null, {
                left: withCtx(() => [
                  createVNode(_component_UPageAside, null, {
                    default: withCtx(() => [
                      createVNode(_component_DocsAsideLeftTop),
                      createVNode(_component_DocsAsideLeftBody)
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/docus/app/layouts/docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const docs = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { docs as default };
//# sourceMappingURL=docs-Dxh9Z9fh.mjs.map
