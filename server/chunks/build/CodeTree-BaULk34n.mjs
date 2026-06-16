import { useSlots, computed, ref, watch, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, mergeProps, resolveDynamicComponent, defineComponent, withModifiers, withKeys, renderSlot, toRefs, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderVNode } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv, w as _sfc_main$K, a as useCollection, P as Primitive, b as useTypeahead, d as useDirection, ax as RovingFocusGroup_default, e as createContext, j as handleAndDispatchCustomEvent$1, k as getActiveElement, M as MAP_KEY_TO_FOCUS_INTENT } from './server.mjs';
import { f as findValuesBetween } from './arrays-DR3eABVO.mjs';
import { createReusableTemplate, createEventHook, useVModel } from '@vueuse/core';
import { R as RovingFocusItem_default } from './RovingFocusItem-CxraSrf4.mjs';
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

//#region src/shared/useSelectionBehavior.ts
function useSelectionBehavior(modelValue, props) {
	const firstValue = ref();
	const onSelectItem = (val, condition) => {
		if (props.multiple && Array.isArray(modelValue.value)) if (props.selectionBehavior === "replace") {
			modelValue.value = [val];
			firstValue.value = val;
		} else {
			const index = modelValue.value.findIndex((v) => condition(v));
			if (index !== -1) modelValue.value = modelValue.value.filter((_, i) => i !== index);
			else modelValue.value = [...modelValue.value, val];
		}
		else if (props.selectionBehavior === "replace") modelValue.value = { ...val };
		else if (!Array.isArray(modelValue.value) && condition(modelValue.value)) modelValue.value = void 0;
		else modelValue.value = { ...val };
		return modelValue.value;
	};
	function handleMultipleReplace(intent, currentElement, getItems, options) {
		if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value)) return;
		const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
		const lastValue = collection.find((i) => i.ref === currentElement)?.value;
		if (!lastValue) return;
		let value = null;
		switch (intent) {
			case "prev":
			case "next": {
				value = findValuesBetween(options, firstValue.value, lastValue);
				break;
			}
			case "first": {
				value = findValuesBetween(options, firstValue.value, options?.[0]);
				break;
			}
			case "last": {
				value = findValuesBetween(options, firstValue.value, options.at(-1));
				break;
			}
		}
		modelValue.value = value;
	}
	return {
		firstValue,
		onSelectItem,
		handleMultipleReplace
	};
}

//#region src/Tree/utils.ts
function flatten(items) {
	return items.reduce((acc, item) => {
		acc.push(item);
		if (item.children) acc.push(...flatten(item.children));
		return acc;
	}, []);
}

