import { _ as _sfc_main$d } from './Page-DrQeQ56y.mjs';
import { defineComponent, inject, computed, ref, watch, unref, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, createTextVNode, toDisplayString, createCommentVNode, useSlots, renderSlot, provide, useModel, toRef, createSlots, mergeModels, withModifiers, resolveDynamicComponent, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderVNode } from 'vue/server-renderer';
import { X as useRoute, $ as useDocusI18n, p as useAppConfig, a6 as useAssistant, ac as withAsyncContext, ad as useAsyncData, ae as queryCollection, af as queryCollectionItemSurroundings, c as createError, ag as findPageBreadcrumbs, A as _sfc_main$E, a7 as _sfc_main$h, ab as useRequestEvent, n as useComponentProps, t as tv, P as Primitive, o as useLocale, a0 as usePrefix, _ as _sfc_main$F, w as _sfc_main$K, Y as useToast, Z as useRuntimeConfig, a8 as useSubNavigation, L as fieldGroupInjectionKey, q as useForwardProps, T as DropdownMenuRoot_default, U as DropdownMenuTrigger_default, W as DropdownMenuArrow_default, a1 as useRouter, a2 as useNuxtApp, a3 as CollapsibleRoot_default, a4 as CollapsibleTrigger_default, a5 as CollapsibleContent_default, N as usePortal, O as useForwardPropsEmits, Q as isArrayOfArray, x as _sfc_main$H, m as get, z as _sfc_main$t, R as DropdownMenu, S as FieldGroupReset, r as pickLinkProps, v as _sfc_main$G, s as omit, a9 as _sfc_main$v, aa as _sfc_main$d$1 } from './server.mjs';
import { aA as kebabCase, a0 as defu } from '../nitro/nitro.mjs';
import { createReusableTemplate, useClipboard, reactivePick, reactiveOmit } from '@vueuse/core';
import { _ as _sfc_main$e } from './Input-C8_ogO9K.mjs';
import { u as useSeo, d as defineOgImageComponent, _ as __nuxt_component_0 } from './defineOgImageComponent-Cm85jsZS.mjs';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import '@iconify/vue';
import 'devalue';
import 'unhead/plugins';
import 'tailwindcss/colors';
import 'consola';
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'aria-hidden';
import 'vaul-vue';
import '@floating-ui/vue';
import 'motion-v';
import 'minimark/hast';
import 'lru-cache';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'unhead';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
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
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'ipx';
import 'property-information';

//#region src/shared/useFilter.ts
/**
* Provides locale-aware string filtering functions.
* Uses `Intl.Collator` for comparison to ensure proper Unicode handling.
*
* @param options - Optional collator options to customize comparison behavior.
*   See [Intl.CollatorOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options) for details.
* @returns An object with methods to check if a string starts with, ends with, or contains a substring.
*
* @example
* const { startsWith, endsWith, contains } = useFilter();
*
* startsWith('hello', 'he'); // true
* endsWith('hello', 'lo'); // true
* contains('hello', 'ell'); // true
*/
function useFilter$1(options) {
	const computedOptions = computed(() => unref(options));
	const collator = computed(() => new Intl.Collator("en", {
		usage: "search",
		...computedOptions.value
	}));
	const startsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(0, substring.length), substring) === 0;
	};
	const endsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(-substring.length), substring) === 0;
	};
	const contains = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		const sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			const slice = string.slice(scan, scan + sliceLen);
			if (collator.value.compare(substring, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}

const theme$6 = {
  "slots": {
    "root": "relative border-b border-default py-8",
    "container": "",
    "wrapper": "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
    "headline": "mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5",
    "title": "text-3xl sm:text-4xl text-pretty font-bold text-highlighted",
    "description": "text-lg text-pretty text-muted",
    "links": "flex flex-wrap items-center gap-1.5"
  },
  "variants": {
    "title": {
      "true": {
        "description": "mt-4"
      }
    }
  }
};

const _sfc_main$c = {
  __name: "UPageHeader",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  headline: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("pageHeader", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$6), ...appConfig.ui?.pageHeader || {} })({
  title: !!props.title || !!slots.title
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (unref(props).headline || !!slots.headline) {
          _push(`<div data-slot="headline" class="${
            ssrRenderClass(ui.value.headline({ class: unref(props).ui?.headline }))
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
        _push(`<div data-slot="container" class="${
          ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))
        }"${
          _scopeId
        }><div data-slot="wrapper" class="${
          ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))
        }"${
          _scopeId
        }>`);
        if (unref(props).title || !!slots.title) {
          _push(`<h1 data-slot="title" class="${
            ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "title", {}, () => {
            _push(`${ssrInterpolate(unref(props).title)}`);
          }, _push, _parent, _scopeId);
          _push(`</h1>`);
        } else {
          _push(`<!---->`);
        }
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
                color: "neutral",
                variant: "outline"
              }, { ref_for: true }, link), null, _parent, _scopeId));
            });
            _push(`<!--]-->`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
        _push(`</div>`);
      } else {
        return [
          (unref(props).headline || !!slots.headline)
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "headline",
                class: ui.value.headline({ class: unref(props).ui?.headline })
              }, [
                renderSlot(_ctx.$slots, "headline", {}, () => [
                  createTextVNode(toDisplayString(unref(props).headline), 1)
                ])
              ], 2))
            : createCommentVNode("", true),
          createVNode("div", {
            "data-slot": "container",
            class: ui.value.container({ class: unref(props).ui?.container })
          }, [
            createVNode("div", {
              "data-slot": "wrapper",
              class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
            }, [
              (unref(props).title || !!slots.title)
                ? (openBlock(), createBlock("h1", {
                    key: 0,
                    "data-slot": "title",
                    class: ui.value.title({ class: unref(props).ui?.title })
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(unref(props).title), 1)
                    ])
                  ], 2))
                : createCommentVNode("", true),
              (unref(props).links?.length || !!slots.links)
                ? (openBlock(), createBlock("div", {
                    key: 1,
                    "data-slot": "links",
                    class: ui.value.links({ class: unref(props).ui?.links })
                  }, [
                    renderSlot(_ctx.$slots, "links", {}, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
                        return (openBlock(), createBlock(_sfc_main$E, mergeProps({
                          key: index,
                          color: "neutral",
                          variant: "outline"
                        }, { ref_for: true }, link), null, 16))
                      }), 128))
                    ])
                  ], 2))
                : createCommentVNode("", true)
            ], 2),
            (unref(props).description || !!slots.description)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "description",
                  class: ui.value.description({ class: unref(props).ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(unref(props).description), 1)
                  ])
                ], 2))
              : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageHeader.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : undefined
};

const theme$5 = {
  "base": "relative",
  "variants": {
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "orientation": {
      "horizontal": "inline-flex -space-x-px",
      "vertical": "flex flex-col -space-y-px"
    }
  }
};

const _sfc_main$b = {
  __name: "UFieldGroup",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;

const props = useComponentProps("fieldGroup", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$5), ...appConfig.ui?.fieldGroup || {} }));
provide(fieldGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size
})));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-orientation": unref(props).orientation,
    class: ui.value({ orientation: unref(props).orientation, class: [unref(props).ui?.base, unref(props).class] })
  }, _attrs), {
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
}

};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/FieldGroup.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : undefined
};

