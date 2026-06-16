import { useSlots, computed, unref, mergeProps, withCtx, openBlock, createBlock, renderSlot, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, a0 as usePrefix, t as tv, P as Primitive, aI as _sfc_main$y, w as _sfc_main$K, A as _sfc_main$E } from './server.mjs';
import _sfc_main$1 from './PageFeature-CdZFcCsm.mjs';
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
    "root": "relative isolate",
    "container": "flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16",
    "wrapper": "",
    "header": "",
    "leading": "flex items-center mb-6",
    "leadingIcon": "size-10 shrink-0 text-primary",
    "headline": "mb-3",
    "title": "text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted",
    "description": "text-base sm:text-lg text-muted",
    "body": "mt-8",
    "features": "grid",
    "footer": "mt-8",
    "links": "flex flex-wrap gap-x-6 gap-y-3"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "container": "lg:grid-cols-2 lg:items-center",
        "description": "text-pretty",
        "features": "gap-4"
      },
      "vertical": {
        "container": "",
        "headline": "justify-center",
        "leading": "justify-center",
        "title": "text-center",
        "description": "text-center text-balance",
        "links": "justify-center",
        "features": "sm:grid-cols-2 lg:grid-cols-3 gap-8"
      }
    },
    "reverse": {
      "true": {
        "wrapper": "order-last"
      }
    },
    "headline": {
      "true": {
        "headline": "font-semibold text-primary flex items-center gap-1.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-6"
      }
    },
    "description": {
      "true": ""
    },
    "body": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "vertical",
      "title": true,
      "class": {
        "body": "mt-16"
      }
    },
    {
      "orientation": "vertical",
      "description": true,
      "class": {
        "body": "mt-16"
      }
    },
    {
      "orientation": "vertical",
      "body": true,
      "class": {
        "footer": "mt-16"
      }
    }
  ]
};