//#region src/Tree/TreeRoot.vue?vue&type=script&setup=true&lang.ts
const [injectTreeRootContext, provideTreeRootContext] = /*#__PURE__*/ createContext("TreeRoot");
var TreeRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TreeRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		expanded: {
			type: Array,
			required: false
		},
		defaultExpanded: {
			type: Array,
			required: false
		},
		getKey: {
			type: Function,
			required: true
		},
		getChildren: {
			type: Function,
			required: false,
			default: (val) => val.children
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		multiple: {
			type: Boolean,
			required: false,
			skipCheck: true
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		propagateSelect: {
			type: Boolean,
			required: false
		},
		bubbleSelect: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "ul"
		}
	},
	emits: ["update:modelValue", "update:expanded"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { items, multiple, disabled, propagateSelect, dir: propDir, bubbleSelect } = toRefs(props);
		const { handleTypeaheadSearch } = useTypeahead();
		const dir = useDirection(propDir);
		const rovingFocusGroupRef = ref();
		const isVirtual = ref(false);
		const virtualKeydownHook = createEventHook();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: true,
			deep: true
		});
		const expanded = useVModel(props, "expanded", emits, {
			defaultValue: props.defaultExpanded ?? [],
			passive: props.expanded === void 0,
			deep: true
		});
		const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props);
		const selectedKeys = computed(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value.map((i) => props.getKey(i));
			else return [props.getKey(modelValue.value ?? {})];
		});
		function flattenItems(items$1, level = 1, parentItem) {
			return items$1.reduce((acc, item, index) => {
				const key = props.getKey(item);
				const children = props.getChildren(item);
				const isExpanded = expanded.value.includes(key);
				const flattenedItem = {
					_id: key,
					value: item,
					index,
					level,
					parentItem,
					hasChildren: !!children,
					bind: {
						"value": item,
						level,
						"aria-setsize": items$1.length,
						"aria-posinset": index + 1
					}
				};
				acc.push(flattenedItem);
				if (children && isExpanded) acc.push(...flattenItems(children, level + 1, item));
				return acc;
			}, []);
		}
		const expandedItems = computed(() => {
			const items$1 = props.items;
			expanded.value.map((i) => i);
			return flattenItems(items$1 ?? []);
		});
		function handleKeydown(event) {
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const collections = rovingFocusGroupRef.value?.getItems() ?? [];
				handleTypeaheadSearch(event.key, collections);
			}
		}
		function handleKeydownNavigation(event) {
			if (isVirtual.value) return;
			const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
			nextTick(() => {
				handleMultipleReplace(intent, getActiveElement(), rovingFocusGroupRef.value?.getItems, expandedItems.value.map((i) => i.value));
			});
		}
		function handleBubbleSelect(item) {
			if (item.parentItem != null && Array.isArray(modelValue.value) && props.multiple) {
				const parentItem = expandedItems.value.find((i) => {
					return item.parentItem != null && props.getKey(i.value) === props.getKey(item.parentItem);
				});
				if (parentItem != null) {
					const areAllChilredOfParentSelected = props.getChildren(parentItem.value)?.every((i) => modelValue.value.find((v) => props.getKey(v) === props.getKey(i)));
					if (areAllChilredOfParentSelected) modelValue.value = [...modelValue.value, parentItem.value];
					else modelValue.value = modelValue.value.filter((v) => props.getKey(v) !== props.getKey(parentItem.value));
					handleBubbleSelect(parentItem);
				}
			}
		}
		provideTreeRootContext({
			modelValue,
			selectedKeys,
			onSelect: (val) => {
				const condition = (baseValue) => props.getKey(baseValue ?? {}) === props.getKey(val);
				const exist = props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : void 0;
				onSelectItem(val, condition);
				if (props.bubbleSelect && props.multiple && Array.isArray(modelValue.value)) {
					const item = expandedItems.value.find((i) => {
						return props.getKey(i.value) === props.getKey(val);
					});
					if (item != null) handleBubbleSelect(item);
				}
				if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
					const children = flatten(props.getChildren(val) ?? []);
					if (exist) modelValue.value = [...modelValue.value].filter((i) => !children.some((child) => props.getKey(i ?? {}) === props.getKey(child)));
					else modelValue.value = [...modelValue.value, ...children];
				}
			},
			expanded,
			onToggle(val) {
				const children = val ? props.getChildren(val) : void 0;
				if (!children) return;
				const key = props.getKey(val) ?? val;
				if (expanded.value.includes(key)) expanded.value = expanded.value.filter((val$1) => val$1 !== key);
				else expanded.value = [...expanded.value, key];
			},
			getKey: props.getKey,
			getChildren: props.getChildren,
			items,
			expandedItems,
			disabled,
			multiple,
			dir,
			propagateSelect,
			bubbleSelect,
			isVirtual,
			virtualKeydownHook,
			handleMultipleReplace
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				ref_key: "rovingFocusGroupRef",
				ref: rovingFocusGroupRef,
				"as-child": "",
				orientation: "vertical",
				dir: unref(dir)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					role: "tree",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-multiselectable": unref(multiple) ? true : void 0,
					onKeydown: [handleKeydown, withKeys(withModifiers(handleKeydownNavigation, ["shift"]), ["up", "down"])]
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						flattenItems: expandedItems.value,
						modelValue: unref(modelValue),
						expanded: unref(expanded)
					})]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"aria-multiselectable",
					"onKeydown"
				])]),
				_: 3
			}, 8, ["dir"]);
		};
	}
});