function useFilter() {
  const { contains, startsWith } = useFilter$1({ sensitivity: "base" });
  function score(value, searchTerm) {
    if (!contains(value, searchTerm)) return null;
    if (contains(searchTerm, value)) return 0;
    if (startsWith(value, searchTerm)) return 1;
    return 2;
  }
  function scoreItem(item, searchTerm, fields) {
    if (typeof item !== "object" || item === null) {
      return score(String(item), searchTerm);
    }
    let bestScore = null;
    for (const field of fields) {
      const value = get(item, field);
      if (value == null) continue;
      const values = Array.isArray(value) ? value.map(String) : [String(value)];
      for (const v of values) {
        const s = score(v, searchTerm);
        if (s !== null && (bestScore === null || s < bestScore)) bestScore = s;
        if (bestScore === 0) return 0;
      }
    }
    return bestScore;
  }
  function filter(items, searchTerm, fields) {
    if (!searchTerm) return items;
    const scored = [];
    for (const item of items) {
      const s = scoreItem(item, searchTerm, fields);
      if (s !== null) {
        scored.push({ item, score: s });
      }
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.map(({ item }) => item);
  }
  function filterGroups(groups, searchTerm, options) {
    if (!searchTerm) return groups;
    return groups.map((group) => {
      const result = [];
      for (const item of group) {
        if (item === void 0 || item === null) continue;
        if (options.isStructural?.(item)) {
          result.push({ item, score: -1 });
          continue;
        }
        const s = scoreItem(item, searchTerm, options.fields);
        if (s !== null) {
          result.push({ item, score: s });
        }
      }
      result.sort((a, b) => a.score - b.score);
      return result.map(({ item }) => item);
    }).filter((group) => group.some((item) => !options.isStructural?.(item)));
  }
  return { score, scoreItem, filter, filterGroups };
}

const _sfc_main$a = {
  __name: "UDropdownMenuContent",
  __ssrInlineRender: true,
  props: {
  items: { type: null, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  sub: { type: Boolean, required: false },
  labelKey: { type: null, required: true },
  descriptionKey: { type: null, required: true },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
  size: { type: null, required: false },
  filter: { type: [Boolean, Object], required: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false },
  searchTerm: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: true },
  uiOverride: { type: null, required: false },
  loop: { type: Boolean, required: false },
  side: { type: null, required: false },
  sideOffset: { type: Number, required: false },
  sideFlip: { type: Boolean, required: false },
  align: { type: null, required: false },
  alignOffset: { type: Number, required: false },
  alignFlip: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  collisionBoundary: { type: null, required: false },
  collisionPadding: { type: [Number, Object], required: false },
  arrowPadding: { type: Number, required: false },
  hideShiftedArrow: { type: Boolean, required: false },
  sticky: { type: String, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  positionStrategy: { type: String, required: false },
  updatePositionStrategy: { type: String, required: false },
  disableUpdateOnLayoutShift: { type: Boolean, required: false },
  prioritizePosition: { type: Boolean, required: false },
  reference: { type: null, required: false }
},
  emits: ["update:searchTerm", "escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { t, dir } = useLocale();
const appConfig = useAppConfig();
const { filterGroups } = useFilter();
const _searchTerm = ref("");
const searchTerm = computed({
  get: () => props.searchTerm ?? _searchTerm.value,
  set: (value) => {
    _searchTerm.value = value;
    emits("update:searchTerm", value);
  }
});
const inputProps = toRef(() => defu(props.filter, { placeholder: t("dropdownMenu.search"), variant: "none" }));
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "size", "filter", "filterFields", "ignoreFilter", "searchTerm", "class", "ui", "uiOverride"), emits);
const getProxySlots = () => omit(slots, ["default"]);
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
const groups = computed(() => {
  if (!props.items?.length) return [];
  return isArrayOfArray(props.items) ? props.items : [props.items];
});
const isStructuralItem = (item) => !!item.type && ["label", "separator"].includes(item.type);
const filteredGroups = computed(() => {
  if (!props.filter || props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }
  const fields = Array.isArray(props.filterFields) && props.filterFields.length ? props.filterFields : [props.labelKey];
  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: isStructuralItem
  });
});
const hasFilteredItems = computed(() => filteredGroups.value.some((group) => group.some((item) => !isStructuralItem(item))));

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
    default: withCtx(({ item, active, index }, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, item.slot || 'item', {
          item: item,
          index: index,
          ui: __props.ui
        }, () => {
          ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : 'item-leading', {
            item: item,
            active: active,
            index: index,
            ui: __props.ui
          }, () => {
            if (item.loading) {
              _push(ssrRenderComponent(_sfc_main$K, {
                name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                "data-slot": "itemLeadingIcon",
                class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
              }, null, _parent, _scopeId));
            } else if (item.icon) {
              _push(ssrRenderComponent(_sfc_main$K, {
                name: item.icon,
                "data-slot": "itemLeadingIcon",
                class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
              }, null, _parent, _scopeId));
            } else if (item.avatar) {
              _push(ssrRenderComponent(_sfc_main$H, mergeProps({
                size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
              }, item.avatar, {
                "data-slot": "itemLeadingAvatar",
                class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
              }), null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'] || (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description'])) {
            _push(`<span data-slot="itemWrapper" class="${
              ssrRenderClass(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))
            }"${
              _scopeId
            }><span data-slot="itemLabel" class="${
              ssrRenderClass(__props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : 'item-label', {
              item: item,
              active: active,
              index: index
            }, () => {
              _push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
            }, _push, _parent, _scopeId);
            if (item.target === '_blank' && __props.externalIcon !== false) {
              _push(ssrRenderComponent(_sfc_main$K, {
                name: typeof __props.externalIcon === 'string' ? __props.externalIcon : unref(appConfig).ui.icons.external,
                "data-slot": "itemLabelExternalIcon",
                class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
              }, null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
            if (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description']) {
              _push(`<span data-slot="itemDescription" class="${
                ssrRenderClass(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))
              }"${
                _scopeId
              }>`);
              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : 'item-description', {
                item: item,
                active: active,
                index: index
              }, () => {
                _push(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
              }, _push, _parent, _scopeId);
              _push(`</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-slot="itemTrailing" class="${
            ssrRenderClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : 'item-trailing', {
            item: item,
            active: active,
            index: index,
            ui: __props.ui
          }, () => {
            if (item.children?.length) {
              _push(ssrRenderComponent(_sfc_main$K, {
                name: childrenIcon.value,
                "data-slot": "itemTrailingIcon",
                class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
              }, null, _parent, _scopeId));
            } else if (item.kbds?.length) {
              _push(`<span data-slot="itemTrailingKbds" class="${
                ssrRenderClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))
              }"${
                _scopeId
              }><!--[-->`);
              ssrRenderList(item.kbds, (kbd, kbdIndex) => {
                _push(ssrRenderComponent(_sfc_main$t, mergeProps({
                  key: kbdIndex,
                  size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, _parent, _scopeId));
              });
              _push(`<!--]--></span>`);
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(ssrRenderComponent(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(_sfc_main$K, {
                  name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                  "data-slot": "itemTrailingIcon",
                  class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                }, null, _parent, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$K, {
                    name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                  }, null, 8, ["name", "class"])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
          _push(`</span>`);
        }, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, item.slot || 'item', {
            item: item,
            index: index,
            ui: __props.ui
          }, () => [
            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : 'item-leading', {
              item: item,
              active: active,
              index: index,
              ui: __props.ui
            }, () => [
              (item.loading)
                ? (openBlock(), createBlock(_sfc_main$K, {
                    key: 0,
                    name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, 8, ["name", "class"]))
                : (item.icon)
                  ? (openBlock(), createBlock(_sfc_main$K, {
                      key: 1,
                      name: item.icon,
                      "data-slot": "itemLeadingIcon",
                      class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"]))
                  : (item.avatar)
                    ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                        key: 2,
                        size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                      }, item.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                      }), null, 16, ["size", "class"]))
                    : createCommentVNode("", true)
            ]),
            (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'] || (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description']))
              ? (openBlock(), createBlock("span", {
                  key: 0,
                  "data-slot": "itemWrapper",
                  class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
                }, [
                  createVNode("span", {
                    "data-slot": "itemLabel",
                    class: __props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active })
                  }, [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : 'item-label', {
                      item: item,
                      active: active,
                      index: index
                    }, () => [
                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                    ]),
                    (item.target === '_blank' && __props.externalIcon !== false)
                      ? (openBlock(), createBlock(_sfc_main$K, {
                          key: 0,
                          name: typeof __props.externalIcon === 'string' ? __props.externalIcon : unref(appConfig).ui.icons.external,
                          "data-slot": "itemLabelExternalIcon",
                          class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                        }, null, 8, ["name", "class"]))
                      : createCommentVNode("", true)
                  ], 2),
                  (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description'])
                    ? (openBlock(), createBlock("span", {
                        key: 0,
                        "data-slot": "itemDescription",
                        class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
                      }, [
                        renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : 'item-description', {
                          item: item,
                          active: active,
                          index: index
                        }, () => [
                          createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                        ])
                      ], 2))
                    : createCommentVNode("", true)
                ], 2))
              : createCommentVNode("", true),
            createVNode("span", {
              "data-slot": "itemTrailing",
              class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
            }, [
              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : 'item-trailing', {
                item: item,
                active: active,
                index: index,
                ui: __props.ui
              }, () => [
                (item.children?.length)
                  ? (openBlock(), createBlock(_sfc_main$K, {
                      key: 0,
                      name: childrenIcon.value,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"]))
                  : (item.kbds?.length)
                    ? (openBlock(), createBlock("span", {
                        key: 1,
                        "data-slot": "itemTrailingKbds",
                        class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                          return (openBlock(), createBlock(_sfc_main$t, mergeProps({
                            key: kbdIndex,
                            size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                          }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16, ["size"]))
                        }), 128))
                      ], 2))
                    : createCommentVNode("", true)
              ]),
              createVNode(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$K, {
                    name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                  }, null, 8, ["name", "class"])
                ]),
                _: 2
              }, 1024)
            ], 2)
          ])
        ]
      }
    }),
    _: 3
  }, _parent));
  _push(ssrRenderComponent(unref(DropdownMenu).Portal, unref(portalProps), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(FieldGroupReset), null, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
                "data-slot": "content",
                class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
              }, unref(contentProps)), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    if (!!__props.filter) {
                      _push(ssrRenderComponent(unref(DropdownMenu).Filter, {
                        modelValue: searchTerm.value,
                        "onUpdate:modelValue": $event => ((searchTerm).value = $event),
                        "as-child": ""
                      }, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            _push(ssrRenderComponent(_sfc_main$e, mergeProps({
                              autofocus: "",
                              autocomplete: "off",
                              size: __props.size
                            }, inputProps.value, {
                              "data-slot": "input",
                              class: __props.ui.input({ class: __props.uiOverride?.input }),
                              onChange: () => {}
                            }), null, _parent, _scopeId));
                          } else {
                            return [
                              createVNode(_sfc_main$e, mergeProps({
                                autofocus: "",
                                autocomplete: "off",
                                size: __props.size
                              }, inputProps.value, {
                                "data-slot": "input",
                                class: __props.ui.input({ class: __props.uiOverride?.input }),
                                onChange: withModifiers(() => {}, ["stop"])
                              }), null, 16, ["size", "class", "onChange"])
                            ]
                          }
                        }),
                        _: 1
                      }, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                    ssrRenderSlot(_ctx.$slots, "content-top", {
                      sub: __props.sub ?? false
                    }, null, _push, _parent, _scopeId);
                    if (!searchTerm.value || hasFilteredItems.value) {
                      _push(`<div role="presentation" data-slot="viewport" class="${
                        ssrRenderClass(__props.ui.viewport({ class: __props.uiOverride?.viewport }))
                      }"${
                        _scopeId
                      }><!--[-->`);
                      ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                        _push(ssrRenderComponent(unref(DropdownMenu).Group, {
                          key: `group-${groupIndex}`,
                          "data-slot": "group",
                          class: __props.ui.group({ class: __props.uiOverride?.group })
                        }, {
                          default: withCtx((_, _push, _parent, _scopeId) => {
                            if (_push) {
                              _push(`<!--[-->`);
                              ssrRenderList(group, (item, index) => {
                                _push(`<!--[-->`);
                                if (item.type === 'label') {
                                  _push(ssrRenderComponent(unref(DropdownMenu).Label, {
                                    "data-slot": "label",
                                    class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                  }, {
                                    default: withCtx((_, _push, _parent, _scopeId) => {
                                      if (_push) {
                                        _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                          item: item,
                                          index: index
                                        }, null, _parent, _scopeId));
                                      } else {
                                        return [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            index: index
                                          }, null, 8, ["item", "index"])
                                        ]
                                      }
                                    }),
                                    _: 2
                                  }, _parent, _scopeId));
                                } else if (item.type === 'separator') {
                                  _push(ssrRenderComponent(unref(DropdownMenu).Separator, {
                                    "data-slot": "separator",
                                    class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                  }, null, _parent, _scopeId));
                                } else if (item?.children?.length) {
                                  _push(ssrRenderComponent(unref(DropdownMenu).Sub, {
                                    open: item.open,
                                    "default-open": item.defaultOpen
                                  }, {
                                    default: withCtx((_, _push, _parent, _scopeId) => {
                                      if (_push) {
                                        _push(ssrRenderComponent(unref(DropdownMenu).SubTrigger, {
                                          as: "button",
                                          type: "button",
                                          disabled: item.disabled,
                                          "text-value": unref(get)(item, props.labelKey),
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                        }, {
                                          default: withCtx((_, _push, _parent, _scopeId) => {
                                            if (_push) {
                                              _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                                item: item,
                                                index: index
                                              }, null, _parent, _scopeId));
                                            } else {
                                              return [
                                                createVNode(unref(ReuseItemTemplate), {
                                                  item: item,
                                                  index: index
                                                }, null, 8, ["item", "index"])
                                              ]
                                            }
                                          }),
                                          _: 2
                                        }, _parent, _scopeId));
                                        _push(ssrRenderComponent(_sfc_main$a, mergeProps({
                                          sub: "",
                                          class: item.ui?.content,
                                          ui: __props.ui,
                                          "ui-override": __props.uiOverride,
                                          portal: __props.portal,
                                          items: item.children,
                                          align: "start",
                                          "align-offset": -4,
                                          "side-offset": 3,
                                          "label-key": __props.labelKey,
                                          "description-key": __props.descriptionKey,
                                          "checked-icon": __props.checkedIcon,
                                          "loading-icon": __props.loadingIcon,
                                          "external-icon": __props.externalIcon,
                                          size: __props.size,
                                          filter: item.filter,
                                          "filter-fields": item.filterFields || __props.filterFields,
                                          "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                        }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                          renderList(getProxySlots(), (_, name) => {
                                            return {
                                              name: name,
                                              fn: withCtx((slotData, _push, _parent, _scopeId) => {
                                                if (_push) {
                                                  ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push, _parent, _scopeId);
                                                } else {
                                                  return [
                                                    renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                  ]
                                                }
                                              })
                                            }
                                          })
                                        ]), _parent, _scopeId));
                                      } else {
                                        return [
                                          createVNode(unref(DropdownMenu).SubTrigger, {
                                            as: "button",
                                            type: "button",
                                            disabled: item.disabled,
                                            "text-value": unref(get)(item, props.labelKey),
                                            "data-slot": "item",
                                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(ReuseItemTemplate), {
                                                item: item,
                                                index: index
                                              }, null, 8, ["item", "index"])
                                            ]),
                                            _: 2
                                          }, 1032, ["disabled", "text-value", "class"]),
                                          createVNode(_sfc_main$a, mergeProps({
                                            sub: "",
                                            class: item.ui?.content,
                                            ui: __props.ui,
                                            "ui-override": __props.uiOverride,
                                            portal: __props.portal,
                                            items: item.children,
                                            align: "start",
                                            "align-offset": -4,
                                            "side-offset": 3,
                                            "label-key": __props.labelKey,
                                            "description-key": __props.descriptionKey,
                                            "checked-icon": __props.checkedIcon,
                                            "loading-icon": __props.loadingIcon,
                                            "external-icon": __props.externalIcon,
                                            size: __props.size,
                                            filter: item.filter,
                                            "filter-fields": item.filterFields || __props.filterFields,
                                            "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                          }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                            renderList(getProxySlots(), (_, name) => {
                                              return {
                                                name: name,
                                                fn: withCtx((slotData) => [
                                                  renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                ])
                                              }
                                            })
                                          ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                        ]
                                      }
                                    }),
                                    _: 2
                                  }, _parent, _scopeId));
                                } else if (item.type === 'checkbox') {
                                  _push(ssrRenderComponent(unref(DropdownMenu).CheckboxItem, {
                                    "model-value": item.checked,
                                    disabled: item.disabled,
                                    "text-value": unref(get)(item, props.labelKey),
                                    "data-slot": "item",
                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                    "onUpdate:modelValue": item.onUpdateChecked,
                                    onSelect: item.onSelect
                                  }, {
                                    default: withCtx((_, _push, _parent, _scopeId) => {
                                      if (_push) {
                                        _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                          item: item,
                                          index: index
                                        }, null, _parent, _scopeId));
                                      } else {
                                        return [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            index: index
                                          }, null, 8, ["item", "index"])
                                        ]
                                      }
                                    }),
                                    _: 2
                                  }, _parent, _scopeId));
                                } else {
                                  _push(ssrRenderComponent(_sfc_main$F, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                    default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
                                      if (_push) {
                                        _push(ssrRenderComponent(unref(DropdownMenu).Item, {
                                          "as-child": "",
                                          disabled: item.disabled,
                                          "text-value": unref(get)(item, props.labelKey),
                                          onSelect: item.onSelect
                                        }, {
                                          default: withCtx((_, _push, _parent, _scopeId) => {
                                            if (_push) {
                                              _push(ssrRenderComponent(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                              }), {
                                                default: withCtx((_, _push, _parent, _scopeId) => {
                                                  if (_push) {
                                                    _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                                      item: item,
                                                      active: active,
                                                      index: index
                                                    }, null, _parent, _scopeId));
                                                  } else {
                                                    return [
                                                      createVNode(unref(ReuseItemTemplate), {
                                                        item: item,
                                                        active: active,
                                                        index: index
                                                      }, null, 8, ["item", "active", "index"])
                                                    ]
                                                  }
                                                }),
                                                _: 2
                                              }, _parent, _scopeId));
                                            } else {
                                              return [
                                                createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                  "data-slot": "item",
                                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                                }), {
                                                  default: withCtx(() => [
                                                    createVNode(unref(ReuseItemTemplate), {
                                                      item: item,
                                                      active: active,
                                                      index: index
                                                    }, null, 8, ["item", "active", "index"])
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]
                                            }
                                          }),
                                          _: 2
                                        }, _parent, _scopeId));
                                      } else {
                                        return [
                                          createVNode(unref(DropdownMenu).Item, {
                                            "as-child": "",
                                            disabled: item.disabled,
                                            "text-value": unref(get)(item, props.labelKey),
                                            onSelect: item.onSelect
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                              }), {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item: item,
                                                    active: active,
                                                    index: index
                                                  }, null, 8, ["item", "active", "index"])
                                                ]),
                                                _: 2
                                              }, 1040, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["disabled", "text-value", "onSelect"])
                                        ]
                                      }
                                    }),
                                    _: 2
                                  }, _parent, _scopeId));
                                }
                                _push(`<!--]-->`);
                              });
                              _push(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                  return (openBlock(), createBlock(Fragment, {
                                    key: `group-${groupIndex}-${index}`
                                  }, [
                                    (item.type === 'label')
                                      ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                          key: 0,
                                          "data-slot": "label",
                                          class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item: item,
                                              index: index
                                            }, null, 8, ["item", "index"])
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]))
                                      : (item.type === 'separator')
                                        ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                            key: 1,
                                            "data-slot": "separator",
                                            class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                          }, null, 8, ["class"]))
                                        : (item?.children?.length)
                                          ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                              key: 2,
                                              open: item.open,
                                              "default-open": item.defaultOpen
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(DropdownMenu).SubTrigger, {
                                                  as: "button",
                                                  type: "button",
                                                  disabled: item.disabled,
                                                  "text-value": unref(get)(item, props.labelKey),
                                                  "data-slot": "item",
                                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(ReuseItemTemplate), {
                                                      item: item,
                                                      index: index
                                                    }, null, 8, ["item", "index"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["disabled", "text-value", "class"]),
                                                createVNode(_sfc_main$a, mergeProps({
                                                  sub: "",
                                                  class: item.ui?.content,
                                                  ui: __props.ui,
                                                  "ui-override": __props.uiOverride,
                                                  portal: __props.portal,
                                                  items: item.children,
                                                  align: "start",
                                                  "align-offset": -4,
                                                  "side-offset": 3,
                                                  "label-key": __props.labelKey,
                                                  "description-key": __props.descriptionKey,
                                                  "checked-icon": __props.checkedIcon,
                                                  "loading-icon": __props.loadingIcon,
                                                  "external-icon": __props.externalIcon,
                                                  size: __props.size,
                                                  filter: item.filter,
                                                  "filter-fields": item.filterFields || __props.filterFields,
                                                  "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                                }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                                  renderList(getProxySlots(), (_, name) => {
                                                    return {
                                                      name: name,
                                                      fn: withCtx((slotData) => [
                                                        renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                      ])
                                                    }
                                                  })
                                                ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                              ]),
                                              _: 2
                                            }, 1032, ["open", "default-open"]))
                                          : (item.type === 'checkbox')
                                            ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                                key: 3,
                                                "model-value": item.checked,
                                                disabled: item.disabled,
                                                "text-value": unref(get)(item, props.labelKey),
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                                "onUpdate:modelValue": item.onUpdateChecked,
                                                onSelect: item.onSelect
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item: item,
                                                    index: index
                                                  }, null, 8, ["item", "index"])
                                                ]),
                                                _: 2
                                              }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                            : (openBlock(), createBlock(_sfc_main$F, mergeProps({
                                                key: 4,
                                                ref_for: true
                                              }, unref(pickLinkProps)(item), { custom: "" }), {
                                                default: withCtx(({ active, ...slotProps }) => [
                                                  createVNode(unref(DropdownMenu).Item, {
                                                    "as-child": "",
                                                    disabled: item.disabled,
                                                    "text-value": unref(get)(item, props.labelKey),
                                                    onSelect: item.onSelect
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                        "data-slot": "item",
                                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                                      }), {
                                                        default: withCtx(() => [
                                                          createVNode(unref(ReuseItemTemplate), {
                                                            item: item,
                                                            active: active,
                                                            index: index
                                                          }, null, 8, ["item", "active", "index"])
                                                        ]),
                                                        _: 2
                                                      }, 1040, ["class"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["disabled", "text-value", "onSelect"])
                                                ]),
                                                _: 2
                                              }, 1040))
                                  ], 64))
                                }), 128))
                              ]
                            }
                          }),
                          _: 2
                        }, _parent, _scopeId));
                      });
                      _push(`<!--]--></div>`);
                    } else {
                      _push(`<!---->`);
                    }
                    if (searchTerm.value && !hasFilteredItems.value) {
                      _push(`<div data-slot="empty" class="${
                        ssrRenderClass(__props.ui.empty({ class: __props.uiOverride?.empty }))
                      }"${
                        _scopeId
                      }>`);
                      ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                        _push(`${ssrInterpolate(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value }))}`);
                      }, _push, _parent, _scopeId);
                      _push(`</div>`);
                    } else {
                      _push(`<!---->`);
                    }
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
                    ssrRenderSlot(_ctx.$slots, "content-bottom", {
                      sub: __props.sub ?? false
                    }, null, _push, _parent, _scopeId);
                  } else {
                    return [
                      (!!__props.filter)
                        ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
                            key: 0,
                            modelValue: searchTerm.value,
                            "onUpdate:modelValue": $event => ((searchTerm).value = $event),
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$e, mergeProps({
                                autofocus: "",
                                autocomplete: "off",
                                size: __props.size
                              }, inputProps.value, {
                                "data-slot": "input",
                                class: __props.ui.input({ class: __props.uiOverride?.input }),
                                onChange: withModifiers(() => {}, ["stop"])
                              }), null, 16, ["size", "class", "onChange"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]))
                        : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content-top", {
                        sub: __props.sub ?? false
                      }),
                      (!searchTerm.value || hasFilteredItems.value)
                        ? (openBlock(), createBlock("div", {
                            key: 1,
                            role: "presentation",
                            "data-slot": "viewport",
                            class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                              return (openBlock(), createBlock(unref(DropdownMenu).Group, {
                                key: `group-${groupIndex}`,
                                "data-slot": "group",
                                class: __props.ui.group({ class: __props.uiOverride?.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                    return (openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      (item.type === 'label')
                                        ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                            key: 0,
                                            "data-slot": "label",
                                            class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(ReuseItemTemplate), {
                                                item: item,
                                                index: index
                                              }, null, 8, ["item", "index"])
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]))
                                        : (item.type === 'separator')
                                          ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                              key: 1,
                                              "data-slot": "separator",
                                              class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                            }, null, 8, ["class"]))
                                          : (item?.children?.length)
                                            ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                                key: 2,
                                                open: item.open,
                                                "default-open": item.defaultOpen
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(DropdownMenu).SubTrigger, {
                                                    as: "button",
                                                    type: "button",
                                                    disabled: item.disabled,
                                                    "text-value": unref(get)(item, props.labelKey),
                                                    "data-slot": "item",
                                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(ReuseItemTemplate), {
                                                        item: item,
                                                        index: index
                                                      }, null, 8, ["item", "index"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["disabled", "text-value", "class"]),
                                                  createVNode(_sfc_main$a, mergeProps({
                                                    sub: "",
                                                    class: item.ui?.content,
                                                    ui: __props.ui,
                                                    "ui-override": __props.uiOverride,
                                                    portal: __props.portal,
                                                    items: item.children,
                                                    align: "start",
                                                    "align-offset": -4,
                                                    "side-offset": 3,
                                                    "label-key": __props.labelKey,
                                                    "description-key": __props.descriptionKey,
                                                    "checked-icon": __props.checkedIcon,
                                                    "loading-icon": __props.loadingIcon,
                                                    "external-icon": __props.externalIcon,
                                                    size: __props.size,
                                                    filter: item.filter,
                                                    "filter-fields": item.filterFields || __props.filterFields,
                                                    "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                                  }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                                    renderList(getProxySlots(), (_, name) => {
                                                      return {
                                                        name: name,
                                                        fn: withCtx((slotData) => [
                                                          renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                        ])
                                                      }
                                                    })
                                                  ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                                ]),
                                                _: 2
                                              }, 1032, ["open", "default-open"]))
                                            : (item.type === 'checkbox')
                                              ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                                  key: 3,
                                                  "model-value": item.checked,
                                                  disabled: item.disabled,
                                                  "text-value": unref(get)(item, props.labelKey),
                                                  "data-slot": "item",
                                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                                  "onUpdate:modelValue": item.onUpdateChecked,
                                                  onSelect: item.onSelect
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(ReuseItemTemplate), {
                                                      item: item,
                                                      index: index
                                                    }, null, 8, ["item", "index"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                              : (openBlock(), createBlock(_sfc_main$F, mergeProps({
                                                  key: 4,
                                                  ref_for: true
                                                }, unref(pickLinkProps)(item), { custom: "" }), {
                                                  default: withCtx(({ active, ...slotProps }) => [
                                                    createVNode(unref(DropdownMenu).Item, {
                                                      "as-child": "",
                                                      disabled: item.disabled,
                                                      "text-value": unref(get)(item, props.labelKey),
                                                      onSelect: item.onSelect
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                          "data-slot": "item",
                                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                                        }), {
                                                          default: withCtx(() => [
                                                            createVNode(unref(ReuseItemTemplate), {
                                                              item: item,
                                                              active: active,
                                                              index: index
                                                            }, null, 8, ["item", "active", "index"])
                                                          ]),
                                                          _: 2
                                                        }, 1040, ["class"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["disabled", "text-value", "onSelect"])
                                                  ]),
                                                  _: 2
                                                }, 1040))
                                    ], 64))
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]))
                            }), 128))
                          ], 2))
                        : createCommentVNode("", true),
                      (searchTerm.value && !hasFilteredItems.value)
                        ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "empty",
                            class: __props.ui.empty({ class: __props.uiOverride?.empty })
                          }, [
                            renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)
                            ])
                          ], 2))
                        : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "default"),
                      renderSlot(_ctx.$slots, "content-bottom", {
                        sub: __props.sub ?? false
                      })
                    ]
                  }
                }),
                _: 3
              }), _parent, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
                  "data-slot": "content",
                  class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
                }, unref(contentProps)), {
                  default: withCtx(() => [
                    (!!__props.filter)
                      ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
                          key: 0,
                          modelValue: searchTerm.value,
                          "onUpdate:modelValue": $event => ((searchTerm).value = $event),
                          "as-child": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$e, mergeProps({
                              autofocus: "",
                              autocomplete: "off",
                              size: __props.size
                            }, inputProps.value, {
                              "data-slot": "input",
                              class: __props.ui.input({ class: __props.uiOverride?.input }),
                              onChange: withModifiers(() => {}, ["stop"])
                            }), null, 16, ["size", "class", "onChange"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]))
                      : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "content-top", {
                      sub: __props.sub ?? false
                    }),
                    (!searchTerm.value || hasFilteredItems.value)
                      ? (openBlock(), createBlock("div", {
                          key: 1,
                          role: "presentation",
                          "data-slot": "viewport",
                          class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                            return (openBlock(), createBlock(unref(DropdownMenu).Group, {
                              key: `group-${groupIndex}`,
                              "data-slot": "group",
                              class: __props.ui.group({ class: __props.uiOverride?.group })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                  return (openBlock(), createBlock(Fragment, {
                                    key: `group-${groupIndex}-${index}`
                                  }, [
                                    (item.type === 'label')
                                      ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                          key: 0,
                                          "data-slot": "label",
                                          class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item: item,
                                              index: index
                                            }, null, 8, ["item", "index"])
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]))
                                      : (item.type === 'separator')
                                        ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                            key: 1,
                                            "data-slot": "separator",
                                            class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                          }, null, 8, ["class"]))
                                        : (item?.children?.length)
                                          ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                              key: 2,
                                              open: item.open,
                                              "default-open": item.defaultOpen
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(DropdownMenu).SubTrigger, {
                                                  as: "button",
                                                  type: "button",
                                                  disabled: item.disabled,
                                                  "text-value": unref(get)(item, props.labelKey),
                                                  "data-slot": "item",
                                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(ReuseItemTemplate), {
                                                      item: item,
                                                      index: index
                                                    }, null, 8, ["item", "index"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["disabled", "text-value", "class"]),
                                                createVNode(_sfc_main$a, mergeProps({
                                                  sub: "",
                                                  class: item.ui?.content,
                                                  ui: __props.ui,
                                                  "ui-override": __props.uiOverride,
                                                  portal: __props.portal,
                                                  items: item.children,
                                                  align: "start",
                                                  "align-offset": -4,
                                                  "side-offset": 3,
                                                  "label-key": __props.labelKey,
                                                  "description-key": __props.descriptionKey,
                                                  "checked-icon": __props.checkedIcon,
                                                  "loading-icon": __props.loadingIcon,
                                                  "external-icon": __props.externalIcon,
                                                  size: __props.size,
                                                  filter: item.filter,
                                                  "filter-fields": item.filterFields || __props.filterFields,
                                                  "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                                }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                                  renderList(getProxySlots(), (_, name) => {
                                                    return {
                                                      name: name,
                                                      fn: withCtx((slotData) => [
                                                        renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                      ])
                                                    }
                                                  })
                                                ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                              ]),
                                              _: 2
                                            }, 1032, ["open", "default-open"]))
                                          : (item.type === 'checkbox')
                                            ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                                key: 3,
                                                "model-value": item.checked,
                                                disabled: item.disabled,
                                                "text-value": unref(get)(item, props.labelKey),
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                                "onUpdate:modelValue": item.onUpdateChecked,
                                                onSelect: item.onSelect
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item: item,
                                                    index: index
                                                  }, null, 8, ["item", "index"])
                                                ]),
                                                _: 2
                                              }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                            : (openBlock(), createBlock(_sfc_main$F, mergeProps({
                                                key: 4,
                                                ref_for: true
                                              }, unref(pickLinkProps)(item), { custom: "" }), {
                                                default: withCtx(({ active, ...slotProps }) => [
                                                  createVNode(unref(DropdownMenu).Item, {
                                                    "as-child": "",
                                                    disabled: item.disabled,
                                                    "text-value": unref(get)(item, props.labelKey),
                                                    onSelect: item.onSelect
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                        "data-slot": "item",
                                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                                      }), {
                                                        default: withCtx(() => [
                                                          createVNode(unref(ReuseItemTemplate), {
                                                            item: item,
                                                            active: active,
                                                            index: index
                                                          }, null, 8, ["item", "active", "index"])
                                                        ]),
                                                        _: 2
                                                      }, 1040, ["class"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["disabled", "text-value", "onSelect"])
                                                ]),
                                                _: 2
                                              }, 1040))
                                  ], 64))
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]))
                          }), 128))
                        ], 2))
                      : createCommentVNode("", true),
                    (searchTerm.value && !hasFilteredItems.value)
                      ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "empty",
                          class: __props.ui.empty({ class: __props.uiOverride?.empty })
                        }, [
                          renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                            createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)
                          ])
                        ], 2))
                      : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "default"),
                    renderSlot(_ctx.$slots, "content-bottom", {
                      sub: __props.sub ?? false
                    })
                  ]),
                  _: 3
                }, 16, ["class"]))
              ]
            }
          }),
          _: 3
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(unref(FieldGroupReset), null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
                "data-slot": "content",
                class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
              }, unref(contentProps)), {
                default: withCtx(() => [
                  (!!__props.filter)
                    ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
                        key: 0,
                        modelValue: searchTerm.value,
                        "onUpdate:modelValue": $event => ((searchTerm).value = $event),
                        "as-child": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$e, mergeProps({
                            autofocus: "",
                            autocomplete: "off",
                            size: __props.size
                          }, inputProps.value, {
                            "data-slot": "input",
                            class: __props.ui.input({ class: __props.uiOverride?.input }),
                            onChange: withModifiers(() => {}, ["stop"])
                          }), null, 16, ["size", "class", "onChange"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]))
                    : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "content-top", {
                    sub: __props.sub ?? false
                  }),
                  (!searchTerm.value || hasFilteredItems.value)
                    ? (openBlock(), createBlock("div", {
                        key: 1,
                        role: "presentation",
                        "data-slot": "viewport",
                        class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                          return (openBlock(), createBlock(unref(DropdownMenu).Group, {
                            key: `group-${groupIndex}`,
                            "data-slot": "group",
                            class: __props.ui.group({ class: __props.uiOverride?.group })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                return (openBlock(), createBlock(Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  (item.type === 'label')
                                    ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                        key: 0,
                                        "data-slot": "label",
                                        class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            index: index
                                          }, null, 8, ["item", "index"])
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]))
                                    : (item.type === 'separator')
                                      ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                          key: 1,
                                          "data-slot": "separator",
                                          class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                        }, null, 8, ["class"]))
                                      : (item?.children?.length)
                                        ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                            key: 2,
                                            open: item.open,
                                            "default-open": item.defaultOpen
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(DropdownMenu).SubTrigger, {
                                                as: "button",
                                                type: "button",
                                                disabled: item.disabled,
                                                "text-value": unref(get)(item, props.labelKey),
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item: item,
                                                    index: index
                                                  }, null, 8, ["item", "index"])
                                                ]),
                                                _: 2
                                              }, 1032, ["disabled", "text-value", "class"]),
                                              createVNode(_sfc_main$a, mergeProps({
                                                sub: "",
                                                class: item.ui?.content,
                                                ui: __props.ui,
                                                "ui-override": __props.uiOverride,
                                                portal: __props.portal,
                                                items: item.children,
                                                align: "start",
                                                "align-offset": -4,
                                                "side-offset": 3,
                                                "label-key": __props.labelKey,
                                                "description-key": __props.descriptionKey,
                                                "checked-icon": __props.checkedIcon,
                                                "loading-icon": __props.loadingIcon,
                                                "external-icon": __props.externalIcon,
                                                size: __props.size,
                                                filter: item.filter,
                                                "filter-fields": item.filterFields || __props.filterFields,
                                                "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                              }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                                renderList(getProxySlots(), (_, name) => {
                                                  return {
                                                    name: name,
                                                    fn: withCtx((slotData) => [
                                                      renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                    ])
                                                  }
                                                })
                                              ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                            ]),
                                            _: 2
                                          }, 1032, ["open", "default-open"]))
                                        : (item.type === 'checkbox')
                                          ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                              key: 3,
                                              "model-value": item.checked,
                                              disabled: item.disabled,
                                              "text-value": unref(get)(item, props.labelKey),
                                              "data-slot": "item",
                                              class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                              "onUpdate:modelValue": item.onUpdateChecked,
                                              onSelect: item.onSelect
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(ReuseItemTemplate), {
                                                  item: item,
                                                  index: index
                                                }, null, 8, ["item", "index"])
                                              ]),
                                              _: 2
                                            }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                          : (openBlock(), createBlock(_sfc_main$F, mergeProps({
                                              key: 4,
                                              ref_for: true
                                            }, unref(pickLinkProps)(item), { custom: "" }), {
                                              default: withCtx(({ active, ...slotProps }) => [
                                                createVNode(unref(DropdownMenu).Item, {
                                                  "as-child": "",
                                                  disabled: item.disabled,
                                                  "text-value": unref(get)(item, props.labelKey),
                                                  onSelect: item.onSelect
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$G, mergeProps({ ref_for: true }, slotProps, {
                                                      "data-slot": "item",
                                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                                    }), {
                                                      default: withCtx(() => [
                                                        createVNode(unref(ReuseItemTemplate), {
                                                          item: item,
                                                          active: active,
                                                          index: index
                                                        }, null, 8, ["item", "active", "index"])
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["disabled", "text-value", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040))
                                ], 64))
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"]))
                        }), 128))
                      ], 2))
                    : createCommentVNode("", true),
                  (searchTerm.value && !hasFilteredItems.value)
                    ? (openBlock(), createBlock("div", {
                        key: 2,
                        "data-slot": "empty",
                        class: __props.ui.empty({ class: __props.uiOverride?.empty })
                      }, [
                        renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                          createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)
                        ])
                      ], 2))
                    : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "default"),
                  renderSlot(_ctx.$slots, "content-bottom", {
                    sub: __props.sub ?? false
                  })
                ]),
                _: 3
              }, 16, ["class"]))
            ]),
            _: 3
          })
        ]
      }
    }),
    _: 3
  }, _parent));
  _push(`<!--]-->`);
}
}

};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : undefined
};