const _sfc_main = {
  __name: "UPageSection",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "section" },
  headline: { type: String, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  links: { type: Array, required: false },
  features: { type: Array, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  reverse: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("pageSection", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageSection || {} })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features)
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-orientation": unref(props).orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent, _scopeId);
        _push(ssrRenderComponent(_sfc_main$y, {
          "data-slot": "container",
          class: ui.value.container({ class: unref(props).ui?.container })
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (!!slots.header || (unref(props).icon || !!slots.leading) || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) || !!slots.body || (unref(props).features?.length || !!slots.features) || !!slots.footer || (unref(props).links?.length || !!slots.links)) {
                _push(`<div data-slot="wrapper" class="${
                  ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))
                }"${
                  _scopeId
                }>`);
                if (!!slots.header || (unref(props).icon || !!slots.leading) || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description)) {
                  _push(`<div data-slot="header" class="${
                    ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))
                  }"${
                    _scopeId
                  }>`);
                  ssrRenderSlot(_ctx.$slots, "header", {}, () => {
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
                    if (unref(props).headline || !!slots.headline) {
                      _push(`<div data-slot="headline" class="${
                        ssrRenderClass(ui.value.headline({ class: unref(props).ui?.headline, headline: !slots.headline }))
                      }"${
                        _scopeId
                      }>`);
                      ssrRenderSlot(_ctx.$slots, "headline", {}, () => {
                        _push(`${ssrInterpolate(unref(props).headline)}`);
                      }, _push, _parent, _scopeId);
                      _push(`</div>`);
                    } else {
                      _push(`<!---->`);
                    }
                    if (unref(props).title || !!slots.title) {
                      _push(`<h2 data-slot="title" class="${
                        ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))
                      }"${
                        _scopeId
                      }>`);
                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                        _push(`${ssrInterpolate(unref(props).title)}`);
                      }, _push, _parent, _scopeId);
                      _push(`</h2>`);
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
                  _push(`<!---->`);
                }
                if (!!slots.body || (unref(props).features?.length || !!slots.features)) {
                  _push(`<div data-slot="body" class="${
                    ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))
                  }"${
                    _scopeId
                  }>`);
                  ssrRenderSlot(_ctx.$slots, "body", {}, () => {
                    if (unref(props).features?.length || !!slots.features) {
                      _push(`<ul data-slot="features" class="${
                        ssrRenderClass(ui.value.features({ class: unref(props).ui?.features }))
                      }"${
                        _scopeId
                      }>`);
                      ssrRenderSlot(_ctx.$slots, "features", {}, () => {
                        _push(`<!--[-->`);
                        ssrRenderList(unref(props).features, (feature, index) => {
                          _push(ssrRenderComponent(_sfc_main$1, mergeProps({
                            key: index,
                            as: "li"
                          }, { ref_for: true }, feature), null, _parent, _scopeId));
                        });
                        _push(`<!--]-->`);
                      }, _push, _parent, _scopeId);
                      _push(`</ul>`);
                    } else {
                      _push(`<!---->`);
                    }
                  }, _push, _parent, _scopeId);
                  _push(`</div>`);
                } else {
                  _push(`<!---->`);
                }
                if (!!slots.footer || (unref(props).links?.length || !!slots.links)) {
                  _push(`<div data-slot="footer" class="${
                    ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))
                  }"${
                    _scopeId
                  }>`);
                  ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
                    if (unref(props).links?.length || !!slots.links) {
                      _push(`<div data-slot="links" class="${
                        ssrRenderClass(ui.value.links({ class: unref(props).ui?.links }))
                      }"${
                        _scopeId
                      }>`);
                      ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                        _push(`<!--[-->`);
                        ssrRenderList(unref(props).links, (link, index) => {
                          _push(ssrRenderComponent(_sfc_main$E, mergeProps({
                            key: index,
                            size: "lg"
                          }, { ref_for: true }, link), null, _parent, _scopeId));
                        });
                        _push(`<!--]-->`);
                      }, _push, _parent, _scopeId);
                      _push(`</div>`);
                    } else {
                      _push(`<!---->`);
                    }
                  }, _push, _parent, _scopeId);
                  _push(`</div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div>`);
              } else {
                _push(`<!---->`);
              }
              if (!!slots.default) {
                ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
              } else if (unref(props).orientation === 'horizontal') {
                _push(`<div class="${
                  ssrRenderClass(unref(prefix)('hidden lg:block'))
                }"${
                  _scopeId
                }></div>`);
              } else {
                _push(`<!---->`);
              }
            } else {
              return [
                (!!slots.header || (unref(props).icon || !!slots.leading) || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) || !!slots.body || (unref(props).features?.length || !!slots.features) || !!slots.footer || (unref(props).links?.length || !!slots.links))
                  ? (openBlock(), createBlock("div", {
                      key: 0,
                      "data-slot": "wrapper",
                      class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
                    }, [
                      (!!slots.header || (unref(props).icon || !!slots.leading) || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description))
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: unref(props).ui?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", {}, () => [
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
                              (unref(props).headline || !!slots.headline)
                                ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    "data-slot": "headline",
                                    class: ui.value.headline({ class: unref(props).ui?.headline, headline: !slots.headline })
                                  }, [
                                    renderSlot(_ctx.$slots, "headline", {}, () => [
                                      createTextVNode(toDisplayString(unref(props).headline), 1)
                                    ])
                                  ], 2))
                                : createCommentVNode("", true),
                              (unref(props).title || !!slots.title)
                                ? (openBlock(), createBlock("h2", {
                                    key: 2,
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
                                    key: 3,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: unref(props).ui?.description })
                                  }, [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(unref(props).description), 1)
                                    ])
                                  ], 2))
                                : createCommentVNode("", true)
                            ])
                          ], 2))
                        : createCommentVNode("", true),
                      (!!slots.body || (unref(props).features?.length || !!slots.features))
                        ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: unref(props).ui?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", {}, () => [
                              (unref(props).features?.length || !!slots.features)
                                ? (openBlock(), createBlock("ul", {
                                    key: 0,
                                    "data-slot": "features",
                                    class: ui.value.features({ class: unref(props).ui?.features })
                                  }, [
                                    renderSlot(_ctx.$slots, "features", {}, () => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(props).features, (feature, index) => {
                                        return (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                          key: index,
                                          as: "li"
                                        }, { ref_for: true }, feature), null, 16))
                                      }), 128))
                                    ])
                                  ], 2))
                                : createCommentVNode("", true)
                            ])
                          ], 2))
                        : createCommentVNode("", true),
                      (!!slots.footer || (unref(props).links?.length || !!slots.links))
                        ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: unref(props).ui?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", {}, () => [
                              (unref(props).links?.length || !!slots.links)
                                ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    "data-slot": "links",
                                    class: ui.value.links({ class: unref(props).ui?.links })
                                  }, [
                                    renderSlot(_ctx.$slots, "links", {}, () => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
                                        return (openBlock(), createBlock(_sfc_main$E, mergeProps({
                                          key: index,
                                          size: "lg"
                                        }, { ref_for: true }, link), null, 16))
                                      }), 128))
                                    ])
                                  ], 2))
                                : createCommentVNode("", true)
                            ])
                          ], 2))
                        : createCommentVNode("", true)
                    ], 2))
                  : createCommentVNode("", true),
                (!!slots.default)
                  ? renderSlot(_ctx.$slots, "default", { key: 1 })
                  : (unref(props).orientation === 'horizontal')
                    ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: unref(prefix)('hidden lg:block')
                      }, null, 2))
                    : createCommentVNode("", true)
              ]
            }
          }),
          _: 3
        }, _parent, _scopeId));
        ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "top"),
          createVNode(_sfc_main$y, {
            "data-slot": "container",
            class: ui.value.container({ class: unref(props).ui?.container })
          }, {
            default: withCtx(() => [
              (!!slots.header || (unref(props).icon || !!slots.leading) || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) || !!slots.body || (unref(props).features?.length || !!slots.features) || !!slots.footer || (unref(props).links?.length || !!slots.links))
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-slot": "wrapper",
                    class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
                  }, [
                    (!!slots.header || (unref(props).icon || !!slots.leading) || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description))
                      ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: unref(props).ui?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", {}, () => [
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
                            (unref(props).headline || !!slots.headline)
                              ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  "data-slot": "headline",
                                  class: ui.value.headline({ class: unref(props).ui?.headline, headline: !slots.headline })
                                }, [
                                  renderSlot(_ctx.$slots, "headline", {}, () => [
                                    createTextVNode(toDisplayString(unref(props).headline), 1)
                                  ])
                                ], 2))
                              : createCommentVNode("", true),
                            (unref(props).title || !!slots.title)
                              ? (openBlock(), createBlock("h2", {
                                  key: 2,
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
                                  key: 3,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(props).ui?.description })
                                }, [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(unref(props).description), 1)
                                  ])
                                ], 2))
                              : createCommentVNode("", true)
                          ])
                        ], 2))
                      : createCommentVNode("", true),
                    (!!slots.body || (unref(props).features?.length || !!slots.features))
                      ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: unref(props).ui?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", {}, () => [
                            (unref(props).features?.length || !!slots.features)
                              ? (openBlock(), createBlock("ul", {
                                  key: 0,
                                  "data-slot": "features",
                                  class: ui.value.features({ class: unref(props).ui?.features })
                                }, [
                                  renderSlot(_ctx.$slots, "features", {}, () => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(props).features, (feature, index) => {
                                      return (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                        key: index,
                                        as: "li"
                                      }, { ref_for: true }, feature), null, 16))
                                    }), 128))
                                  ])
                                ], 2))
                              : createCommentVNode("", true)
                          ])
                        ], 2))
                      : createCommentVNode("", true),
                    (!!slots.footer || (unref(props).links?.length || !!slots.links))
                      ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: unref(props).ui?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", {}, () => [
                            (unref(props).links?.length || !!slots.links)
                              ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  "data-slot": "links",
                                  class: ui.value.links({ class: unref(props).ui?.links })
                                }, [
                                  renderSlot(_ctx.$slots, "links", {}, () => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
                                      return (openBlock(), createBlock(_sfc_main$E, mergeProps({
                                        key: index,
                                        size: "lg"
                                      }, { ref_for: true }, link), null, 16))
                                    }), 128))
                                  ])
                                ], 2))
                              : createCommentVNode("", true)
                          ])
                        ], 2))
                      : createCommentVNode("", true)
                  ], 2))
                : createCommentVNode("", true),
              (!!slots.default)
                ? renderSlot(_ctx.$slots, "default", { key: 1 })
                : (unref(props).orientation === 'horizontal')
                  ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: unref(prefix)('hidden lg:block')
                    }, null, 2))
                  : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["class"]),
          renderSlot(_ctx.$slots, "bottom")
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=PageSection-x7lRbIyN.mjs.map