//#endregion
//#region src/Tree/TreeRoot.vue
var TreeRoot_default = TreeRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Tree/TreeItem.vue?vue&type=script&setup=true&lang.ts
const TREE_SELECT = "tree.select";
const TREE_TOGGLE = "tree.toggle";
var TreeItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "TreeItem",
	props: {
		value: {
			type: null,
			required: true
		},
		level: {
			type: Number,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "li"
		}
	},
	emits: ["select", "toggle"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTreeRootContext();
		const { getItems } = useCollection();
		const hasChildren = computed(() => !!rootContext.getChildren(props.value));
		const isExpanded = computed(() => {
			const key = rootContext.getKey(props.value);
			return rootContext.expanded.value.includes(key);
		});
		const isSelected = computed(() => {
			const key = rootContext.getKey(props.value);
			return rootContext.selectedKeys.value.includes(key);
		});
		const isIndeterminate = computed(() => {
			if (rootContext.bubbleSelect.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
				const children = flatten(rootContext.getChildren(props.value) || []);
				return children.some((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child))) && !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
			} else if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
				const children = flatten(rootContext.getChildren(props.value) || []);
				return !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
			} else return void 0;
		});
		function handleKeydownRight(ev) {
			if (!hasChildren.value) return;
			if (isExpanded.value) {
				const collection = getItems().map((i) => i.ref);
				const currentElement = getActiveElement();
				const currentIndex = collection.indexOf(currentElement);
				const list = [...collection].slice(currentIndex);
				const nextElement = list.find((el) => Number(el.getAttribute("data-indent")) === props.level + 1);
				if (nextElement) nextElement.focus();
			} else handleToggleCustomEvent(ev);
		}
		function handleKeydownLeft(ev) {
			if (isExpanded.value) handleToggleCustomEvent(ev);
			else {
				const collection = getItems().map((i) => i.ref);
				const currentElement = getActiveElement();
				const currentIndex = collection.indexOf(currentElement);
				const list = [...collection].slice(0, currentIndex).reverse();
				const parentElement = list.find((el) => Number(el.getAttribute("data-indent")) === props.level - 1);
				if (parentElement) parentElement.focus();
			}
		}
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			rootContext.onSelect(props.value);
		}
		async function handleToggle(ev) {
			emits("toggle", ev);
			if (ev?.defaultPrevented) return;
			rootContext.onToggle(props.value);
		}
		async function handleSelectCustomEvent(ev) {
			if (!ev) return;
			const eventDetail = {
				originalEvent: ev,
				value: props.value,
				isExpanded: isExpanded.value,
				isSelected: isSelected.value
			};
			handleAndDispatchCustomEvent$1(TREE_SELECT, handleSelect, eventDetail);
		}
		async function handleToggleCustomEvent(ev) {
			if (!ev) return;
			const eventDetail = {
				originalEvent: ev,
				value: props.value,
				isExpanded: isExpanded.value,
				isSelected: isSelected.value
			};
			handleAndDispatchCustomEvent$1(TREE_TOGGLE, handleToggle, eventDetail);
		}
		__expose({
			isExpanded,
			isSelected,
			isIndeterminate,
			handleToggle: () => rootContext.onToggle(props.value),
			handleSelect: () => rootContext.onSelect(props.value)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				"as-child": "",
				value: _ctx.value,
				"allow-shift-key": ""
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					role: "treeitem",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value,
					"aria-expanded": hasChildren.value ? isExpanded.value : void 0,
					"aria-level": _ctx.level,
					"data-indent": _ctx.level,
					"data-selected": isSelected.value ? "" : void 0,
					"data-expanded": isExpanded.value ? "" : void 0,
					onKeydown: [
						withKeys(withModifiers(handleSelectCustomEvent, ["self", "prevent"]), ["enter", "space"]),
						_cache[0] || (_cache[0] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownRight(ev) : handleKeydownLeft(ev), ["prevent"]), ["right"])),
						_cache[1] || (_cache[1] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownLeft(ev) : handleKeydownRight(ev), ["prevent"]), ["left"]))
					],
					onClick: _cache[2] || (_cache[2] = withModifiers((ev) => {
						handleSelectCustomEvent(ev);
						handleToggleCustomEvent(ev);
					}, ["stop"]))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						isExpanded: isExpanded.value,
						isSelected: isSelected.value,
						isIndeterminate: isIndeterminate.value,
						handleSelect: () => unref(rootContext).onSelect(_ctx.value),
						handleToggle: () => unref(rootContext).onToggle(_ctx.value)
					})]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-selected",
					"aria-expanded",
					"aria-level",
					"data-indent",
					"data-selected",
					"data-expanded",
					"onKeydown"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});