const theme$4 = {
  "slots": {
    "content": "min-w-32 max-h-(--reka-dropdown-menu-content-available-height) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "input": "border-b border-default",
    "empty": "text-center text-muted",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-bg stroke-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
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
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "empty": "p-2 text-xs",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "empty": "p-2.5 text-xs",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "empty": "p-2.5 text-sm",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "empty": "p-3 text-sm",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "empty": "p-3 text-base",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};

const _sfc_main$9 = {
  __name: "UDropdownMenu",
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  size: { type: null, required: false },
  items: { type: null, required: false },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  filter: { type: [Boolean, Object], required: false, default: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true }
}, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {},
  }),
  emits: /*@__PURE__*/mergeModels(["update:open"], ["update:searchTerm"]),
  setup(__props, { emit: __emit }) {

const _props = __props;
const emits = __emit;
const slots = useSlots();
const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
const props = useComponentProps("dropdownMenu", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "defaultOpen", "open", "modal"), emits);
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const getProxySlots = () => omit(slots, ["default"]);
const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.dropdownMenu || {} })({
  size: props.size
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(DropdownMenuRoot_default), mergeProps(unref(rootProps), _attrs), {
    default: withCtx(({ open }, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.default) {
          _push(ssrRenderComponent(unref(DropdownMenuTrigger_default), {
            "as-child": "",
            class: unref(props).class,
            disabled: unref(props).disabled
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "default", { open: open }, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$a, mergeProps({
          "search-term": searchTerm.value,
          "onUpdate:searchTerm": $event => ((searchTerm).value = $event),
          class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] }),
          ui: ui.value,
          "ui-override": unref(props).ui
        }, contentProps.value, {
          items: unref(props).items,
          portal: unref(props).portal,
          "label-key": unref(props).labelKey,
          "description-key": unref(props).descriptionKey,
          "checked-icon": unref(props).checkedIcon,
          "loading-icon": unref(props).loadingIcon,
          "external-icon": unref(props).externalIcon,
          size: unref(props).size,
          filter: unref(props).filter,
          "filter-fields": unref(props).filterFields,
          "ignore-filter": unref(props).ignoreFilter
        }), createSlots({
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (!!unref(props).arrow) {
                _push(ssrRenderComponent(unref(DropdownMenuArrow_default), mergeProps(arrowProps.value, {
                  "data-slot": "arrow",
                  class: ui.value.arrow({ class: unref(props).ui?.arrow })
                }), null, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
            } else {
              return [
                (!!unref(props).arrow)
                  ? (openBlock(), createBlock(unref(DropdownMenuArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: unref(props).ui?.arrow })
                    }), null, 16, ["class"]))
                  : createCommentVNode("", true)
              ]
            }
          }),
          _: 2
        }, [
          renderList(getProxySlots(), (_, name) => {
            return {
              name: name,
              fn: withCtx((slotData, _push, _parent, _scopeId) => {
                if (_push) {
                  ssrRenderSlot(_ctx.$slots, name, slotData, null, _push, _parent, _scopeId);
                } else {
                  return [
                    renderSlot(_ctx.$slots, name, slotData)
                  ]
                }
              })
            }
          })
        ]), _parent, _scopeId));
      } else {
        return [
          (!!slots.default)
            ? (openBlock(), createBlock(unref(DropdownMenuTrigger_default), {
                key: 0,
                "as-child": "",
                class: unref(props).class,
                disabled: unref(props).disabled
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]),
                _: 2
              }, 1032, ["class", "disabled"]))
            : createCommentVNode("", true),
          createVNode(_sfc_main$a, mergeProps({
            "search-term": searchTerm.value,
            "onUpdate:searchTerm": $event => ((searchTerm).value = $event),
            class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] }),
            ui: ui.value,
            "ui-override": unref(props).ui
          }, contentProps.value, {
            items: unref(props).items,
            portal: unref(props).portal,
            "label-key": unref(props).labelKey,
            "description-key": unref(props).descriptionKey,
            "checked-icon": unref(props).checkedIcon,
            "loading-icon": unref(props).loadingIcon,
            "external-icon": unref(props).externalIcon,
            size: unref(props).size,
            filter: unref(props).filter,
            "filter-fields": unref(props).filterFields,
            "ignore-filter": unref(props).ignoreFilter
          }), createSlots({
            default: withCtx(() => [
              (!!unref(props).arrow)
                ? (openBlock(), createBlock(unref(DropdownMenuArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                    "data-slot": "arrow",
                    class: ui.value.arrow({ class: unref(props).ui?.arrow })
                  }), null, 16, ["class"]))
                : createCommentVNode("", true)
            ]),
            _: 2
          }, [
            renderList(getProxySlots(), (_, name) => {
              return {
                name: name,
                fn: withCtx((slotData) => [
                  renderSlot(_ctx.$slots, name, slotData)
                ])
              }
            })
          ]), 1040, ["search-term", "onUpdate:searchTerm", "class", "ui", "ui-override", "items", "portal", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : undefined
};

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DocsPageHeaderLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const toast = useToast();
    const appBaseURL = useRuntimeConfig().app?.baseURL || "/";
    const { copy, copied } = useClipboard();
    const { t } = useDocusI18n();
    const markdownLink = computed(() => `${ void 0}${appBaseURL}raw${route.path}.md`);
    const items = [
      [
        {
          label: t("docs.copy.link"),
          icon: "i-lucide-link",
          onSelect() {
            copy(markdownLink.value);
          }
        },
        {
          label: t("docs.copy.view"),
          icon: "i-simple-icons:markdown",
          target: "_blank",
          to: markdownLink.value
        },
        {
          label: t("docs.copy.gpt"),
          icon: "i-simple-icons:openai",
          target: "_blank",
          to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`
        },
        {
          label: t("docs.copy.claude"),
          icon: "i-simple-icons:anthropic",
          target: "_blank",
          to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`
        }
      ],
      [
        {
          label: "Copy MCP Server URL",
          icon: "i-lucide-link",
          onSelect() {
            copy(`${ void 0}${appBaseURL}mcp`);
            toast.add({
              title: "Copied to clipboard",
              icon: "i-lucide-check-circle"
            });
          }
        },
        {
          label: "Add MCP Server",
          icon: "i-simple-icons:cursor",
          target: "_blank",
          to: `/mcp/deeplink`
        }
      ]
    ];
    async function copyPage() {
      const page = await $fetch(`/raw${route.path}.md`);
      copy(page);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFieldGroup = _sfc_main$b;
      const _component_UButton = _sfc_main$E;
      const _component_UDropdownMenu = _sfc_main$9;
      _push(ssrRenderComponent(_component_UFieldGroup, mergeProps({ size: "sm" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: unref(t)("docs.copy.page"),
              icon: unref(copied) ? "i-lucide-check" : "i-lucide-copy",
              color: "neutral",
              variant: "soft",
              ui: {
                leadingIcon: "text-neutral size-3.5"
              },
              onClick: copyPage
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UDropdownMenu, {
              size: "sm",
              items,
              content: {
                align: "end",
                side: "bottom",
                sideOffset: 8
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    icon: "i-lucide-chevron-down",
                    color: "neutral",
                    variant: "soft",
                    class: "border-l border-muted"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      icon: "i-lucide-chevron-down",
                      color: "neutral",
                      variant: "soft",
                      class: "border-l border-muted"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: unref(t)("docs.copy.page"),
                icon: unref(copied) ? "i-lucide-check" : "i-lucide-copy",
                color: "neutral",
                variant: "soft",
                ui: {
                  leadingIcon: "text-neutral size-3.5"
                },
                onClick: copyPage
              }, null, 8, ["label", "icon"]),
              createVNode(_component_UDropdownMenu, {
                size: "sm",
                items,
                content: {
                  align: "end",
                  side: "bottom",
                  sideOffset: 8
                }
              }, {
                default: withCtx(() => [
                  createVNode(_component_UButton, {
                    icon: "i-lucide-chevron-down",
                    color: "neutral",
                    variant: "soft",
                    class: "border-l border-muted"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/docs/DocsPageHeaderLinks.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$8, { __name: "DocsPageHeaderLinks" });

const theme$3 = {
  "base": "mt-8 pb-24 space-y-12"
};

const _sfc_main$7 = {
  __name: "UPageBody",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;

const props = useComponentProps("pageBody", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.pageBody || {} }));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
  }, _attrs), {
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
}

};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageBody.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : undefined
};

const theme$2 = {
  "slots": {
    "root": "grid grid-cols-1 sm:grid-cols-2 gap-8",
    "link": [
      "group block px-6 py-8 rounded-lg border border-default hover:bg-elevated/50 focus-visible:outline-primary",
      "transition-colors"
    ],
    "linkLeading": [
      "inline-flex items-center rounded-full p-1.5 bg-elevated group-hover:bg-primary/10 ring ring-accented mb-4 group-hover:ring-primary/50",
      "transition"
    ],
    "linkLeadingIcon": [
      "size-5 shrink-0 text-highlighted group-hover:text-primary",
      "transition-[color,translate]"
    ],
    "linkTitle": "font-medium text-[15px] text-highlighted mb-1 truncate",
    "linkDescription": "text-sm text-muted line-clamp-2"
  },
  "variants": {
    "direction": {
      "left": {
        "linkLeadingIcon": [
          "group-active:-translate-x-0.5"
        ]
      },
      "right": {
        "link": "text-end",
        "linkLeadingIcon": [
          "group-active:translate-x-0.5"
        ]
      }
    }
  }
};

const _sfc_main$6 = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: "UContentSurround",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  prevIcon: { type: null, required: false },
  nextIcon: { type: null, required: false },
  surround: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {


const _props = __props;

const props = useComponentProps("contentSurround", _props);
const { dir } = useLocale();
const appConfig = useAppConfig();
const prefix = usePrefix();
const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate({
  props: {
    link: Object,
    icon: String,
    direction: String
  }
});
const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.contentSurround || {} })());
const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(unref(DefineLinkTemplate), null, {
    default: withCtx(({ link, icon, direction }, _push, _parent, _scopeId) => {
      if (_push) {
        if (link) {
          _push(ssrRenderComponent(_sfc_main$F, {
            to: link.path,
            raw: "",
            "data-slot": "link",
            class: ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], direction })
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "link", {
                  link: link,
                  ui: ui.value
                }, () => {
                  _push(`<div data-slot="linkLeading" class="${
                    ssrRenderClass(ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading] }))
                  }"${
                    _scopeId
                  }>`);
                  ssrRenderSlot(_ctx.$slots, "link-leading", {
                    link: link,
                    ui: ui.value
                  }, () => {
                    _push(ssrRenderComponent(_sfc_main$K, {
                      name: link.icon || icon,
                      "data-slot": "linkLeadingIcon",
                      class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], direction })
                    }, null, _parent, _scopeId));
                  }, _push, _parent, _scopeId);
                  _push(`</div><p data-slot="linkTitle" class="${
                    ssrRenderClass(ui.value.linkTitle({ class: [unref(props).ui?.linkTitle, link.ui?.linkTitle] }))
                  }"${
                    _scopeId
                  }>`);
                  ssrRenderSlot(_ctx.$slots, "link-title", {
                    link: link,
                    ui: ui.value
                  }, () => {
                    _push(`${ssrInterpolate(link.title)}`);
                  }, _push, _parent, _scopeId);
                  _push(`</p><p data-slot="linkDescription" class="${
                    ssrRenderClass(ui.value.linkDescription({ class: [unref(props).ui?.linkDescription, link.ui?.linkDescription] }))
                  }"${
                    _scopeId
                  }>`);
                  ssrRenderSlot(_ctx.$slots, "link-description", {
                    link: link,
                    ui: ui.value
                  }, () => {
                    _push(`${ssrInterpolate(link.description)}`);
                  }, _push, _parent, _scopeId);
                  _push(`</p>`);
                }, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "link", {
                    link: link,
                    ui: ui.value
                  }, () => [
                    createVNode("div", {
                      "data-slot": "linkLeading",
                      class: ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading] })
                    }, [
                      renderSlot(_ctx.$slots, "link-leading", {
                        link: link,
                        ui: ui.value
                      }, () => [
                        createVNode(_sfc_main$K, {
                          name: link.icon || icon,
                          "data-slot": "linkLeadingIcon",
                          class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], direction })
                        }, null, 8, ["name", "class"])
                      ])
                    ], 2),
                    createVNode("p", {
                      "data-slot": "linkTitle",
                      class: ui.value.linkTitle({ class: [unref(props).ui?.linkTitle, link.ui?.linkTitle] })
                    }, [
                      renderSlot(_ctx.$slots, "link-title", {
                        link: link,
                        ui: ui.value
                      }, () => [
                        createTextVNode(toDisplayString(link.title), 1)
                      ])
                    ], 2),
                    createVNode("p", {
                      "data-slot": "linkDescription",
                      class: ui.value.linkDescription({ class: [unref(props).ui?.linkDescription, link.ui?.linkDescription] })
                    }, [
                      renderSlot(_ctx.$slots, "link-description", {
                        link: link,
                        ui: ui.value
                      }, () => [
                        createTextVNode(toDisplayString(link.description), 1)
                      ])
                    ], 2)
                  ])
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
        } else {
          _push(`<span class="${
            ssrRenderClass(unref(prefix)('hidden sm:block'))
          }"${
            _scopeId
          }> </span>`);
        }
      } else {
        return [
          link
            ? (openBlock(), createBlock(_sfc_main$F, {
                key: 0,
                to: link.path,
                raw: "",
                "data-slot": "link",
                class: ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], direction })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "link", {
                    link: link,
                    ui: ui.value
                  }, () => [
                    createVNode("div", {
                      "data-slot": "linkLeading",
                      class: ui.value.linkLeading({ class: [unref(props).ui?.linkLeading, link.ui?.linkLeading] })
                    }, [
                      renderSlot(_ctx.$slots, "link-leading", {
                        link: link,
                        ui: ui.value
                      }, () => [
                        createVNode(_sfc_main$K, {
                          name: link.icon || icon,
                          "data-slot": "linkLeadingIcon",
                          class: ui.value.linkLeadingIcon({ class: [unref(props).ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], direction })
                        }, null, 8, ["name", "class"])
                      ])
                    ], 2),
                    createVNode("p", {
                      "data-slot": "linkTitle",
                      class: ui.value.linkTitle({ class: [unref(props).ui?.linkTitle, link.ui?.linkTitle] })
                    }, [
                      renderSlot(_ctx.$slots, "link-title", {
                        link: link,
                        ui: ui.value
                      }, () => [
                        createTextVNode(toDisplayString(link.title), 1)
                      ])
                    ], 2),
                    createVNode("p", {
                      "data-slot": "linkDescription",
                      class: ui.value.linkDescription({ class: [unref(props).ui?.linkDescription, link.ui?.linkDescription] })
                    }, [
                      renderSlot(_ctx.$slots, "link-description", {
                        link: link,
                        ui: ui.value
                      }, () => [
                        createTextVNode(toDisplayString(link.description), 1)
                      ])
                    ], 2)
                  ])
                ]),
                _: 2
              }, 1032, ["to", "class"]))
            : (openBlock(), createBlock("span", {
                key: 1,
                class: unref(prefix)('hidden sm:block')
              }, " ", 2))
        ]
      }
    }),
    _: 3
  }, _parent));
  if (unref(props).surround) {
    _push(ssrRenderComponent(unref(Primitive), mergeProps({
      as: unref(props).as
    }, _ctx.$attrs, {
      "data-slot": "root",
      class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
    }), {
      default: withCtx((_, _push, _parent, _scopeId) => {
        if (_push) {
          _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
            link: unref(props).surround[0],
            icon: prevIcon.value,
            direction: "left"
          }, null, _parent, _scopeId));
          _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
            link: unref(props).surround[1],
            icon: nextIcon.value,
            direction: "right"
          }, null, _parent, _scopeId));
        } else {
          return [
            createVNode(unref(ReuseLinkTemplate), {
              link: unref(props).surround[0],
              icon: prevIcon.value,
              direction: "left"
            }, null, 8, ["link", "icon"]),
            createVNode(unref(ReuseLinkTemplate), {
              link: unref(props).surround[1],
              icon: nextIcon.value,
              direction: "right"
            }, null, 8, ["link", "icon"])
          ]
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
}

});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/content/ContentSurround.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined
};