//#endregion
//#region src/Tree/TreeItem.vue
var TreeItem_default = TreeItem_vue_vue_type_script_setup_true_lang_default;

const theme = {
  "slots": {
    "root": "relative lg:h-[450px] my-5 grid lg:grid-cols-3 border border-muted rounded-md",
    "list": "isolate relative p-2 border-b lg:border-b-0 lg:border-e border-muted overflow-y-auto",
    "item": "",
    "listWithChildren": "ms-4.5 border-s border-default",
    "itemWithChildren": "ps-1.5 -ms-px",
    "link": "relative group peer w-full px-2.5 py-1.5 before:inset-y-px before:inset-x-0 flex items-center gap-1.5 text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "size-4 shrink-0",
    "linkLabel": "truncate",
    "linkTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingIcon": "size-5 transform transition-transform duration-200 shrink-0 group-data-expanded:rotate-180",
    "content": "overflow-hidden lg:col-span-2 flex flex-col [&>div]:my-0 [&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div>div]:border-0 [&>div>pre]:border-b-0 [&>div>pre]:border-s-0 [&>div>pre]:border-e-0 [&>div>pre]:rounded-l-none [&>div>pre]:flex-1 [&>div]:overflow-y-auto"
  },
  "variants": {
    "active": {
      "true": {
        "link": "text-highlighted before:bg-elevated"
      },
      "false": {
        "link": [
          "hover:text-highlighted hover:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ]
      }
    }
  }
};

const _sfc_main = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: "ProseCodeTree",
  __ssrInlineRender: true,
  props: {
  items: { type: Array, required: false },
  modelValue: { type: String, required: false },
  defaultValue: { type: String, required: false },
  expandAll: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {


const _props = __props;
const emits = __emit;
const slots = useSlots();
const props = useComponentProps("prose.codeTree", _props);
const appConfig = useAppConfig();
const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.prose?.codeTree || {} })());
const initialPath = props.modelValue ?? props.defaultValue;
const model = ref(initialPath ? { path: initialPath } : void 0);
const lastSelectedItem = ref();
watch(model, (value) => {
  if (value?.path !== props.modelValue) {
    emits("update:modelValue", value?.path);
  }
});
watch(() => props.modelValue, (value) => {
  if (value === model.value?.path) return;
  model.value = value ? { path: value } : void 0;
  const pathsToExpand = getExpandedPaths(value);
  for (const path of pathsToExpand) {
    if (!expanded.value.includes(path)) {
      expanded.value.push(path);
    }
  }
});
const rerenderCount = ref(1);
const flatItems = computed(() => {
  rerenderCount.value;
  return props.items || slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [];
});
const items = computed(() => buildTree(flatItems.value));
function buildTree(items2) {
  const map = /* @__PURE__ */ new Map();
  const root = [];
  items2.forEach((item) => {
    const parts = item.label.split("/");
    let path = "";
    parts.forEach((part, i) => {
      path = path ? `${path}/${part}` : part;
      if (!map.has(path)) {
        const node = { label: part, path, ...i < parts.length - 1 && { children: [] } };
        map.set(path, node);
        if (i === 0) {
          root.push(node);
        } else {
          map.get(parts.slice(0, i).join("/"))?.children?.push(node);
        }
      }
    });
  });
  const sort = (nodes) => nodes.sort(
    (a, b) => !!a.children === !!b.children ? a.label.localeCompare(b.label) : b.children ? 1 : -1
  ).map((n) => ({ ...n, children: n.children && sort(n.children) }));
  return sort(root);
}
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
function getExpandedPaths(path) {
  if (props.expandAll) {
    const allPaths = /* @__PURE__ */ new Set();
    flatItems.value.forEach((item) => {
      const parts2 = item.label.split("/");
      for (let i = 1; i < parts2.length; i++) {
        allPaths.add(parts2.slice(0, i).join("/"));
      }
    });
    return Array.from(allPaths);
  }
  if (!path) {
    return [];
  }
  const parts = path.split("/");
  return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join("/"));
}
const expanded = ref(getExpandedPaths(model.value?.path));
watch(flatItems, (newItems, oldItems) => {
  if (!props.expandAll) return;
  const newLabels = newItems.map((i) => i.label).join("\n");
  const oldLabels = oldItems?.map((i) => i.label).join("\n") ?? "";
  if (newLabels !== oldLabels) {
    expanded.value = getExpandedPaths();
  }
});
watch(model, (value) => {
  const item = flatItems.value.find((item2) => value?.path === item2.label);
  if (item?.component) {
    lastSelectedItem.value = item;
  }
}, { immediate: true });

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(unref(DefineTreeTemplate), null, {
    default: withCtx(({ items, level }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<!--[-->`);
        ssrRenderList(items, (item, index) => {
          _push(`<li role="presentation" class="${
            ssrRenderClass(level > 1 ? ui.value.itemWithChildren({ class: unref(props).ui?.itemWithChildren }) : ui.value.item({ class: unref(props).ui?.item }))
          }"${
            _scopeId
          }>`);
          _push(ssrRenderComponent(unref(TreeItem_default), {
            level: level,
            value: item,
            "as-child": ""
          }, {
            default: withCtx(({ isExpanded, isSelected }, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<button type="button" class="${
                  ssrRenderClass(ui.value.link({ class: unref(props).ui?.link, active: isSelected }))
                }"${
                  _scopeId
                }>`);
                if (item.children?.length) {
                  _push(ssrRenderComponent(_sfc_main$K, {
                    name: isExpanded ? unref(appConfig).ui.icons.folderOpen : unref(appConfig).ui.icons.folder,
                    class: ui.value.linkLeadingIcon({ class: unref(props).ui?.linkLeadingIcon })
                  }, null, _parent, _scopeId));
                } else {
                  _push(ssrRenderComponent(_sfc_main$1, {
                    filename: item.label,
                    class: ui.value.linkLeadingIcon({ class: unref(props).ui?.linkLeadingIcon })
                  }, null, _parent, _scopeId));
                }
                _push(`<span class="${
                  ssrRenderClass(ui.value.linkLabel({ class: unref(props).ui?.linkLabel }))
                }"${
                  _scopeId
                }>${
                  ssrInterpolate(item.label)
                }</span>`);
                if (item.children?.length) {
                  _push(`<span class="${
                    ssrRenderClass(ui.value.linkTrailing({ class: unref(props).ui?.linkTrailing }))
                  }"${
                    _scopeId
                  }>`);
                  _push(ssrRenderComponent(_sfc_main$K, {
                    name: unref(appConfig).ui.icons.chevronDown,
                    class: ui.value.linkTrailingIcon({ class: unref(props).ui?.linkTrailingIcon })
                  }, null, _parent, _scopeId));
                  _push(`</span>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</button>`);
                if (item.children?.length && isExpanded) {
                  _push(`<ul role="group" class="${
                    ssrRenderClass(ui.value.listWithChildren({ class: unref(props).ui?.listWithChildren }))
                  }"${
                    _scopeId
                  }>`);
                  _push(ssrRenderComponent(unref(ReuseTreeTemplate), {
                    items: item.children,
                    level: level + 1
                  }, null, _parent, _scopeId));
                  _push(`</ul>`);
                } else {
                  _push(`<!---->`);
                }
              } else {
                return [
                  createVNode("button", {
                    type: "button",
                    class: ui.value.link({ class: unref(props).ui?.link, active: isSelected })
                  }, [
                    (item.children?.length)
                      ? (openBlock(), createBlock(_sfc_main$K, {
                          key: 0,
                          name: isExpanded ? unref(appConfig).ui.icons.folderOpen : unref(appConfig).ui.icons.folder,
                          class: ui.value.linkLeadingIcon({ class: unref(props).ui?.linkLeadingIcon })
                        }, null, 8, ["name", "class"]))
                      : (openBlock(), createBlock(_sfc_main$1, {
                          key: 1,
                          filename: item.label,
                          class: ui.value.linkLeadingIcon({ class: unref(props).ui?.linkLeadingIcon })
                        }, null, 8, ["filename", "class"])),
                    createVNode("span", {
                      class: ui.value.linkLabel({ class: unref(props).ui?.linkLabel })
                    }, toDisplayString(item.label), 3),
                    (item.children?.length)
                      ? (openBlock(), createBlock("span", {
                          key: 2,
                          class: ui.value.linkTrailing({ class: unref(props).ui?.linkTrailing })
                        }, [
                          createVNode(_sfc_main$K, {
                            name: unref(appConfig).ui.icons.chevronDown,
                            class: ui.value.linkTrailingIcon({ class: unref(props).ui?.linkTrailingIcon })
                          }, null, 8, ["name", "class"])
                        ], 2))
                      : createCommentVNode("", true)
                  ], 2),
                  (item.children?.length && isExpanded)
                    ? (openBlock(), createBlock("ul", {
                        key: 0,
                        role: "group",
                        class: ui.value.listWithChildren({ class: unref(props).ui?.listWithChildren })
                      }, [
                        createVNode(unref(ReuseTreeTemplate), {
                          items: item.children,
                          level: level + 1
                        }, null, 8, ["items", "level"])
                      ], 2))
                    : createCommentVNode("", true)
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
          _push(`</li>`);
        });
        _push(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
            return (openBlock(), createBlock("li", {
              key: `${level}-${index}`,
              role: "presentation",
              class: level > 1 ? ui.value.itemWithChildren({ class: unref(props).ui?.itemWithChildren }) : ui.value.item({ class: unref(props).ui?.item })
            }, [
              createVNode(unref(TreeItem_default), {
                level: level,
                value: item,
                "as-child": ""
              }, {
                default: withCtx(({ isExpanded, isSelected }) => [
                  createVNode("button", {
                    type: "button",
                    class: ui.value.link({ class: unref(props).ui?.link, active: isSelected })
                  }, [
                    (item.children?.length)
                      ? (openBlock(), createBlock(_sfc_main$K, {
                          key: 0,
                          name: isExpanded ? unref(appConfig).ui.icons.folderOpen : unref(appConfig).ui.icons.folder,
                          class: ui.value.linkLeadingIcon({ class: unref(props).ui?.linkLeadingIcon })
                        }, null, 8, ["name", "class"]))
                      : (openBlock(), createBlock(_sfc_main$1, {
                          key: 1,
                          filename: item.label,
                          class: ui.value.linkLeadingIcon({ class: unref(props).ui?.linkLeadingIcon })
                        }, null, 8, ["filename", "class"])),
                    createVNode("span", {
                      class: ui.value.linkLabel({ class: unref(props).ui?.linkLabel })
                    }, toDisplayString(item.label), 3),
                    (item.children?.length)
                      ? (openBlock(), createBlock("span", {
                          key: 2,
                          class: ui.value.linkTrailing({ class: unref(props).ui?.linkTrailing })
                        }, [
                          createVNode(_sfc_main$K, {
                            name: unref(appConfig).ui.icons.chevronDown,
                            class: ui.value.linkTrailingIcon({ class: unref(props).ui?.linkTrailingIcon })
                          }, null, 8, ["name", "class"])
                        ], 2))
                      : createCommentVNode("", true)
                  ], 2),
                  (item.children?.length && isExpanded)
                    ? (openBlock(), createBlock("ul", {
                        key: 0,
                        role: "group",
                        class: ui.value.listWithChildren({ class: unref(props).ui?.listWithChildren })
                      }, [
                        createVNode(unref(ReuseTreeTemplate), {
                          items: item.children,
                          level: level + 1
                        }, null, 8, ["items", "level"])
                      ], 2))
                    : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["level", "value"])
            ], 2))
          }), 128))
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`<div${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }))}>`);
  _push(ssrRenderComponent(unref(TreeRoot_default), {
    modelValue: model.value,
    "onUpdate:modelValue": $event => ((model).value = $event),
    expanded: expanded.value,
    "onUpdate:expanded": $event => ((expanded).value = $event),
    class: ui.value.list({ class: unref(props).ui?.list }),
    items: items.value,
    "get-key": (item2) => item2.path
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(ReuseTreeTemplate), {
          items: items.value,
          level: 1
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode(unref(ReuseTreeTemplate), {
            items: items.value,
            level: 1
          }, null, 8, ["items"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="${ssrRenderClass(ui.value.content({ class: unref(props).ui?.content }))}">`);
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(lastSelectedItem.value?.component), null, null), _parent);
  _push(`</div></div><!--]-->`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/prose/CodeTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=CodeTree-BaULk34n.mjs.map