function useScrollspy() {
  const observer = ref();
  const visibleHeadings = ref([]);
  const activeHeadings = ref([]);
  function updateHeadings(headings) {
    headings.forEach((heading) => {
      if (!observer.value) {
        return;
      }
      observer.value.observe(heading);
    });
  }
  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0) {
      activeHeadings.value = oldVal;
    } else {
      activeHeadings.value = val;
    }
  });
  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings
  };
}

const theme$1 = {
  "slots": {
    "root": "sticky top-(--ui-header-height) z-10 bg-default/75 lg:bg-[initial] backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6 lg:ms-0 overflow-y-auto max-h-[calc(100vh-var(--ui-header-height))]",
    "container": "pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b border-dashed border-default lg:border-0 flex flex-col",
    "top": "",
    "bottom": "hidden lg:flex lg:flex-col gap-6",
    "trigger": "group text-sm font-semibold flex-1 flex items-center gap-1.5 py-1.5 -mt-1.5 focus-visible:outline-primary",
    "title": "truncate",
    "trailing": "ms-auto inline-flex gap-1.5 items-center",
    "trailingIcon": "size-5 transform transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180 lg:hidden",
    "content": "relative data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden focus:outline-none",
    "list": "min-w-0",
    "listWithChildren": "ms-3",
    "item": "min-w-0",
    "itemWithChildren": "",
    "link": "group relative text-sm flex items-center focus-visible:outline-primary py-1",
    "linkText": "truncate",
    "indicator": "",
    "indicatorLine": "",
    "indicatorActive": ""
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
    "highlightColor": {
      "primary": {
        "indicatorActive": "bg-primary"
      },
      "secondary": {
        "indicatorActive": "bg-secondary"
      },
      "success": {
        "indicatorActive": "bg-success"
      },
      "info": {
        "indicatorActive": "bg-info"
      },
      "warning": {
        "indicatorActive": "bg-warning"
      },
      "error": {
        "indicatorActive": "bg-error"
      },
      "neutral": {
        "indicatorActive": "bg-inverted"
      }
    },
    "active": {
      "false": {
        "link": [
          "text-muted hover:text-default",
          "transition-colors"
        ]
      }
    },
    "highlight": {
      "true": ""
    },
    "highlightVariant": {
      "straight": "",
      "circuit": ""
    },
    "body": {
      "true": {
        "bottom": "mt-6"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": true,
      "class": {
        "link": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "link": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "link": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "link": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "link": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "link": "text-error"
      }
    },
    {
      "color": "neutral",
      "active": true,
      "class": {
        "link": "text-highlighted"
      }
    },
    {
      "highlight": true,
      "highlightVariant": "straight",
      "class": {
        "list": "ms-2.5 ps-4 border-s border-default",
        "item": "-ms-px",
        "indicator": "absolute ms-2.5 transition-[translate,height] duration-200 h-(--indicator-size) translate-y-(--indicator-position) w-px rounded-full",
        "indicatorLine": "hidden",
        "indicatorActive": "w-full h-full"
      }
    },
    {
      "highlight": true,
      "highlightVariant": "circuit",
      "class": {
        "list": "ps-6.5",
        "item": "-ms-px",
        "itemWithChildren": "ps-px",
        "indicator": "absolute ms-2.5 start-0 top-0 rtl:-scale-x-100",
        "indicatorLine": "absolute inset-0 bg-(--ui-border)",
        "indicatorActive": "absolute w-full h-(--indicator-size) translate-y-(--indicator-position) transition-[translate,height] duration-200 ease-out"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "highlightColor": "primary",
    "highlightVariant": "straight"
  }
};

const _sfc_main$5 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UContentToc",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "nav" },
    trailingIcon: { type: null, required: false },
    title: { type: String, required: false },
    color: { type: null, required: false },
    highlight: { type: Boolean, required: false },
    highlightColor: { type: null, required: false },
    highlightVariant: { type: null, required: false },
    links: { type: Array, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false }
  },
  emits: ["update:open", "move"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = useSlots();
    const props = useComponentProps("contentToc", _props);
    const rootProps = useForwardProps(reactivePick(props, "as", "open", "defaultOpen"), emits);
    const { t } = useLocale();
    const router = useRouter();
    const appConfig = useAppConfig();
    const { activeHeadings, updateHeadings } = useScrollspy();
    const prefix = usePrefix();
    const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate({
      props: {
        links: Array,
        level: Number
      }
    });
    const [DefineTriggerTemplate, ReuseTriggerTemplate] = createReusableTemplate();
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.contentToc || {} })({
      color: props.color,
      highlight: props.highlight,
      highlightVariant: props.highlightVariant,
      highlightColor: props.highlightColor || props.color
    }));
    function scrollToHeading(id) {
      const encodedId = encodeURIComponent(id);
      router.push(`#${encodedId}`);
      emits("move", id);
    }
    function flattenLinks(links) {
      return links.flatMap((link) => [link, ...link.children ? flattenLinks(link.children) : []]);
    }
    function flattenLinksWithLevel(links, level = 0) {
      return links.flatMap((link) => [
        { link, level },
        ...link.children ? flattenLinksWithLevel(link.children, level + 1) : []
      ]);
    }
    const linkHeight = 1.75;
    const indicatorStyle = computed(() => {
      if (!activeHeadings.value?.length) {
        return;
      }
      const flatLinks = flattenLinks(props.links || []);
      const activeIndex = flatLinks.findIndex((link) => activeHeadings.value.includes(link.id));
      return {
        "--indicator-size": `${linkHeight * activeHeadings.value.length}rem`,
        "--indicator-position": activeIndex >= 0 ? `${activeIndex * linkHeight}rem` : "0rem"
      };
    });
    const circuitMaskStyle = computed(() => {
      if (!props.highlight || props.highlightVariant !== "circuit" || !props.links?.length) {
        return;
      }
      const flatLinks = flattenLinksWithLevel(props.links);
      const svgUnit = 16;
      const svgLinkHeight = linkHeight * svgUnit;
      const svgHeight = flatLinks.length * svgLinkHeight;
      const x0 = 0.5;
      const x1 = 10.5;
      let path = "";
      let currentX = x0;
      let y = 0;
      flatLinks.forEach((item, index) => {
        const targetX = item.level > 0 ? x1 : x0;
        const nextY = y + svgLinkHeight;
        if (index === 0) {
          path += `M${targetX} ${y}`;
          currentX = targetX;
        }
        if (targetX !== currentX) {
          path += ` L${targetX} ${y + 6}`;
          currentX = targetX;
        }
        path += ` L${currentX} ${nextY - (index < flatLinks.length - 1 && flatLinks[index + 1]?.level !== item.level ? 6 : 0)}`;
        y = nextY;
      });
      const svgPath = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 ${svgHeight}'><path d='${path}' stroke='black' stroke-width='1' fill='none'/></svg>`);
      return {
        width: "0.75rem",
        height: `${flatLinks.length * linkHeight}rem`,
        maskImage: `url("data:image/svg+xml,${svgPath}")`
      };
    });
    const nuxtApp = useNuxtApp();
    function refreshHeadings() {
      const flatLinks = flattenLinks(props.links || []);
      if (!flatLinks.length) {
        updateHeadings([]);
        return;
      }
      const selector = flatLinks.map((l) => `#${CSS.escape(l.id)}`).join(", ");
      const headings = Array.from((void 0).querySelectorAll(selector));
      updateHeadings(headings);
    }
    nuxtApp.hooks.hook("page:loading:end", refreshHeadings);
    nuxtApp.hooks.hook("page:transition:finish", refreshHeadings);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineListTemplate), null, {
        default: withCtx(({ links, level }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="${ssrRenderClass(level > 0 ? ui.value.listWithChildren({ class: unref(props).ui?.listWithChildren }) : ui.value.list({ class: unref(props).ui?.list }))}"${_scopeId}><!--[-->`);
            ssrRenderList(links, (link, index) => {
              _push2(`<li class="${ssrRenderClass(link.children && link.children.length > 0 ? ui.value.itemWithChildren({ class: [unref(props).ui?.itemWithChildren, link.ui?.itemWithChildren] }) : ui.value.item({ class: [unref(props).ui?.item, link.ui?.item] }))}"${_scopeId}><a${ssrRenderAttr("href", `#${link.id}`)} data-slot="link" class="${ssrRenderClass(ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], active: unref(activeHeadings).includes(link.id) }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "link", { link }, () => {
                _push2(`<span data-slot="linkText" class="${ssrRenderClass(ui.value.linkText({ class: [unref(props).ui?.linkText, link.ui?.linkText] }))}"${_scopeId}>${ssrInterpolate(link.text)}</span>`);
              }, _push2, _parent2, _scopeId);
              _push2(`</a>`);
              if (link.children?.length) {
                _push2(ssrRenderComponent(unref(ReuseListTemplate), {
                  links: link.children,
                  level: level + 1
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: level > 0 ? ui.value.listWithChildren({ class: unref(props).ui?.listWithChildren }) : ui.value.list({ class: unref(props).ui?.list })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(links, (link, index) => {
                  return openBlock(), createBlock("li", {
                    key: index,
                    class: link.children && link.children.length > 0 ? ui.value.itemWithChildren({ class: [unref(props).ui?.itemWithChildren, link.ui?.itemWithChildren] }) : ui.value.item({ class: [unref(props).ui?.item, link.ui?.item] })
                  }, [
                    createVNode("a", {
                      href: `#${link.id}`,
                      "data-slot": "link",
                      class: ui.value.link({ class: [unref(props).ui?.link, link.ui?.link, link.class], active: unref(activeHeadings).includes(link.id) }),
                      onClick: withModifiers(($event) => scrollToHeading(link.id), ["prevent"])
                    }, [
                      renderSlot(_ctx.$slots, "link", { link }, () => [
                        createVNode("span", {
                          "data-slot": "linkText",
                          class: ui.value.linkText({ class: [unref(props).ui?.linkText, link.ui?.linkText] })
                        }, toDisplayString(link.text), 3)
                      ])
                    ], 10, ["href", "onClick"]),
                    link.children?.length ? (openBlock(), createBlock(unref(ReuseListTemplate), {
                      key: 0,
                      links: link.children,
                      level: level + 1
                    }, null, 8, ["links", "level"])) : createCommentVNode("", true)
                  ], 2);
                }), 128))
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DefineTriggerTemplate), null, {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {
              open,
              ui: ui.value
            }, null, _push2, _parent2, _scopeId);
            _push2(`<span data-slot="title" class="${ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", { open }, () => {
              _push2(`${ssrInterpolate(unref(props).title || unref(t)("contentToc.title"))}`);
            }, _push2, _parent2, _scopeId);
            _push2(`</span><span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "trailing", {
              open,
              ui: ui.value
            }, () => {
              _push2(ssrRenderComponent(_sfc_main$K, {
                name: unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                "data-slot": "trailingIcon",
                class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {
                open,
                ui: ui.value
              }),
              createVNode("span", {
                "data-slot": "title",
                class: ui.value.title({ class: unref(props).ui?.title })
              }, [
                renderSlot(_ctx.$slots, "default", { open }, () => [
                  createTextVNode(toDisplayString(unref(props).title || unref(t)("contentToc.title")), 1)
                ])
              ], 2),
              createVNode("span", {
                "data-slot": "trailing",
                class: ui.value.trailing({ class: unref(props).ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", {
                  open,
                  ui: ui.value
                }, () => [
                  createVNode(_sfc_main$K, {
                    name: unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
                  }, null, 8, ["name", "class"])
                ])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DefineContentTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(props).highlight) {
              _push2(`<div data-slot="indicator" class="${ssrRenderClass(ui.value.indicator({ class: unref(props).ui?.indicator }))}" style="${ssrRenderStyle({ ...indicatorStyle.value, ...circuitMaskStyle.value || {} })}"${_scopeId}><div data-slot="indicatorLine" class="${ssrRenderClass(ui.value.indicatorLine({ class: unref(props).ui?.indicatorLine }))}"${_scopeId}></div>`);
              if (indicatorStyle.value) {
                _push2(`<div data-slot="indicatorActive" class="${ssrRenderClass(ui.value.indicatorActive({ class: unref(props).ui?.indicatorActive }))}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "content", {
              links: unref(props).links
            }, () => {
              _push2(ssrRenderComponent(unref(ReuseListTemplate), {
                links: unref(props).links,
                level: 0
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              unref(props).highlight ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "indicator",
                class: ui.value.indicator({ class: unref(props).ui?.indicator }),
                style: { ...indicatorStyle.value, ...circuitMaskStyle.value || {} }
              }, [
                createVNode("div", {
                  "data-slot": "indicatorLine",
                  class: ui.value.indicatorLine({ class: unref(props).ui?.indicatorLine })
                }, null, 2),
                indicatorStyle.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "indicatorActive",
                  class: ui.value.indicatorActive({ class: unref(props).ui?.indicatorActive })
                }, null, 2)) : createCommentVNode("", true)
              ], 6)) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "content", {
                links: unref(props).links
              }, () => [
                createVNode(unref(ReuseListTemplate), {
                  links: unref(props).links,
                  level: 0
                }, null, 8, ["links"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(CollapsibleRoot_default), mergeProps({ ...unref(rootProps), ..._ctx.$attrs }, {
        "default-open": unref(props).defaultOpen,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
      }), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
            if (!!slots.top) {
              _push2(`<div data-slot="top" class="${ssrRenderClass(ui.value.top({ class: unref(props).ui?.top }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "top", {
                links: unref(props).links
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(props).links?.length) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(CollapsibleTrigger_default), {
                "data-slot": "trigger",
                class: ui.value.trigger({ class: [unref(props).ui?.trigger, unref(prefix)("lg:hidden")] })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ReuseTriggerTemplate), { open }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ReuseTriggerTemplate), { open }, null, 8, ["open"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(CollapsibleContent_default), {
                "data-slot": "content",
                class: ui.value.content({ class: [unref(props).ui?.content, unref(prefix)("lg:hidden")] })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ReuseContentTemplate))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<p data-slot="trigger" class="${ssrRenderClass(ui.value.trigger({ class: [unref(props).ui?.trigger, unref(prefix)("hidden lg:flex")] }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ReuseTriggerTemplate), { open }, null, _parent2, _scopeId));
              _push2(`</p><div data-slot="content" class="${ssrRenderClass(ui.value.content({ class: [unref(props).ui?.content, unref(prefix)("hidden lg:flex")] }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.bottom) {
              _push2(`<div data-slot="bottom" class="${ssrRenderClass(ui.value.bottom({ class: unref(props).ui?.bottom, body: !!slots.top || !!unref(props).links?.length }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "bottom", {
                links: unref(props).links
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: unref(props).ui?.container })
              }, [
                !!slots.top ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "top",
                  class: ui.value.top({ class: unref(props).ui?.top })
                }, [
                  renderSlot(_ctx.$slots, "top", {
                    links: unref(props).links
                  })
                ], 2)) : createCommentVNode("", true),
                unref(props).links?.length ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(unref(CollapsibleTrigger_default), {
                    "data-slot": "trigger",
                    class: ui.value.trigger({ class: [unref(props).ui?.trigger, unref(prefix)("lg:hidden")] })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseTriggerTemplate), { open }, null, 8, ["open"])
                    ]),
                    _: 2
                  }, 1032, ["class"]),
                  createVNode(unref(CollapsibleContent_default), {
                    "data-slot": "content",
                    class: ui.value.content({ class: [unref(props).ui?.content, unref(prefix)("lg:hidden")] })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode("p", {
                    "data-slot": "trigger",
                    class: ui.value.trigger({ class: [unref(props).ui?.trigger, unref(prefix)("hidden lg:flex")] })
                  }, [
                    createVNode(unref(ReuseTriggerTemplate), { open }, null, 8, ["open"])
                  ], 2),
                  createVNode("div", {
                    "data-slot": "content",
                    class: ui.value.content({ class: [unref(props).ui?.content, unref(prefix)("hidden lg:flex")] })
                  }, [
                    createVNode(unref(ReuseContentTemplate))
                  ], 2)
                ], 64)) : createCommentVNode("", true),
                !!slots.bottom ? (openBlock(), createBlock("div", {
                  key: 2,
                  "data-slot": "bottom",
                  class: ui.value.bottom({ class: unref(props).ui?.bottom, body: !!slots.top || !!unref(props).links?.length })
                }, [
                  renderSlot(_ctx.$slots, "bottom", {
                    links: unref(props).links
                  })
                ], 2)) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/content/ContentToc.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const theme = {
  "slots": {
    "root": "flex flex-col gap-3",
    "title": "text-sm font-semibold flex items-center gap-1.5",
    "list": "flex flex-col gap-2",
    "item": "relative",
    "link": "group text-sm flex items-center gap-1.5 focus-visible:outline-primary",
    "linkLeadingIcon": "size-5 shrink-0",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "size-3 absolute top-0 text-dimmed"
  },
  "variants": {
    "active": {
      "true": {
        "link": "text-primary font-medium"
      },
      "false": {
        "link": [
          "text-muted hover:text-default",
          "transition-colors"
        ]
      }
    }
  }
};

const _sfc_main$4 = {
  __name: "UPageLinks",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "nav" },
  title: { type: String, required: false },
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("pageLinks", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageLinks || {} })());

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (unref(props).title || !!slots.title) {
          _push(`<p data-slot="title" class="${
            ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "title", {}, () => {
            _push(`${ssrInterpolate(unref(props).title)}`);
          }, _push, _parent, _scopeId);
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
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
                          ]),
                          (link.label || !!slots['link-label'])
                            ? (openBlock(), createBlock("span", {
                                key: 0,
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
                        ]),
                        (link.label || !!slots['link-label'])
                          ? (openBlock(), createBlock("span", {
                              key: 0,
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
          (unref(props).title || !!slots.title)
            ? (openBlock(), createBlock("p", {
                key: 0,
                "data-slot": "title",
                class: ui.value.title({ class: unref(props).ui?.title })
              }, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(unref(props).title), 1)
                ])
              ], 2))
            : createCommentVNode("", true),
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
                          ]),
                          (link.label || !!slots['link-label'])
                            ? (openBlock(), createBlock("span", {
                                key: 0,
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageLinks.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideRightBottom",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageUrl = route.path;
    const appConfig = useAppConfig();
    const { t } = useDocusI18n();
    const { isEnabled, open } = useAssistant();
    const showExplainWithAi = computed(() => {
      return isEnabled.value && appConfig.assistant?.explainWithAi !== false;
    });
    const explainIcon = computed(() => appConfig.assistant?.icons?.explain || "i-lucide-brain");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USeparator = _sfc_main$h;
      const _component_UPageLinks = _sfc_main$4;
      const _component_UButton = _sfc_main$E;
      if (unref(appConfig).toc?.bottom?.links?.length || unref(showExplainWithAi)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_USeparator, { type: "dashed" }, null, _parent));
        if (unref(appConfig).toc?.bottom?.links?.length) {
          _push(ssrRenderComponent(_component_UPageLinks, {
            title: unref(appConfig).toc?.bottom?.title || unref(t)("docs.links"),
            links: unref(appConfig).toc?.bottom?.links
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(appConfig).toc?.bottom?.links?.length && unref(showExplainWithAi)) {
          _push(ssrRenderComponent(_component_USeparator, { type: "dashed" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(showExplainWithAi)) {
          _push(ssrRenderComponent(_component_UButton, {
            icon: unref(explainIcon),
            label: unref(t)("assistant.explainWithAi"),
            size: "sm",
            variant: "link",
            class: "p-0 text-sm",
            color: "neutral",
            onClick: ($event) => unref(open)(`Explain the page ${unref(pageUrl)}`, true)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/docs/DocsAsideRightBottom.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$3, { __name: "DocsAsideRightBottom" });

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideMobileBar",
  __ssrInlineRender: true,
  props: {
    links: {}
  },
  setup(__props) {
    const { subNavigationMode, sidebarNavigation, currentSection } = useSubNavigation();
    const { t } = useDocusI18n();
    const menuDrawerOpen = ref(false);
    const tocDrawerOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDrawer = _sfc_main$v;
      const _component_UButton = _sfc_main$E;
      const _component_UContentNavigation = _sfc_main$d$1;
      const _component_UContentToc = _sfc_main$5;
      const _component_DocsAsideRightBottom = __nuxt_component_1;
      if (unref(subNavigationMode)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "lg:hidden sticky top-(--ui-header-height) z-10 bg-default/75 backdrop-blur -mx-4 p-2 border-b border-dashed border-default flex justify-between" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_UDrawer, {
          open: unref(menuDrawerOpen),
          "onUpdate:open": ($event) => isRef(menuDrawerOpen) ? menuDrawerOpen.value = $event : null,
          direction: "left",
          title: unref(currentSection)?.title,
          handle: false,
          inset: "",
          side: "left",
          ui: { content: "w-full max-w-2/3" }
        }, {
          body: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UContentNavigation, {
                navigation: unref(sidebarNavigation),
                "default-open": "",
                "trailing-icon": "i-lucide-chevron-right",
                ui: { linkTrailingIcon: "group-data-[state=open]:rotate-90" },
                highlight: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UContentNavigation, {
                  navigation: unref(sidebarNavigation),
                  "default-open": "",
                  "trailing-icon": "i-lucide-chevron-right",
                  ui: { linkTrailingIcon: "group-data-[state=open]:rotate-90" },
                  highlight: ""
                }, null, 8, ["navigation"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                label: unref(t)("docs.menu"),
                icon: "i-lucide-text-align-start",
                color: "neutral",
                variant: "link",
                size: "xs",
                "aria-label": unref(t)("docs.menu")
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  label: unref(t)("docs.menu"),
                  icon: "i-lucide-text-align-start",
                  color: "neutral",
                  variant: "link",
                  size: "xs",
                  "aria-label": unref(t)("docs.menu")
                }, null, 8, ["label", "aria-label"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UDrawer, {
          open: unref(tocDrawerOpen),
          "onUpdate:open": ($event) => isRef(tocDrawerOpen) ? tocDrawerOpen.value = $event : null,
          direction: "right",
          handle: false,
          inset: "",
          side: "right",
          "no-body-styles": "",
          ui: { content: "w-full max-w-2/3" }
        }, {
          body: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.links?.length) {
                _push2(ssrRenderComponent(_component_UContentToc, {
                  links: __props.links,
                  open: true,
                  "default-open": "",
                  ui: {
                    root: "!mx-0 !px-1 top-0 overflow-visible",
                    container: "!pt-0 border-b-0",
                    trailingIcon: "hidden",
                    bottom: "flex flex-col"
                  }
                }, {
                  bottom: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_DocsAsideRightBottom, null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_DocsAsideRightBottom)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                __props.links?.length ? (openBlock(), createBlock(_component_UContentToc, {
                  key: 0,
                  links: __props.links,
                  open: true,
                  "default-open": "",
                  ui: {
                    root: "!mx-0 !px-1 top-0 overflow-visible",
                    container: "!pt-0 border-b-0",
                    trailingIcon: "hidden",
                    bottom: "flex flex-col"
                  }
                }, {
                  bottom: withCtx(() => [
                    createVNode(_component_DocsAsideRightBottom)
                  ]),
                  _: 1
                }, 8, ["links"])) : createCommentVNode("", true)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                label: unref(t)("docs.toc"),
                "trailing-icon": "i-lucide-chevron-right",
                color: "neutral",
                variant: "link",
                size: "xs",
                "aria-label": unref(t)("docs.toc")
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  label: unref(t)("docs.toc"),
                  "trailing-icon": "i-lucide-chevron-right",
                  color: "neutral",
                  variant: "link",
                  size: "xs",
                  "aria-label": unref(t)("docs.toc")
                }, null, 8, ["label", "aria-label"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/docs/DocsAsideMobileBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$2, { __name: "DocsAsideMobileBar" });

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideRight",
  __ssrInlineRender: true,
  props: {
    page: {}
  },
  setup(__props) {
    const props = __props;
    const links = computed(() => props.page?.body?.toc?.links || []);
    const { shouldPushContent: shouldHideToc } = useAssistant();
    const { subNavigationMode } = useSubNavigation();
    const appConfig = useAppConfig();
    const { t } = useDocusI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContentToc = _sfc_main$5;
      const _component_DocsAsideRightBottom = __nuxt_component_1;
      const _component_DocsAsideMobileBar = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(links).length && !unref(shouldHideToc)) {
        _push(ssrRenderComponent(_component_UContentToc, {
          highlight: "",
          title: unref(appConfig).toc?.title || unref(t)("docs.toc"),
          links: unref(links),
          class: { "hidden lg:block": unref(subNavigationMode) }
        }, {
          bottom: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_DocsAsideRightBottom, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_DocsAsideRightBottom)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_DocsAsideMobileBar, { links: unref(links) }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/docs/DocsAsideRight.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$1, { __name: "DocsAsideRight" });

function findPageHeadline(navigation, path, options) {
  if (!navigation?.length || !path) {
    return;
  }
  for (const link of navigation) {
    {
      if (link.children) {
        for (const child of link.children) {
          const isIndex = child.stem?.endsWith("/index");
          if (child.path === path && !isIndex) {
            return link.title;
          }
        }
        const headline = findPageHeadline(link.children, path);
        if (headline) {
          return headline;
        }
      }
    }
  }
}

const addPrerenderPath = (path) => {
  const event = useRequestEvent();
  if (event) {
    event.node.res.setHeader(
      "x-nitro-prerender",
      [
        event.node.res.getHeader("x-nitro-prerender"),
        path
      ].filter(Boolean).join(",")
    );
  }
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { locale, isEnabled, t } = useDocusI18n();
    const appConfig = useAppConfig();
    const navigation = inject("navigation");
    const { shouldPushContent: shouldHideToc } = useAssistant();
    const collectionName = computed(() => isEnabled.value ? `docs_${locale.value}` : "docs");
    const [{ data: page }, { data: surround }] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      useAsyncData(kebabCase(route.path), () => queryCollection(collectionName.value).path(route.path).first(), '$ONUmmmln_k' /* nuxt-injected */),
      useAsyncData(`${kebabCase(route.path)}-surround`, () => {
        return queryCollectionItemSurroundings(collectionName.value, route.path, {
          fields: ["description"]
        });
      })
    ])), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    const title = page.value.seo?.title || page.value.title;
    const description = page.value.seo?.description || page.value.description;
    const headline = ref(findPageHeadline(navigation?.value, page.value?.path));
    const breadcrumbs = computed(() => findPageBreadcrumbs(navigation?.value, page.value?.path || ""));
    useSeo({
      title,
      description,
      type: "article",
      modifiedAt: page.value.modifiedAt,
      breadcrumbs
    });
    watch(() => navigation?.value, () => {
      headline.value = findPageHeadline(navigation?.value, page.value?.path) || headline.value;
    });
    defineOgImageComponent("Docs", {
      headline: headline.value
    });
    const github = computed(() => appConfig.github ? appConfig.github : null);
    const editLink = computed(() => {
      if (!github.value) {
        return;
      }
      return [
        github.value.url,
        "edit",
        github.value.branch,
        github.value.rootDir,
        "content",
        `${page.value?.stem}.${page.value?.extension}`
      ].filter(Boolean).join("/");
    });
    addPrerenderPath(`/raw${route.path}.md`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPage = _sfc_main$d;
      const _component_UPageHeader = _sfc_main$c;
      const _component_UButton = _sfc_main$E;
      const _component_DocsPageHeaderLinks = __nuxt_component_3;
      const _component_UPageBody = _sfc_main$7;
      const _component_ContentRenderer = __nuxt_component_0;
      const _component_USeparator = _sfc_main$h;
      const _component_UContentSurround = _sfc_main$6;
      const _component_DocsAsideRight = __nuxt_component_8;
      if (unref(page)) {
        _push(ssrRenderComponent(_component_UPage, mergeProps({
          key: `page-${unref(shouldHideToc)}`
        }, _attrs), {
          right: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_DocsAsideRight, { page: unref(page) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_DocsAsideRight, { page: unref(page) }, null, 8, ["page"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPageHeader, {
                title: unref(page).title,
                description: unref(page).description,
                headline: unref(headline),
                ui: {
                  wrapper: "flex-row items-center flex-wrap justify-between"
                }
              }, {
                links: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).links, (link, index) => {
                      _push3(ssrRenderComponent(_component_UButton, mergeProps({
                        key: index,
                        size: "sm"
                      }, { ref_for: true }, link), null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    _push3(ssrRenderComponent(_component_DocsPageHeaderLinks, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).links, (link, index) => {
                        return openBlock(), createBlock(_component_UButton, mergeProps({
                          key: index,
                          size: "sm"
                        }, { ref_for: true }, link), null, 16);
                      }), 128)),
                      createVNode(_component_DocsPageHeaderLinks)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPageBody, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(page)) {
                      _push3(ssrRenderComponent(_component_ContentRenderer, { value: unref(page) }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(github)) {
                      _push3(ssrRenderComponent(_component_USeparator, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex items-center gap-2 text-sm text-muted"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_UButton, {
                              variant: "link",
                              color: "neutral",
                              to: unref(editLink),
                              target: "_blank",
                              icon: "i-lucide-pen",
                              ui: { leadingIcon: "size-4" }
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(unref(t)("docs.edit"))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(unref(t)("docs.edit")), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`<span${_scopeId3}>${ssrInterpolate(unref(t)("common.or"))}</span>`);
                            _push4(ssrRenderComponent(_component_UButton, {
                              variant: "link",
                              color: "neutral",
                              to: `${unref(github).url}/issues/new/choose`,
                              target: "_blank",
                              icon: "i-lucide-alert-circle",
                              ui: { leadingIcon: "size-4" }
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(unref(t)("docs.report"))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(unref(t)("docs.report")), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex items-center gap-2 text-sm text-muted" }, [
                                createVNode(_component_UButton, {
                                  variant: "link",
                                  color: "neutral",
                                  to: unref(editLink),
                                  target: "_blank",
                                  icon: "i-lucide-pen",
                                  ui: { leadingIcon: "size-4" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t)("docs.edit")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["to"]),
                                createVNode("span", null, toDisplayString(unref(t)("common.or")), 1),
                                createVNode(_component_UButton, {
                                  variant: "link",
                                  color: "neutral",
                                  to: `${unref(github).url}/issues/new/choose`,
                                  target: "_blank",
                                  icon: "i-lucide-alert-circle",
                                  ui: { leadingIcon: "size-4" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(t)("docs.report")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["to"])
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_UContentSurround, { surround: unref(surround) }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      unref(page) ? (openBlock(), createBlock(_component_ContentRenderer, {
                        key: 0,
                        value: unref(page)
                      }, null, 8, ["value"])) : createCommentVNode("", true),
                      unref(github) ? (openBlock(), createBlock(_component_USeparator, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted" }, [
                            createVNode(_component_UButton, {
                              variant: "link",
                              color: "neutral",
                              to: unref(editLink),
                              target: "_blank",
                              icon: "i-lucide-pen",
                              ui: { leadingIcon: "size-4" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("docs.edit")), 1)
                              ]),
                              _: 1
                            }, 8, ["to"]),
                            createVNode("span", null, toDisplayString(unref(t)("common.or")), 1),
                            createVNode(_component_UButton, {
                              variant: "link",
                              color: "neutral",
                              to: `${unref(github).url}/issues/new/choose`,
                              target: "_blank",
                              icon: "i-lucide-alert-circle",
                              ui: { leadingIcon: "size-4" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("docs.report")), 1)
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPageHeader, {
                  title: unref(page).title,
                  description: unref(page).description,
                  headline: unref(headline),
                  ui: {
                    wrapper: "flex-row items-center flex-wrap justify-between"
                  }
                }, {
                  links: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).links, (link, index) => {
                      return openBlock(), createBlock(_component_UButton, mergeProps({
                        key: index,
                        size: "sm"
                      }, { ref_for: true }, link), null, 16);
                    }), 128)),
                    createVNode(_component_DocsPageHeaderLinks)
                  ]),
                  _: 1
                }, 8, ["title", "description", "headline"]),
                createVNode(_component_UPageBody, null, {
                  default: withCtx(() => [
                    unref(page) ? (openBlock(), createBlock(_component_ContentRenderer, {
                      key: 0,
                      value: unref(page)
                    }, null, 8, ["value"])) : createCommentVNode("", true),
                    unref(github) ? (openBlock(), createBlock(_component_USeparator, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 text-sm text-muted" }, [
                          createVNode(_component_UButton, {
                            variant: "link",
                            color: "neutral",
                            to: unref(editLink),
                            target: "_blank",
                            icon: "i-lucide-pen",
                            ui: { leadingIcon: "size-4" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("docs.edit")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"]),
                          createVNode("span", null, toDisplayString(unref(t)("common.or")), 1),
                          createVNode(_component_UButton, {
                            variant: "link",
                            color: "neutral",
                            to: `${unref(github).url}/issues/new/choose`,
                            target: "_blank",
                            icon: "i-lucide-alert-circle",
                            ui: { leadingIcon: "size-4" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("docs.report")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/pages/[[lang]]/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-DRTNKrOJ.mjs.map
