import { useSlots, useModel, computed, useTemplateRef, shallowRef, watch, mergeProps, unref, isRef, withCtx, createSlots, renderList, renderSlot, createVNode, mergeModels, ref, toValue, toRef, nextTick, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, Fragment, withKeys, defineComponent, withMemo, withModifiers, toRefs, watchSyncEffect, cloneVNode, createElementBlock, normalizeStyle, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { a0 as defu, aa as isEqual } from '../nitro/nitro.mjs';
import { reactivePick, refDebounced, useDebounceFn, useActiveElement, useEventListener, createReusableTemplate, refThrottled, useVModel, createEventHook, useParentElement, unrefElement } from '@vueuse/core';
import { n as useComponentProps, o as useLocale, D as useContentSearch, E as useColorMode, p as useAppConfig, q as useForwardProps, t as tv, F as _sfc_main$w, G as transformUI, s as omit, C as useKbd$1, _ as _sfc_main$F, r as pickLinkProps, m as get, v as _sfc_main$G, w as _sfc_main$K, x as _sfc_main$H, y as _sfc_main$I, z as _sfc_main$t, A as _sfc_main$E, B as highlight, h as useId, a as useCollection, i as useForwardExpose, P as Primitive, b as useTypeahead, u as usePrimitiveElement, d as useDirection, f as useComposing, M as MAP_KEY_TO_FOCUS_INTENT, k as getActiveElement, l as getNextMatch, e as createContext, j as handleAndDispatchCustomEvent$1, g as getFocusIntent, V as VisuallyHidden_default } from './server.mjs';
import { f as findValuesBetween } from './arrays-DR3eABVO.mjs';
import { refAutoReset, isClient } from '@vueuse/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { useFuse } from '@vueuse/integrations/useFuse';
import { _ as _sfc_main$2 } from './Input-C8_ogO9K.mjs';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'aria-hidden';
import 'vaul-vue';
import '@floating-ui/vue';
import 'motion-v';

//#region src/shared/useFormControl.ts
function useFormControl(el) {
	return computed(() => toValue(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}

//#region src/shared/useKbd.ts
function useKbd() {
	return {
		ALT: "Alt",
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		BACKSPACE: "Backspace",
		CAPS_LOCK: "CapsLock",
		CONTROL: "Control",
		DELETE: "Delete",
		END: "End",
		ENTER: "Enter",
		ESCAPE: "Escape",
		F1: "F1",
		F10: "F10",
		F11: "F11",
		F12: "F12",
		F2: "F2",
		F3: "F3",
		F4: "F4",
		F5: "F5",
		F6: "F6",
		F7: "F7",
		F8: "F8",
		F9: "F9",
		HOME: "Home",
		META: "Meta",
		PAGE_DOWN: "PageDown",
		PAGE_UP: "PageUp",
		SHIFT: "Shift",
		SPACE: " ",
		TAB: "Tab",
		CTRL: "Control",
		ASTERISK: "*",
		SPACE_CODE: "Space"
	};
}

var VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const valueState = computed(() => props.checked ?? props.value);
    watch(valueState, (cur, prev) => {
      if (!currentElement.value) return;
      const input = currentElement.value;
      const inputProto = (void 0).HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (setValue && cur !== prev) {
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        setValue.call(input, cur);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VisuallyHidden_default, mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, {
        ...props,
        ..._ctx.$attrs
      }, { as: "input" }), null, 16);
    };
  }
});
var VisuallyHiddenInputBubble_default = VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default;

//#region src/VisuallyHidden/VisuallyHiddenInput.vue?vue&type=script&setup=true&lang.ts
var VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const isFormArrayEmptyAndRequired = computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
		const parsedValue = computed(() => {
			if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
				name: props.name,
				value: props.value
			}];
			else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
				if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
					name: `${props.name}[${index}][${key}]`,
					value
				}));
				else return {
					name: `${props.name}[${index}]`,
					value: obj
				};
			});
			else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
				name: `${props.name}[${key}]`,
				value
			}));
			return [];
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: _ctx.name }, {
				...props,
				..._ctx.$attrs
			}, {
				name: _ctx.name,
				value: _ctx.value
			}), null, 16, ["name", "value"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(parsedValue.value, (parsed) => {
				return openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: parsed.name }, { ref_for: true }, {
					...props,
					..._ctx.$attrs
				}, {
					name: parsed.name,
					value: parsed.value
				}), null, 16, ["name", "value"]);
			}), 128))], 2112);
		};
	}
});

//#endregion
//#region src/VisuallyHidden/VisuallyHiddenInput.vue
var VisuallyHiddenInput_default = VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/utils.ts
function queryCheckedElement(parentEl) {
	return parentEl?.querySelector("[data-state=checked]");
}
function valueComparator(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
	else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}

//#region src/Listbox/ListboxRoot.vue?vue&type=script&setup=true&lang.ts
const [injectListboxRootContext, provideListboxRootContext] = /*#__PURE__*/ createContext("ListboxRoot");
var ListboxRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "vertical"
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		highlightOnHover: {
			type: Boolean,
			required: false
		},
		by: {
			type: [String, Function],
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"entryFocus",
		"leave"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = toRefs(props);
		const { getItems } = useCollection({ isProvider: true });
		const { handleTypeaheadSearch } = useTypeahead();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const kbd = useKbd();
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(currentElement);
		const firstValue = ref();
		const isUserAction = ref(false);
		const focusable = ref(true);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		function onValueChange(val) {
			isUserAction.value = true;
			if (props.multiple) {
				const modelArray = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = modelArray.findIndex((i) => compare(i, val, props.by));
				if (props.selectionBehavior === "toggle") {
					index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
					modelValue.value = modelArray;
				} else {
					modelValue.value = [val];
					firstValue.value = val;
				}
			} else if (props.selectionBehavior === "toggle") if (compare(modelValue.value, val, props.by)) modelValue.value = void 0;
			else modelValue.value = val;
			else modelValue.value = val;
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		const highlightedElement = ref(null);
		const previousElement = ref(null);
		const isVirtual = ref(false);
		const isComposing = ref(false);
		const virtualFocusHook = createEventHook();
		const virtualKeydownHook = createEventHook();
		const virtualHighlightHook = createEventHook();
		function getCollectionItem() {
			return getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
		}
		function changeHighlight(el, scrollIntoView = true, focus) {
			if (!el) return;
			highlightedElement.value = el;
			if (focus ?? focusable.value) highlightedElement.value.focus();
			if (scrollIntoView) highlightedElement.value.scrollIntoView({ block: "nearest" });
			const highlightedItem = getItems().find((i) => i.ref === el);
			emits("highlight", highlightedItem);
		}
		function highlightItem(value) {
			if (isVirtual.value) virtualHighlightHook.trigger(value);
			else {
				const item = getItems().find((i) => compare(i.value, value, props.by));
				if (item) {
					highlightedElement.value = item.ref;
					changeHighlight(item.ref);
				}
			}
		}
		function onKeydownEnter(event) {
			if (highlightedElement.value && highlightedElement.value.isConnected) {
				event.preventDefault();
				event.stopPropagation();
				if (!isComposing.value) highlightedElement.value.click();
			}
		}
		function onKeydownTypeAhead(event) {
			if (!focusable.value) return;
			isUserAction.value = true;
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
				if (isMetaKey && event.key === "a" && multiple.value) {
					const collection = getItems();
					const values = collection.map((i) => i.value);
					modelValue.value = [...values];
					event.preventDefault();
					const lastItem = collection.at(-1);
					if (lastItem) changeHighlight(lastItem.ref);
				} else if (!isMetaKey) {
					const el = handleTypeaheadSearch(event.key, getItems());
					if (el) changeHighlight(el);
				}
			}
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		function onCompositionStart() {
			isComposing.value = true;
		}
		function onCompositionEnd() {
			nextTick(() => {
				isComposing.value = false;
			});
		}
		function highlightFirstItem() {
			nextTick(() => {
				const event = new KeyboardEvent("keydown", { key: "PageUp" });
				onKeydownNavigation(event);
			});
		}
		function onLeave(event) {
			const el = highlightedElement.value;
			if (el?.isConnected) previousElement.value = el;
			highlightedElement.value = null;
			emits("leave", event);
		}
		function onEnter(event) {
			const entryFocusEvent = new CustomEvent("listbox.entryFocus", {
				bubbles: false,
				cancelable: true
			});
			event.currentTarget?.dispatchEvent(entryFocusEvent);
			emits("entryFocus", entryFocusEvent);
			if (entryFocusEvent.defaultPrevented) return;
			if (previousElement.value) changeHighlight(previousElement.value);
			else {
				const el = getCollectionItem()?.[0];
				changeHighlight(el);
			}
		}
		function onKeydownNavigation(event) {
			const intent = getFocusIntent(event, orientation.value, dir.value);
			if (!intent) return;
			let collection = getCollectionItem();
			if (highlightedElement.value) {
				if (intent === "last") collection.reverse();
				else if (intent === "prev" || intent === "next") {
					if (intent === "prev") collection.reverse();
					const currentIndex = collection.indexOf(highlightedElement.value);
					collection = collection.slice(currentIndex + 1);
				}
				handleMultipleReplace(event, collection[0]);
			}
			if (collection.length) {
				const index = !highlightedElement.value && intent === "prev" ? collection.length - 1 : 0;
				changeHighlight(collection[index]);
			}
			if (isVirtual.value) return virtualKeydownHook.trigger(event);
		}
		function handleMultipleReplace(event, targetEl) {
			if (isVirtual.value || props.selectionBehavior !== "replace" || !multiple.value || !Array.isArray(modelValue.value)) return;
			const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
			if (isMetaKey && !event.shiftKey) return;
			if (event.shiftKey) {
				const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
				let lastValue = collection.find((i) => i.ref === targetEl)?.value;
				if (event.key === kbd.END) lastValue = collection.at(-1)?.value;
				else if (event.key === kbd.HOME) lastValue = collection[0]?.value;
				if (!lastValue || !firstValue.value) return;
				const values = findValuesBetween(collection.map((i) => i.value), firstValue.value, lastValue);
				modelValue.value = values;
			}
		}
		async function highlightSelected(event, scroll = true) {
			if (!isClient) return;
			await nextTick();
			if (isVirtual.value) virtualFocusHook.trigger(event);
			else {
				const collection = getCollectionItem();
				const item = collection.find((i) => i.dataset.state === "checked");
				const focus = scroll ? void 0 : false;
				if (item) changeHighlight(item, scroll, focus);
				else if (collection.length) changeHighlight(collection[0], scroll, focus);
			}
		}
		let hasHighlightedOnMount = false;
		watch(modelValue, () => {
			if (!isUserAction.value) {
				const scroll = hasHighlightedOnMount;
				hasHighlightedOnMount = true;
				nextTick(() => {
					highlightSelected(void 0, scroll);
				});
			}
		}, {
			immediate: true,
			deep: true
		});
		__expose({
			highlightedElement,
			highlightItem,
			highlightFirstItem,
			highlightSelected,
			getItems
		});
		provideListboxRootContext({
			modelValue,
			onValueChange,
			multiple,
			orientation,
			dir,
			disabled,
			highlightOnHover,
			highlightedElement,
			isVirtual,
			virtualFocusHook,
			virtualKeydownHook,
			virtualHighlightHook,
			by: props.by,
			firstValue,
			selectionBehavior,
			focusable,
			onLeave,
			onEnter,
			changeHighlight,
			onKeydownEnter,
			onKeydownNavigation,
			onKeydownTypeAhead,
			onCompositionStart,
			onCompositionEnd,
			highlightFirstItem
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				dir: unref(dir),
				"data-disabled": unref(disabled) ? "" : void 0,
				onPointerleave: onLeave,
				onFocusout: _cache[0] || (_cache[0] = async (event) => {
					const target = event.relatedTarget || event.target;
					await nextTick();
					if (highlightedElement.value && unref(currentElement) && !unref(currentElement).contains(target)) onLeave(event);
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					name: _ctx.name,
					value: unref(modelValue),
					disabled: unref(disabled),
					required: _ctx.required
				}, null, 8, [
					"name",
					"value",
					"disabled",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"dir",
				"data-disabled"
			]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxRoot.vue
var ListboxRoot_default = ListboxRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxContent.vue?vue&type=script&setup=true&lang.ts
var ListboxContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxContent",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { CollectionSlot } = useCollection();
		const rootContext = injectListboxRootContext();
		const isClickFocus = refAutoReset(false, 10);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					role: "listbox",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					tabindex: unref(rootContext).focusable.value ? unref(rootContext).highlightedElement.value ? "-1" : "0" : "-1",
					"aria-orientation": unref(rootContext).orientation.value,
					"aria-multiselectable": !!unref(rootContext).multiple.value,
					"data-orientation": unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => isClickFocus.value = true, ["left"])),
					onFocus: _cache[1] || (_cache[1] = (ev) => {
						if (unref(isClickFocus)) return;
						unref(rootContext).onEnter(ev);
					}),
					onKeydown: [
						_cache[2] || (_cache[2] = withKeys((event) => {
							if (unref(rootContext).orientation.value === "vertical" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || unref(rootContext).orientation.value === "horizontal" && (event.key === "ArrowUp" || event.key === "ArrowDown")) return;
							event.preventDefault();
							unref(rootContext).focusable.value && unref(rootContext).onKeydownNavigation(event);
						}, [
							"down",
							"up",
							"left",
							"right",
							"home",
							"end"
						])),
						withKeys(unref(rootContext).onKeydownEnter, ["enter"]),
						unref(rootContext).onKeydownTypeAhead
					]
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"tabindex",
					"aria-orientation",
					"aria-multiselectable",
					"data-orientation",
					"onKeydown"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Listbox/ListboxContent.vue
var ListboxContent_default = ListboxContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxFilter.vue?vue&type=script&setup=true&lang.ts
var ListboxFilter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxFilter",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
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
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		const rootContext = injectListboxRootContext();
		const { primitiveElement} = usePrimitiveElement();
		const disabled = computed(() => props.disabled || rootContext.disabled.value || false);
		const activedescendant = ref();
		watchSyncEffect(() => activedescendant.value = rootContext.highlightedElement.value?.id);
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing((event) => {
			modelValue.value = event.target.value;
			rootContext.onCompositionEnd();
			rootContext.highlightFirstItem();
		});
		function onCompositionStart() {
			rootContext.onCompositionStart();
			handleCompositionStart();
		}
		function handleInput(event) {
			if (isComposing.value) return;
			modelValue.value = event.target.value;
			rootContext.highlightFirstItem();
		}
		function handleKeydownNavigation(event) {
			if (isComposing.value) return;
			event.preventDefault();
			rootContext.onKeydownNavigation(event);
		}
		function handleKeydownEnter(event) {
			if (isComposing.value) return;
			rootContext.onKeydownEnter(event);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: unref(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				onKeydown: [withKeys(handleKeydownNavigation, [
					"down",
					"up",
					"home",
					"end"
				]), withKeys(handleKeydownEnter, ["enter"])],
				onInput: handleInput,
				onCompositionstart: onCompositionStart,
				onCompositionend: unref(handleCompositionEnd)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onCompositionend"
			]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxFilter.vue
var ListboxFilter_default = ListboxFilter_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxGroup.vue?vue&type=script&setup=true&lang.ts
const [injectListboxGroupContext, provideListboxGroupContext] = /*#__PURE__*/ createContext("ListboxGroup");
var ListboxGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxGroup",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const id = useId(void 0, "reka-listbox-group");
		provideListboxGroupContext({ id });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props, { "aria-labelledby": unref(id) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxGroup.vue
var ListboxGroup_default = ListboxGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxGroupLabel.vue?vue&type=script&setup=true&lang.ts
var ListboxGroupLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxGroupLabel",
	props: {
		for: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		const groupContext = injectListboxGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxGroupLabel.vue
var ListboxGroupLabel_default = ListboxGroupLabel_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxItem.vue?vue&type=script&setup=true&lang.ts
const LISTBOX_SELECT = "listbox.select";
const [injectListboxItemContext, provideListboxItemContext] = /*#__PURE__*/ createContext("ListboxItem");
var ListboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
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
			default: "div"
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId(void 0, "reka-listbox-item");
		const { CollectionItem } = useCollection();
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectListboxRootContext();
		const isHighlighted = computed(() => currentElement.value != null && currentElement.value === rootContext.highlightedElement.value);
		const isSelected = computed(() => valueComparator(rootContext.modelValue.value, props.value, rootContext.by));
		const disabled = computed(() => rootContext.disabled.value || props.disabled);
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			if (!disabled.value && ev) {
				rootContext.onValueChange(props.value);
				rootContext.changeHighlight(currentElement.value);
			}
		}
		function handleSelectCustomEvent(ev) {
			const eventDetail = {
				originalEvent: ev,
				value: props.value
			};
			handleAndDispatchCustomEvent$1(LISTBOX_SELECT, handleSelect, eventDetail);
		}
		provideListboxItemContext({ isSelected });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: _ctx.value }, {
				default: withCtx(() => [withMemo([
					isHighlighted.value,
					isSelected.value,
					disabled.value,
					unref(rootContext).focusable.value
				], () => createVNode(unref(Primitive), mergeProps({ id: unref(id) }, _ctx.$attrs, {
					ref: unref(forwardRef),
					role: "option",
					tabindex: unref(rootContext).focusable.value ? isHighlighted.value ? "0" : "-1" : -1,
					"aria-selected": isSelected.value,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					disabled: disabled.value ? "" : void 0,
					"data-disabled": disabled.value ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					"data-state": isSelected.value ? "checked" : "unchecked",
					onClick: handleSelectCustomEvent,
					onKeydown: withKeys(withModifiers(handleSelectCustomEvent, ["prevent"]), ["space"]),
					onPointermove: _cache[0] || (_cache[0] = () => {
						if (unref(rootContext).highlightedElement.value === unref(currentElement)) return;
						if (unref(rootContext).highlightOnHover.value) unref(rootContext).changeHighlight(unref(currentElement), false, false);
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"tabindex",
					"aria-selected",
					"as",
					"as-child",
					"disabled",
					"data-disabled",
					"data-highlighted",
					"data-state",
					"onKeydown"
				]), _cache, 1)]),
				_: 3
			}, 8, ["value"]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxItem.vue
var ListboxItem_default = ListboxItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxItemIndicator.vue?vue&type=script&setup=true&lang.ts
var ListboxItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const itemContext = injectListboxItemContext();
		return (_ctx, _cache) => {
			return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxItemIndicator.vue
var ListboxItemIndicator_default = ListboxItemIndicator_vue_vue_type_script_setup_true_lang_default;

var ListboxVirtualizer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ListboxVirtualizer",
  props: {
    options: {
      type: Array,
      required: true
    },
    overscan: {
      type: Number,
      required: false
    },
    estimateSize: {
      type: [Number, Function],
      required: false
    },
    textContent: {
      type: Function,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const rootContext = injectListboxRootContext();
    const parentEl = useParentElement();
    const { getItems } = useCollection();
    rootContext.isVirtual.value = true;
    const padding = computed(() => {
      const el = parentEl.value;
      if (!el) return {
        start: 0,
        end: 0
      };
      else {
        const styles = (void 0).getComputedStyle(el);
        return {
          start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
          end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
        };
      }
    });
    const virtualizer = useVirtualizer({
      get scrollPaddingStart() {
        return padding.value.start;
      },
      get scrollPaddingEnd() {
        return padding.value.end;
      },
      get count() {
        return props.options.length;
      },
      get horizontal() {
        return rootContext.orientation.value === "horizontal";
      },
      estimateSize(index) {
        if (typeof props.estimateSize === "function") return props.estimateSize(index);
        return props.estimateSize ?? 28;
      },
      getScrollElement() {
        return parentEl.value;
      },
      overscan: props.overscan ?? 12
    });
    const virtualizedItems = computed(() => virtualizer.value.getVirtualItems().map((item) => {
      const defaultNode = slots.default({
        option: props.options[item.index],
        virtualizer: virtualizer.value,
        virtualItem: item
      })[0];
      const targetNode = defaultNode.type === Fragment && Array.isArray(defaultNode.children) ? defaultNode.children.find((child) => typeof child.type !== "symbol") : defaultNode;
      return {
        item,
        is: cloneVNode(targetNode, {
          "key": `${item.key}`,
          "data-index": item.index,
          "aria-setsize": props.options.length,
          "aria-posinset": item.index + 1,
          "style": {
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${item.start}px)`,
            overflowAnchor: "none"
          }
        })
      };
    }));
    rootContext.virtualFocusHook.on((event) => {
      const index = props.options.findIndex((option) => {
        if (Array.isArray(rootContext.modelValue.value)) return compare(option, rootContext.modelValue.value[0], rootContext.by);
        else return compare(option, rootContext.modelValue.value, rootContext.by);
      });
      if (index !== -1) {
        event?.preventDefault();
        virtualizer.value.scrollToIndex(index, { align: "start" });
        requestAnimationFrame(() => {
          const item = queryCheckedElement(parentEl.value);
          if (item) {
            rootContext.changeHighlight(item);
            if (event) item?.focus();
          }
        });
      } else rootContext.highlightFirstItem();
    });
    rootContext.virtualHighlightHook.on((value) => {
      const index = props.options.findIndex((option) => {
        return compare(option, value, rootContext.by);
      });
      virtualizer.value.scrollToIndex(index, { align: "start" });
      requestAnimationFrame(() => {
        const item = queryCheckedElement(parentEl.value);
        if (item) rootContext.changeHighlight(item);
      });
    });
    const search = refAutoReset("", 1e3);
    const optionsWithMetadata = computed(() => {
      const parseTextContent = (option) => {
        if (props.textContent) return props.textContent(option);
        else return option?.toString().toLowerCase();
      };
      return props.options.map((option, index) => ({
        index,
        textContent: parseTextContent(option)
      }));
    });
    function handleMultipleReplace(event, intent) {
      if (!rootContext.firstValue?.value || !rootContext.multiple.value || !Array.isArray(rootContext.modelValue.value)) return;
      const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
      const lastValue = collection.find((i) => i.ref === rootContext.highlightedElement.value)?.value;
      if (!lastValue) return;
      let value = null;
      switch (intent) {
        case "prev":
        case "next": {
          value = findValuesBetween(props.options, rootContext.firstValue.value, lastValue);
          break;
        }
        case "first": {
          value = findValuesBetween(props.options, rootContext.firstValue.value, props.options?.[0]);
          break;
        }
        case "last": {
          value = findValuesBetween(props.options, rootContext.firstValue.value, props.options.at(-1));
          break;
        }
      }
      rootContext.modelValue.value = value;
    }
    rootContext.virtualKeydownHook.on((event) => {
      const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
      const isTabKey = event.key === "Tab" && !isMetaKey;
      if (isTabKey) return;
      let intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
      if (isMetaKey && event.key === "a" && rootContext.multiple.value) {
        event.preventDefault();
        rootContext.modelValue.value = [...props.options];
        intent = "last";
      } else if (event.shiftKey && intent) handleMultipleReplace(event, intent);
      if (["first", "last"].includes(intent)) {
        event.preventDefault();
        const index = intent === "first" ? 0 : props.options.length - 1;
        virtualizer.value.scrollToIndex(index);
        requestAnimationFrame(() => {
          const items = getItems();
          const item = intent === "first" ? items[0] : items.at(-1);
          if (item) rootContext.changeHighlight(item.ref);
        });
      } else if (!intent && !isMetaKey) {
        search.value += event.key;
        const currentIndex = Number(getActiveElement()?.getAttribute("data-index"));
        const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
        const filteredOptions = optionsWithMetadata.value.map((i) => i.textContent ?? "");
        const next = getNextMatch(filteredOptions, search.value, currentMatch);
        const nextMatch = optionsWithMetadata.value.find((option) => option.textContent === next);
        if (nextMatch) {
          virtualizer.value.scrollToIndex(nextMatch.index, { align: "start" });
          requestAnimationFrame(() => {
            const item = parentEl.value.querySelector(`[data-index="${nextMatch.index}"]`);
            if (item instanceof HTMLElement) rootContext.changeHighlight(item);
          });
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        "data-reka-virtualizer": "",
        style: normalizeStyle({
          position: "relative",
          width: "100%",
          height: `${unref(virtualizer).getTotalSize()}px`
        })
      }, [(openBlock(true), createElementBlock(Fragment, null, renderList(virtualizedItems.value, ({ is, item }) => {
        return openBlock(), createBlock(resolveDynamicComponent(is), { key: item.index });
      }), 128))], 4);
    };
  }
});
var ListboxVirtualizer_default = ListboxVirtualizer_vue_vue_type_script_setup_true_lang_default;

function itemHasDescription(item, descriptionKey) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const value = get(item, descriptionKey);
  return value !== void 0 && value !== null && value !== "";
}
function getSize(size, hasDescription) {
  if (hasDescription) {
    return {
      xs: 44,
      sm: 48,
      md: 52,
      lg: 56,
      xl: 60
    }[size];
  }
  return {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40
  }[size];
}
function getEstimateSize(items, size, descriptionKey, hasDescriptionSlot) {
  const sizeWithDescription = getSize(size, true);
  const sizeWithoutDescription = getSize(size, false);
  if (hasDescriptionSlot) {
    return () => sizeWithDescription;
  }
  if (!descriptionKey) {
    return () => sizeWithoutDescription;
  }
  return (index) => {
    return itemHasDescription(items[index], descriptionKey) ? sizeWithDescription : sizeWithoutDescription;
  };
}

const theme$1 = {
  "slots": {
    "root": "flex flex-col min-h-0 min-w-0 divide-y divide-default",
    "input": "",
    "close": "",
    "back": "p-0",
    "content": "relative overflow-hidden flex flex-col",
    "footer": "p-1",
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1 focus:outline-none",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingHighlightedIcon": "shrink-0 text-dimmed hidden group-data-highlighted:inline-flex",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate space-x-1 text-dimmed",
    "itemLabelBase": "text-highlighted [&>mark]:text-primary [&>mark]:bg-primary/15",
    "itemLabelPrefix": "text-default",
    "itemLabelSuffix": "text-dimmed [&>mark]:text-primary [&>mark]:bg-primary/15",
    "itemDescription": "truncate text-muted [&>mark]:text-primary [&>mark]:bg-primary/15"
  },
  "variants": {
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    },
    "size": {
      "xs": {
        "input": "[&>input]:h-10",
        "empty": "py-3 text-xs",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailing": "gap-1",
        "itemTrailingIcon": "size-4",
        "itemTrailingHighlightedIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "input": "[&>input]:h-11",
        "empty": "py-4 text-xs",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailing": "gap-1.5",
        "itemTrailingIcon": "size-4",
        "itemTrailingHighlightedIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "input": "[&>input]:h-12",
        "empty": "py-6 text-sm",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailing": "gap-1.5",
        "itemTrailingIcon": "size-5",
        "itemTrailingHighlightedIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "input": "[&>input]:h-13",
        "empty": "py-7 text-sm",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailing": "gap-2",
        "itemTrailingIcon": "size-5",
        "itemTrailingHighlightedIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "input": "[&>input]:h-14",
        "empty": "py-8 text-base",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailing": "gap-2",
        "itemTrailingIcon": "size-6",
        "itemTrailingHighlightedIcon": "size-6",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "lg"
      }
    },
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

const _sfc_main$1 = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: "UCommandPalette",
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  as: { type: null, required: false },
  size: { type: null, required: false },
  icon: { type: null, required: false },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  childrenIcon: { type: null, required: false },
  placeholder: { type: String, required: false },
  autofocus: { type: Boolean, required: false, default: true },
  close: { type: [Boolean, Object], required: false },
  closeIcon: { type: null, required: false },
  back: { type: [Boolean, Object], required: false, default: true },
  backIcon: { type: null, required: false },
  input: { type: [Boolean, Object], required: false, default: true },
  groups: { type: Array, required: false },
  fuse: { type: Object, required: false },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  valueKey: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  preserveGroupOrder: { type: Boolean, required: false, default: false },
  searchDelay: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  multiple: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  highlightOnHover: { type: Boolean, required: false, default: true },
  selectionBehavior: { type: String, required: false },
  by: { type: [String, Function], required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
}, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {},
  }),
  emits: /*@__PURE__*/mergeModels(["update:modelValue", "highlight", "entryFocus", "leave", "update:open"], ["update:searchTerm"]),
  setup(__props, { emit: __emit }) {


const _props = __props;
const emits = __emit;
const slots = useSlots();
const props = useComponentProps("commandPalette", _props);
const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "disabled", "multiple", "modelValue", "defaultValue", "highlightOnHover", "by"), emits);
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false;
  return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, "md", props.descriptionKey, !!slots["item-description"])
  });
});
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: {
      type: Object,
      required: true
    },
    group: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  }
});
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.commandPalette || {} })({
  size: props.size,
  virtualize: !!props.virtualize
}));
const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: [props.labelKey, props.descriptionKey, "suffix"]
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}));
const history = ref([]);
const placeholder = computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t("commandPalette.placeholder"));
const groups = computed(() => history.value?.length ? [history.value[history.value.length - 1]] : props.groups);
const items = computed(() => groups.value?.filter((group) => {
  if (!group.id) {
    console.warn(`[@nuxt/ui] CommandPalette group is missing an \`id\` property`);
    return false;
  }
  if (group.ignoreFilter) {
    return false;
  }
  return true;
})?.flatMap((group) => group.items?.map((item) => ({ ...item, group: group.id })) || []) || []);
const fuseSearchTerm = refDebounced(searchTerm, () => props.searchDelay);
const { results: fuseResults } = useFuse(fuseSearchTerm, items, fuse);
const throttledFuseResults = refThrottled(fuseResults, 16, true);
function processGroupItems(group, items2) {
  let processedItems = items2;
  if (group?.postFilter && typeof group.postFilter === "function") {
    processedItems = group.postFilter(fuseSearchTerm.value, processedItems);
  }
  return {
    ...group,
    items: processedItems.slice(0, fuse.value.resultLimit).map((item) => {
      return {
        ...item,
        labelHtml: item.labelHtml ?? highlight(item, fuseSearchTerm.value, props.labelKey, void 0, fuse.value.fuseOptions?.useTokenSearch),
        suffixHtml: item.suffixHtml ?? highlight(item, fuseSearchTerm.value, "suffix", [props.labelKey], fuse.value.fuseOptions?.useTokenSearch),
        descriptionHtml: item.descriptionHtml ?? highlight(item, fuseSearchTerm.value, props.descriptionKey, [props.labelKey, "suffix"], fuse.value.fuseOptions?.useTokenSearch)
      };
    })
  };
}
const filteredGroups = computed(() => {
  const currentGroups = groups.value;
  const groupsById = throttledFuseResults.value.reduce((acc, result2) => {
    const { item, matches } = result2;
    if (!item.group) {
      return acc;
    }
    acc[item.group] ||= [];
    acc[item.group]?.push({ ...item, matches });
    return acc;
  }, {});
  if (props.preserveGroupOrder) {
    const processedGroups = [];
    for (const group of currentGroups || []) {
      if (!group.items?.length) {
        continue;
      }
      const items2 = group.ignoreFilter ? group.items : groupsById[group.id];
      if (!items2?.length) {
        continue;
      }
      const processedGroup = processGroupItems(group, items2);
      if (processedGroup.items?.length) {
        processedGroups.push(processedGroup);
      }
    }
    return processedGroups;
  }
  const fuseGroups = Object.entries(groupsById).map(([id, items2]) => {
    const group = currentGroups?.find((group2) => group2.id === id);
    if (!group) {
      return;
    }
    const processedGroup = processGroupItems(group, items2);
    return processedGroup.items?.length ? processedGroup : void 0;
  }).filter((group) => !!group);
  const result = [...fuseGroups];
  for (const group of currentGroups || []) {
    if (!group.ignoreFilter || !group.items?.length) {
      continue;
    }
    const processedGroup = processGroupItems(group, group.items);
    if (!processedGroup.items?.length) {
      continue;
    }
    const originalIndex = currentGroups.indexOf(group);
    const precedingIds = /* @__PURE__ */ new Set();
    for (let i = 0; i < originalIndex; i++) {
      precedingIds.add(currentGroups[i].id);
    }
    let insertAfter = -1;
    for (let i = 0; i < result.length; i++) {
      if (precedingIds.has(result[i].id)) {
        insertAfter = i;
      }
    }
    result.splice(insertAfter + 1, 0, processedGroup);
  }
  return result;
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group.items || []));
const rootRef = useTemplateRef("rootRef");
watch(filteredGroups, () => {
  nextTick(() => {
    rootRef.value?.highlightFirstItem();
  });
});
function navigate(item) {
  if (!item.children?.length) {
    return;
  }
  history.value.push({
    id: `history-${history.value.length}`,
    label: item.label,
    slot: item.slot,
    placeholder: item.placeholder,
    items: item.children
  });
  searchTerm.value = "";
  rootRef.value?.highlightFirstItem();
}
function navigateBack() {
  if (!history.value.length) {
    return;
  }
  history.value.pop();
  searchTerm.value = "";
  rootRef.value?.highlightFirstItem();
}
function onBackspace() {
  if (!searchTerm.value) {
    navigateBack();
  }
}
function onSelect(e, item) {
  if (item.children?.length) {
    e.preventDefault();
    navigate(item);
  } else {
    item.onSelect?.(e);
  }
}

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
    default: withCtx(({ item, index, group }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_sfc_main$F, mergeProps(unref(pickLinkProps)(item), { custom: "" }), {
          default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(ListboxItem_default), {
                value: unref(props).valueKey ? unref(get)(item, unref(props).valueKey) : unref(omit)(item, ['matches', 'group', 'onSelect', 'labelHtml', 'suffixHtml', 'descriptionHtml', 'children']),
                disabled: item.disabled,
                "as-child": "",
                onSelect: $event => (onSelect($event, item))
              }, {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    _push(ssrRenderComponent(_sfc_main$G, mergeProps(slotProps, {
                      "data-slot": "item",
                      class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item, item.class], active: active || item.active })
                    }), {
                      default: withCtx((_, _push, _parent, _scopeId) => {
                        if (_push) {
                          ssrRenderSlot(_ctx.$slots, item.slot || group?.slot || 'item', {
                            item: item,
                            index: index,
                            ui: ui.value
                          }, () => {
                            ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                              item: item,
                              index: index,
                              ui: ui.value
                            }, () => {
                              if (item.loading) {
                                _push(ssrRenderComponent(_sfc_main$K, {
                                  name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
                                  "data-slot": "itemLeadingIcon",
                                  class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                }, null, _parent, _scopeId));
                              } else if (item.icon) {
                                _push(ssrRenderComponent(_sfc_main$K, {
                                  name: item.icon,
                                  "data-slot": "itemLeadingIcon",
                                  class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                }, null, _parent, _scopeId));
                              } else if (item.avatar) {
                                _push(ssrRenderComponent(_sfc_main$H, mergeProps({
                                  size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                }, item.avatar, {
                                  "data-slot": "itemLeadingAvatar",
                                  class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                }), null, _parent, _scopeId));
                              } else if (item.chip) {
                                _push(ssrRenderComponent(_sfc_main$I, mergeProps({
                                  size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                  inset: "",
                                  standalone: ""
                                }, item.chip, {
                                  "data-slot": "itemLeadingChip",
                                  class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                }), null, _parent, _scopeId));
                              } else {
                                _push(`<!---->`);
                              }
                            }, _push, _parent, _scopeId);
                            if (item.prefix || (item.labelHtml || unref(get)(item, unref(props).labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])) {
                              _push(`<span data-slot="itemWrapper" class="${
                                ssrRenderClass(ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] }))
                              }"${
                                _scopeId
                              }><span data-slot="itemLabel" class="${
                                ssrRenderClass(ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, item.ui?.itemLabel], active: active || item.active }))
                              }"${
                                _scopeId
                              }>`);
                              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                item: item,
                                index: index,
                                ui: ui.value
                              }, () => {
                                if (item.prefix) {
                                  _push(`<span data-slot="itemLabelPrefix" class="${
                                    ssrRenderClass(ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] }))
                                  }"${
                                    _scopeId
                                  }>${
                                    ssrInterpolate(item.prefix)
                                  }</span>`);
                                } else {
                                  _push(`<!---->`);
                                }
                                if (item.labelHtml) {
                                  _push(`<span data-slot="itemLabelBase" class="${
                                    ssrRenderClass(ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }))
                                  }"${
                                    _scopeId
                                  }>${
                                    (item.labelHtml) ?? ''
                                  }</span>`);
                                } else {
                                  _push(`<span data-slot="itemLabelBase" class="${
                                    ssrRenderClass(ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }))
                                  }"${
                                    _scopeId
                                  }>${
                                    ssrInterpolate(unref(get)(item, unref(props).labelKey))
                                  }</span>`);
                                }
                                if (item.suffixHtml) {
                                  _push(`<span data-slot="itemLabelSuffix" class="${
                                    ssrRenderClass(ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }))
                                  }"${
                                    _scopeId
                                  }>${
                                    (item.suffixHtml) ?? ''
                                  }</span>`);
                                } else if (item.suffix) {
                                  _push(`<span data-slot="itemLabelSuffix" class="${
                                    ssrRenderClass(ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }))
                                  }"${
                                    _scopeId
                                  }>${
                                    ssrInterpolate(item.suffix)
                                  }</span>`);
                                } else {
                                  _push(`<!---->`);
                                }
                              }, _push, _parent, _scopeId);
                              _push(`</span>`);
                              if (item.descriptionHtml) {
                                _push(`<span data-slot="itemDescription" class="${
                                  ssrRenderClass(ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }))
                                }"${
                                  _scopeId
                                }>${
                                  (item.descriptionHtml) ?? ''
                                }</span>`);
                              } else if (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) {
                                _push(`<span data-slot="itemDescription" class="${
                                  ssrRenderClass(ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }))
                                }"${
                                  _scopeId
                                }>`);
                                ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                  item: item,
                                  index: index,
                                  ui: ui.value
                                }, () => {
                                  _push(`${ssrInterpolate(unref(get)(item, unref(props).descriptionKey))}`);
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
                              ssrRenderClass(ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] }))
                            }"${
                              _scopeId
                            }>`);
                            ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                              item: item,
                              index: index,
                              ui: ui.value
                            }, () => {
                              if (item.children && item.children.length > 0) {
                                _push(ssrRenderComponent(_sfc_main$K, {
                                  name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
                                  "data-slot": "itemTrailingIcon",
                                  class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                }, null, _parent, _scopeId));
                              } else if (item.kbds?.length) {
                                _push(`<span data-slot="itemTrailingKbds" class="${
                                  ssrRenderClass(ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))
                                }"${
                                  _scopeId
                                }><!--[-->`);
                                ssrRenderList(item.kbds, (kbd, kbdIndex) => {
                                  _push(ssrRenderComponent(_sfc_main$t, mergeProps({
                                    key: kbdIndex,
                                    size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                  }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, _parent, _scopeId));
                                });
                                _push(`<!--]--></span>`);
                              } else if (group?.highlightedIcon) {
                                _push(ssrRenderComponent(_sfc_main$K, {
                                  name: group.highlightedIcon,
                                  "data-slot": "itemTrailingHighlightedIcon",
                                  class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                }, null, _parent, _scopeId));
                              } else {
                                _push(`<!---->`);
                              }
                            }, _push, _parent, _scopeId);
                            if (!item.children?.length) {
                              _push(ssrRenderComponent(unref(ListboxItemIndicator_default), { "as-child": "" }, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    _push(ssrRenderComponent(_sfc_main$K, {
                                      name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                      "data-slot": "itemTrailingIcon",
                                      class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                    }, null, _parent, _scopeId));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$K, {
                                        name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                        "data-slot": "itemTrailingIcon",
                                        class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                      }, null, 8, ["name", "class"])
                                    ]
                                  }
                                }),
                                _: 2
                              }, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                            _push(`</span>`);
                          }, _push, _parent, _scopeId);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, item.slot || group?.slot || 'item', {
                              item: item,
                              index: index,
                              ui: ui.value
                            }, () => [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                                item: item,
                                index: index,
                                ui: ui.value
                              }, () => [
                                (item.loading)
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 0,
                                      name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
                                      "data-slot": "itemLeadingIcon",
                                      class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                    }, null, 8, ["name", "class"]))
                                  : (item.icon)
                                    ? (openBlock(), createBlock(_sfc_main$K, {
                                        key: 1,
                                        name: item.icon,
                                        "data-slot": "itemLeadingIcon",
                                        class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                      }, null, 8, ["name", "class"]))
                                    : (item.avatar)
                                      ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                                          key: 2,
                                          size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                        }, item.avatar, {
                                          "data-slot": "itemLeadingAvatar",
                                          class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                        }), null, 16, ["size", "class"]))
                                      : (item.chip)
                                        ? (openBlock(), createBlock(_sfc_main$I, mergeProps({
                                            key: 3,
                                            size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                            inset: "",
                                            standalone: ""
                                          }, item.chip, {
                                            "data-slot": "itemLeadingChip",
                                            class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                          }), null, 16, ["size", "class"]))
                                        : createCommentVNode("", true)
                              ]),
                              (item.prefix || (item.labelHtml || unref(get)(item, unref(props).labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]))
                                ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    "data-slot": "itemWrapper",
                                    class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
                                  }, [
                                    createVNode("span", {
                                      "data-slot": "itemLabel",
                                      class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                                    }, [
                                      renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                        item: item,
                                        index: index,
                                        ui: ui.value
                                      }, () => [
                                        (item.prefix)
                                          ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              "data-slot": "itemLabelPrefix",
                                              class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                            }, toDisplayString(item.prefix), 3))
                                          : createCommentVNode("", true),
                                        (item.labelHtml)
                                          ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              "data-slot": "itemLabelBase",
                                              class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                              innerHTML: item.labelHtml
                                            }, null, 10, ["innerHTML"]))
                                          : (openBlock(), createBlock("span", {
                                              key: 2,
                                              "data-slot": "itemLabelBase",
                                              class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                            }, toDisplayString(unref(get)(item, unref(props).labelKey)), 3)),
                                        (item.suffixHtml)
                                          ? (openBlock(), createBlock("span", {
                                              key: 3,
                                              "data-slot": "itemLabelSuffix",
                                              class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                              innerHTML: item.suffixHtml
                                            }, null, 10, ["innerHTML"]))
                                          : (item.suffix)
                                            ? (openBlock(), createBlock("span", {
                                                key: 4,
                                                "data-slot": "itemLabelSuffix",
                                                class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                              }, toDisplayString(item.suffix), 3))
                                            : createCommentVNode("", true)
                                      ])
                                    ], 2),
                                    (item.descriptionHtml)
                                      ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          "data-slot": "itemDescription",
                                          class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
                                          innerHTML: item.descriptionHtml
                                        }, null, 10, ["innerHTML"]))
                                      : (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])
                                        ? (openBlock(), createBlock("span", {
                                            key: 1,
                                            "data-slot": "itemDescription",
                                            class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
                                          }, [
                                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                              item: item,
                                              index: index,
                                              ui: ui.value
                                            }, () => [
                                              createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                            ])
                                          ], 2))
                                        : createCommentVNode("", true)
                                  ], 2))
                                : createCommentVNode("", true),
                              createVNode("span", {
                                "data-slot": "itemTrailing",
                                class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
                              }, [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                  item: item,
                                  index: index,
                                  ui: ui.value
                                }, () => [
                                  (item.children && item.children.length > 0)
                                    ? (openBlock(), createBlock(_sfc_main$K, {
                                        key: 0,
                                        name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
                                        "data-slot": "itemTrailingIcon",
                                        class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                      }, null, 8, ["name", "class"]))
                                    : (item.kbds?.length)
                                      ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          "data-slot": "itemTrailingKbds",
                                          class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                                            return (openBlock(), createBlock(_sfc_main$t, mergeProps({
                                              key: kbdIndex,
                                              size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                            }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16, ["size"]))
                                          }), 128))
                                        ], 2))
                                      : (group?.highlightedIcon)
                                        ? (openBlock(), createBlock(_sfc_main$K, {
                                            key: 2,
                                            name: group.highlightedIcon,
                                            "data-slot": "itemTrailingHighlightedIcon",
                                            class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                          }, null, 8, ["name", "class"]))
                                        : createCommentVNode("", true)
                                ]),
                                (!item.children?.length)
                                  ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
                                      key: 0,
                                      "as-child": ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$K, {
                                          name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                          "data-slot": "itemTrailingIcon",
                                          class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                        }, null, 8, ["name", "class"])
                                      ]),
                                      _: 2
                                    }, 1024))
                                  : createCommentVNode("", true)
                              ], 2)
                            ])
                          ]
                        }
                      }),
                      _: 2
                    }, _parent, _scopeId));
                  } else {
                    return [
                      createVNode(_sfc_main$G, mergeProps(slotProps, {
                        "data-slot": "item",
                        class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item, item.class], active: active || item.active })
                      }), {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot || group?.slot || 'item', {
                            item: item,
                            index: index,
                            ui: ui.value
                          }, () => [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                              item: item,
                              index: index,
                              ui: ui.value
                            }, () => [
                              (item.loading)
                                ? (openBlock(), createBlock(_sfc_main$K, {
                                    key: 0,
                                    name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
                                    "data-slot": "itemLeadingIcon",
                                    class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                  }, null, 8, ["name", "class"]))
                                : (item.icon)
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 1,
                                      name: item.icon,
                                      "data-slot": "itemLeadingIcon",
                                      class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                    }, null, 8, ["name", "class"]))
                                  : (item.avatar)
                                    ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                                        key: 2,
                                        size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                      }, item.avatar, {
                                        "data-slot": "itemLeadingAvatar",
                                        class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                      }), null, 16, ["size", "class"]))
                                    : (item.chip)
                                      ? (openBlock(), createBlock(_sfc_main$I, mergeProps({
                                          key: 3,
                                          size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                          inset: "",
                                          standalone: ""
                                        }, item.chip, {
                                          "data-slot": "itemLeadingChip",
                                          class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                        }), null, 16, ["size", "class"]))
                                      : createCommentVNode("", true)
                            ]),
                            (item.prefix || (item.labelHtml || unref(get)(item, unref(props).labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]))
                              ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  "data-slot": "itemWrapper",
                                  class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
                                }, [
                                  createVNode("span", {
                                    "data-slot": "itemLabel",
                                    class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                                  }, [
                                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                      item: item,
                                      index: index,
                                      ui: ui.value
                                    }, () => [
                                      (item.prefix)
                                        ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            "data-slot": "itemLabelPrefix",
                                            class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                          }, toDisplayString(item.prefix), 3))
                                        : createCommentVNode("", true),
                                      (item.labelHtml)
                                        ? (openBlock(), createBlock("span", {
                                            key: 1,
                                            "data-slot": "itemLabelBase",
                                            class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                            innerHTML: item.labelHtml
                                          }, null, 10, ["innerHTML"]))
                                        : (openBlock(), createBlock("span", {
                                            key: 2,
                                            "data-slot": "itemLabelBase",
                                            class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                          }, toDisplayString(unref(get)(item, unref(props).labelKey)), 3)),
                                      (item.suffixHtml)
                                        ? (openBlock(), createBlock("span", {
                                            key: 3,
                                            "data-slot": "itemLabelSuffix",
                                            class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                            innerHTML: item.suffixHtml
                                          }, null, 10, ["innerHTML"]))
                                        : (item.suffix)
                                          ? (openBlock(), createBlock("span", {
                                              key: 4,
                                              "data-slot": "itemLabelSuffix",
                                              class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                            }, toDisplayString(item.suffix), 3))
                                          : createCommentVNode("", true)
                                    ])
                                  ], 2),
                                  (item.descriptionHtml)
                                    ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        "data-slot": "itemDescription",
                                        class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
                                        innerHTML: item.descriptionHtml
                                      }, null, 10, ["innerHTML"]))
                                    : (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])
                                      ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          "data-slot": "itemDescription",
                                          class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
                                        }, [
                                          renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                            item: item,
                                            index: index,
                                            ui: ui.value
                                          }, () => [
                                            createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                          ])
                                        ], 2))
                                      : createCommentVNode("", true)
                                ], 2))
                              : createCommentVNode("", true),
                            createVNode("span", {
                              "data-slot": "itemTrailing",
                              class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                item: item,
                                index: index,
                                ui: ui.value
                              }, () => [
                                (item.children && item.children.length > 0)
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 0,
                                      name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
                                      "data-slot": "itemTrailingIcon",
                                      class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                    }, null, 8, ["name", "class"]))
                                  : (item.kbds?.length)
                                    ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        "data-slot": "itemTrailingKbds",
                                        class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                                          return (openBlock(), createBlock(_sfc_main$t, mergeProps({
                                            key: kbdIndex,
                                            size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                          }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16, ["size"]))
                                        }), 128))
                                      ], 2))
                                    : (group?.highlightedIcon)
                                      ? (openBlock(), createBlock(_sfc_main$K, {
                                          key: 2,
                                          name: group.highlightedIcon,
                                          "data-slot": "itemTrailingHighlightedIcon",
                                          class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                        }, null, 8, ["name", "class"]))
                                      : createCommentVNode("", true)
                              ]),
                              (!item.children?.length)
                                ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
                                    key: 0,
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$K, {
                                        name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                        "data-slot": "itemTrailingIcon",
                                        class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                      }, null, 8, ["name", "class"])
                                    ]),
                                    _: 2
                                  }, 1024))
                                : createCommentVNode("", true)
                            ], 2)
                          ])
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
                createVNode(unref(ListboxItem_default), {
                  value: unref(props).valueKey ? unref(get)(item, unref(props).valueKey) : unref(omit)(item, ['matches', 'group', 'onSelect', 'labelHtml', 'suffixHtml', 'descriptionHtml', 'children']),
                  disabled: item.disabled,
                  "as-child": "",
                  onSelect: $event => (onSelect($event, item))
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$G, mergeProps(slotProps, {
                      "data-slot": "item",
                      class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item, item.class], active: active || item.active })
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, item.slot || group?.slot || 'item', {
                          item: item,
                          index: index,
                          ui: ui.value
                        }, () => [
                          renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                            item: item,
                            index: index,
                            ui: ui.value
                          }, () => [
                            (item.loading)
                              ? (openBlock(), createBlock(_sfc_main$K, {
                                  key: 0,
                                  name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
                                  "data-slot": "itemLeadingIcon",
                                  class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                }, null, 8, ["name", "class"]))
                              : (item.icon)
                                ? (openBlock(), createBlock(_sfc_main$K, {
                                    key: 1,
                                    name: item.icon,
                                    "data-slot": "itemLeadingIcon",
                                    class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                  }, null, 8, ["name", "class"]))
                                : (item.avatar)
                                  ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                                      key: 2,
                                      size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                    }, item.avatar, {
                                      "data-slot": "itemLeadingAvatar",
                                      class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                    }), null, 16, ["size", "class"]))
                                  : (item.chip)
                                    ? (openBlock(), createBlock(_sfc_main$I, mergeProps({
                                        key: 3,
                                        size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                        inset: "",
                                        standalone: ""
                                      }, item.chip, {
                                        "data-slot": "itemLeadingChip",
                                        class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                      }), null, 16, ["size", "class"]))
                                    : createCommentVNode("", true)
                          ]),
                          (item.prefix || (item.labelHtml || unref(get)(item, unref(props).labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]))
                            ? (openBlock(), createBlock("span", {
                                key: 0,
                                "data-slot": "itemWrapper",
                                class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
                              }, [
                                createVNode("span", {
                                  "data-slot": "itemLabel",
                                  class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                                }, [
                                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                    item: item,
                                    index: index,
                                    ui: ui.value
                                  }, () => [
                                    (item.prefix)
                                      ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          "data-slot": "itemLabelPrefix",
                                          class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                        }, toDisplayString(item.prefix), 3))
                                      : createCommentVNode("", true),
                                    (item.labelHtml)
                                      ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          "data-slot": "itemLabelBase",
                                          class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                          innerHTML: item.labelHtml
                                        }, null, 10, ["innerHTML"]))
                                      : (openBlock(), createBlock("span", {
                                          key: 2,
                                          "data-slot": "itemLabelBase",
                                          class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                        }, toDisplayString(unref(get)(item, unref(props).labelKey)), 3)),
                                    (item.suffixHtml)
                                      ? (openBlock(), createBlock("span", {
                                          key: 3,
                                          "data-slot": "itemLabelSuffix",
                                          class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                          innerHTML: item.suffixHtml
                                        }, null, 10, ["innerHTML"]))
                                      : (item.suffix)
                                        ? (openBlock(), createBlock("span", {
                                            key: 4,
                                            "data-slot": "itemLabelSuffix",
                                            class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                          }, toDisplayString(item.suffix), 3))
                                        : createCommentVNode("", true)
                                  ])
                                ], 2),
                                (item.descriptionHtml)
                                  ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      "data-slot": "itemDescription",
                                      class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
                                      innerHTML: item.descriptionHtml
                                    }, null, 10, ["innerHTML"]))
                                  : (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])
                                    ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        "data-slot": "itemDescription",
                                        class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
                                      }, [
                                        renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                          item: item,
                                          index: index,
                                          ui: ui.value
                                        }, () => [
                                          createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                        ])
                                      ], 2))
                                    : createCommentVNode("", true)
                              ], 2))
                            : createCommentVNode("", true),
                          createVNode("span", {
                            "data-slot": "itemTrailing",
                            class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
                          }, [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                              item: item,
                              index: index,
                              ui: ui.value
                            }, () => [
                              (item.children && item.children.length > 0)
                                ? (openBlock(), createBlock(_sfc_main$K, {
                                    key: 0,
                                    name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
                                    "data-slot": "itemTrailingIcon",
                                    class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                  }, null, 8, ["name", "class"]))
                                : (item.kbds?.length)
                                  ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      "data-slot": "itemTrailingKbds",
                                      class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                                        return (openBlock(), createBlock(_sfc_main$t, mergeProps({
                                          key: kbdIndex,
                                          size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                        }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16, ["size"]))
                                      }), 128))
                                    ], 2))
                                  : (group?.highlightedIcon)
                                    ? (openBlock(), createBlock(_sfc_main$K, {
                                        key: 2,
                                        name: group.highlightedIcon,
                                        "data-slot": "itemTrailingHighlightedIcon",
                                        class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                      }, null, 8, ["name", "class"]))
                                    : createCommentVNode("", true)
                            ]),
                            (!item.children?.length)
                              ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$K, {
                                      name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                      "data-slot": "itemTrailingIcon",
                                      class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                    }, null, 8, ["name", "class"])
                                  ]),
                                  _: 2
                                }, 1024))
                              : createCommentVNode("", true)
                          ], 2)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class"])
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "onSelect"])
              ]
            }
          }),
          _: 2
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(_sfc_main$F, mergeProps(unref(pickLinkProps)(item), { custom: "" }), {
            default: withCtx(({ active, ...slotProps }) => [
              createVNode(unref(ListboxItem_default), {
                value: unref(props).valueKey ? unref(get)(item, unref(props).valueKey) : unref(omit)(item, ['matches', 'group', 'onSelect', 'labelHtml', 'suffixHtml', 'descriptionHtml', 'children']),
                disabled: item.disabled,
                "as-child": "",
                onSelect: $event => (onSelect($event, item))
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$G, mergeProps(slotProps, {
                    "data-slot": "item",
                    class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item, item.class], active: active || item.active })
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, item.slot || group?.slot || 'item', {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => [
                        renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                          item: item,
                          index: index,
                          ui: ui.value
                        }, () => [
                          (item.loading)
                            ? (openBlock(), createBlock(_sfc_main$K, {
                                key: 0,
                                name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
                                "data-slot": "itemLeadingIcon",
                                class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                              }, null, 8, ["name", "class"]))
                            : (item.icon)
                              ? (openBlock(), createBlock(_sfc_main$K, {
                                  key: 1,
                                  name: item.icon,
                                  "data-slot": "itemLeadingIcon",
                                  class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                }, null, 8, ["name", "class"]))
                              : (item.avatar)
                                ? (openBlock(), createBlock(_sfc_main$H, mergeProps({
                                    key: 2,
                                    size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                  }, item.avatar, {
                                    "data-slot": "itemLeadingAvatar",
                                    class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                  }), null, 16, ["size", "class"]))
                                : (item.chip)
                                  ? (openBlock(), createBlock(_sfc_main$I, mergeProps({
                                      key: 3,
                                      size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                      inset: "",
                                      standalone: ""
                                    }, item.chip, {
                                      "data-slot": "itemLeadingChip",
                                      class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                    }), null, 16, ["size", "class"]))
                                  : createCommentVNode("", true)
                        ]),
                        (item.prefix || (item.labelHtml || unref(get)(item, unref(props).labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]))
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "itemWrapper",
                              class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
                            }, [
                              createVNode("span", {
                                "data-slot": "itemLabel",
                                class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                              }, [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                  item: item,
                                  index: index,
                                  ui: ui.value
                                }, () => [
                                  (item.prefix)
                                    ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        "data-slot": "itemLabelPrefix",
                                        class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                      }, toDisplayString(item.prefix), 3))
                                    : createCommentVNode("", true),
                                  (item.labelHtml)
                                    ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        "data-slot": "itemLabelBase",
                                        class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                        innerHTML: item.labelHtml
                                      }, null, 10, ["innerHTML"]))
                                    : (openBlock(), createBlock("span", {
                                        key: 2,
                                        "data-slot": "itemLabelBase",
                                        class: ui.value.itemLabelBase({ class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                      }, toDisplayString(unref(get)(item, unref(props).labelKey)), 3)),
                                  (item.suffixHtml)
                                    ? (openBlock(), createBlock("span", {
                                        key: 3,
                                        "data-slot": "itemLabelSuffix",
                                        class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                        innerHTML: item.suffixHtml
                                      }, null, 10, ["innerHTML"]))
                                    : (item.suffix)
                                      ? (openBlock(), createBlock("span", {
                                          key: 4,
                                          "data-slot": "itemLabelSuffix",
                                          class: ui.value.itemLabelSuffix({ class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                        }, toDisplayString(item.suffix), 3))
                                      : createCommentVNode("", true)
                                ])
                              ], 2),
                              (item.descriptionHtml)
                                ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    "data-slot": "itemDescription",
                                    class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
                                    innerHTML: item.descriptionHtml
                                  }, null, 10, ["innerHTML"]))
                                : (unref(get)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])
                                  ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      "data-slot": "itemDescription",
                                      class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
                                    }, [
                                      renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                        item: item,
                                        index: index,
                                        ui: ui.value
                                      }, () => [
                                        createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                      ])
                                    ], 2))
                                  : createCommentVNode("", true)
                            ], 2))
                          : createCommentVNode("", true),
                        createVNode("span", {
                          "data-slot": "itemTrailing",
                          class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
                        }, [
                          renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                            item: item,
                            index: index,
                            ui: ui.value
                          }, () => [
                            (item.children && item.children.length > 0)
                              ? (openBlock(), createBlock(_sfc_main$K, {
                                  key: 0,
                                  name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
                                  "data-slot": "itemTrailingIcon",
                                  class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                }, null, 8, ["name", "class"]))
                              : (item.kbds?.length)
                                ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    "data-slot": "itemTrailingKbds",
                                    class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                                      return (openBlock(), createBlock(_sfc_main$t, mergeProps({
                                        key: kbdIndex,
                                        size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                      }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16, ["size"]))
                                    }), 128))
                                  ], 2))
                                : (group?.highlightedIcon)
                                  ? (openBlock(), createBlock(_sfc_main$K, {
                                      key: 2,
                                      name: group.highlightedIcon,
                                      "data-slot": "itemTrailingHighlightedIcon",
                                      class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                    }, null, 8, ["name", "class"]))
                                  : createCommentVNode("", true)
                          ]),
                          (!item.children?.length)
                            ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$K, {
                                    name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                    "data-slot": "itemTrailingIcon",
                                    class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                  }, null, 8, ["name", "class"])
                                ]),
                                _: 2
                              }, 1024))
                            : createCommentVNode("", true)
                        ], 2)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class"])
                ]),
                _: 2
              }, 1032, ["value", "disabled", "onSelect"])
            ]),
            _: 2
          }, 1040)
        ]
      }
    }),
    _: 3
  }, _parent));
  _push(ssrRenderComponent(unref(ListboxRoot_default), mergeProps({ ...unref(rootProps), ..._ctx.$attrs }, {
    ref_key: "rootRef",
    ref: rootRef,
    "selection-behavior": unref(props).selectionBehavior,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (unref(props).input) {
          _push(ssrRenderComponent(unref(ListboxFilter_default), {
            modelValue: searchTerm.value,
            "onUpdate:modelValue": $event => ((searchTerm).value = $event),
            "as-child": ""
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(_sfc_main$2, mergeProps({
                  variant: "none",
                  size: unref(props).size
                }, typeof unref(props).input === 'object' ? unref(props).input : {}, {
                  placeholder: placeholder.value,
                  autofocus: unref(props).autofocus,
                  loading: unref(props).loading,
                  "loading-icon": unref(props).loadingIcon,
                  "trailing-icon": unref(props).trailingIcon,
                  icon: unref(props).icon || unref(appConfig).ui.icons.search,
                  "data-slot": "input",
                  class: ui.value.input({ class: unref(props).ui?.input }),
                  onKeydown: onBackspace
                }), createSlots({ _: 2 }, [
                  (history.value?.length && (unref(props).back || !!slots.back))
                    ? {
                        name: "leading",
                        fn: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            ssrRenderSlot(_ctx.$slots, "back", { ui: ui.value }, () => {
                              _push(ssrRenderComponent(_sfc_main$E, mergeProps({
                                size: unref(props).size,
                                icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
                                color: "neutral",
                                variant: "link",
                                "aria-label": unref(t)('commandPalette.back')
                              }, typeof unref(props).back === 'object' ? unref(props).back : {}, {
                                "data-slot": "back",
                                class: ui.value.back({ class: unref(props).ui?.back }),
                                onClick: navigateBack
                              }), null, _parent, _scopeId));
                            }, _push, _parent, _scopeId);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [
                                createVNode(_sfc_main$E, mergeProps({
                                  size: unref(props).size,
                                  icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
                                  color: "neutral",
                                  variant: "link",
                                  "aria-label": unref(t)('commandPalette.back')
                                }, typeof unref(props).back === 'object' ? unref(props).back : {}, {
                                  "data-slot": "back",
                                  class: ui.value.back({ class: unref(props).ui?.back }),
                                  onClick: navigateBack
                                }), null, 16, ["size", "icon", "aria-label", "class"])
                              ])
                            ]
                          }
                        }),
                        key: "0"
                      }
                    : undefined,
                  (unref(props).close || !!slots.close)
                    ? {
                        name: "trailing",
                        fn: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                              if (unref(props).close) {
                                _push(ssrRenderComponent(_sfc_main$E, mergeProps({
                                  size: unref(props).size,
                                  icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
                                  color: "neutral",
                                  variant: "ghost",
                                  "aria-label": unref(t)('commandPalette.close')
                                }, typeof unref(props).close === 'object' ? unref(props).close : {}, {
                                  "data-slot": "close",
                                  class: ui.value.close({ class: unref(props).ui?.close }),
                                  onClick: $event => (emits('update:open', false))
                                }), null, _parent, _scopeId));
                              } else {
                                _push(`<!---->`);
                              }
                            }, _push, _parent, _scopeId);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                (unref(props).close)
                                  ? (openBlock(), createBlock(_sfc_main$E, mergeProps({
                                      key: 0,
                                      size: unref(props).size,
                                      icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)('commandPalette.close')
                                    }, typeof unref(props).close === 'object' ? unref(props).close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: unref(props).ui?.close }),
                                      onClick: $event => (emits('update:open', false))
                                    }), null, 16, ["size", "icon", "aria-label", "class", "onClick"]))
                                  : createCommentVNode("", true)
                              ])
                            ]
                          }
                        }),
                        key: "1"
                      }
                    : undefined
                ]), _parent, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$2, mergeProps({
                    variant: "none",
                    size: unref(props).size
                  }, typeof unref(props).input === 'object' ? unref(props).input : {}, {
                    placeholder: placeholder.value,
                    autofocus: unref(props).autofocus,
                    loading: unref(props).loading,
                    "loading-icon": unref(props).loadingIcon,
                    "trailing-icon": unref(props).trailingIcon,
                    icon: unref(props).icon || unref(appConfig).ui.icons.search,
                    "data-slot": "input",
                    class: ui.value.input({ class: unref(props).ui?.input }),
                    onKeydown: withKeys(onBackspace, ["backspace"])
                  }), createSlots({ _: 2 }, [
                    (history.value?.length && (unref(props).back || !!slots.back))
                      ? {
                          name: "leading",
                          fn: withCtx(() => [
                            renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [
                              createVNode(_sfc_main$E, mergeProps({
                                size: unref(props).size,
                                icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
                                color: "neutral",
                                variant: "link",
                                "aria-label": unref(t)('commandPalette.back')
                              }, typeof unref(props).back === 'object' ? unref(props).back : {}, {
                                "data-slot": "back",
                                class: ui.value.back({ class: unref(props).ui?.back }),
                                onClick: navigateBack
                              }), null, 16, ["size", "icon", "aria-label", "class"])
                            ])
                          ]),
                          key: "0"
                        }
                      : undefined,
                    (unref(props).close || !!slots.close)
                      ? {
                          name: "trailing",
                          fn: withCtx(() => [
                            renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                              (unref(props).close)
                                ? (openBlock(), createBlock(_sfc_main$E, mergeProps({
                                    key: 0,
                                    size: unref(props).size,
                                    icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)('commandPalette.close')
                                  }, typeof unref(props).close === 'object' ? unref(props).close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(props).ui?.close }),
                                    onClick: $event => (emits('update:open', false))
                                  }), null, 16, ["size", "icon", "aria-label", "class", "onClick"]))
                                : createCommentVNode("", true)
                            ])
                          ]),
                          key: "1"
                        }
                      : undefined
                  ]), 1040, ["size", "placeholder", "autofocus", "loading", "loading-icon", "trailing-icon", "icon", "class"])
                ]
              }
            }),
            _: 3
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(ListboxContent_default), {
          "data-slot": "content",
          class: ui.value.content({ class: unref(props).ui?.content })
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (filteredGroups.value?.length) {
                _push(`<div role="presentation" data-slot="viewport" class="${
                  ssrRenderClass(ui.value.viewport({ class: unref(props).ui?.viewport }))
                }"${
                  _scopeId
                }>`);
                if (!!unref(props).virtualize) {
                  _push(ssrRenderComponent(unref(ListboxVirtualizer_default), mergeProps({
                    options: filteredItems.value,
                    "text-content": (item2) => unref(get)(item2, unref(props).labelKey)
                  }, virtualizerProps.value), {
                    default: withCtx(({ option: item, virtualItem }, _push, _parent, _scopeId) => {
                      if (_push) {
                        _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                          item: item,
                          index: virtualItem.index
                        }, null, _parent, _scopeId));
                      } else {
                        return [
                          createVNode(unref(ReuseItemTemplate), {
                            item: item,
                            index: virtualItem.index
                          }, null, 8, ["item", "index"])
                        ]
                      }
                    }),
                    _: 1
                  }, _parent, _scopeId));
                } else {
                  _push(`<!--[-->`);
                  ssrRenderList(filteredGroups.value, (group) => {
                    _push(ssrRenderComponent(unref(ListboxGroup_default), {
                      key: `group-${group.id}`,
                      "data-slot": "group",
                      class: ui.value.group({ class: unref(props).ui?.group })
                    }, {
                      default: withCtx((_, _push, _parent, _scopeId) => {
                        if (_push) {
                          if (unref(get)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : 'group-label']) {
                            _push(ssrRenderComponent(unref(ListboxGroupLabel_default), {
                              "data-slot": "label",
                              class: ui.value.label({ class: unref(props).ui?.label })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : 'group-label', {
                                    group: group,
                                    label: unref(get)(group, unref(props).labelKey),
                                    ui: ui.value
                                  }, () => {
                                    _push(`${ssrInterpolate(unref(get)(group, unref(props).labelKey))}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : 'group-label', {
                                      group: group,
                                      label: unref(get)(group, unref(props).labelKey),
                                      ui: ui.value
                                    }, () => [
                                      createTextVNode(toDisplayString(unref(get)(group, unref(props).labelKey)), 1)
                                    ])
                                  ]
                                }
                              }),
                              _: 2
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          _push(`<!--[-->`);
                          ssrRenderList(group.items, (item, index) => {
                            _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                              key: `group-${group.id}-${index}`,
                              item: item,
                              index: index,
                              group: group
                            }, null, _parent, _scopeId));
                          });
                          _push(`<!--]-->`);
                        } else {
                          return [
                            (unref(get)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : 'group-label'])
                              ? (openBlock(), createBlock(unref(ListboxGroupLabel_default), {
                                  key: 0,
                                  "data-slot": "label",
                                  class: ui.value.label({ class: unref(props).ui?.label })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : 'group-label', {
                                      group: group,
                                      label: unref(get)(group, unref(props).labelKey),
                                      ui: ui.value
                                    }, () => [
                                      createTextVNode(toDisplayString(unref(get)(group, unref(props).labelKey)), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["class"]))
                              : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item, index) => {
                              return (openBlock(), createBlock(unref(ReuseItemTemplate), {
                                key: `group-${group.id}-${index}`,
                                item: item,
                                index: index,
                                group: group
                              }, null, 8, ["item", "index", "group"]))
                            }), 128))
                          ]
                        }
                      }),
                      _: 2
                    }, _parent, _scopeId));
                  });
                  _push(`<!--]-->`);
                }
                _push(`</div>`);
              } else {
                _push(`<div data-slot="empty" class="${
                  ssrRenderClass(ui.value.empty({ class: unref(props).ui?.empty }))
                }"${
                  _scopeId
                }>`);
                ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                  _push(`${ssrInterpolate(searchTerm.value ? unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : unref(t)("commandPalette.noData"))}`);
                }, _push, _parent, _scopeId);
                _push(`</div>`);
              }
            } else {
              return [
                (filteredGroups.value?.length)
                  ? (openBlock(), createBlock("div", {
                      key: 0,
                      role: "presentation",
                      "data-slot": "viewport",
                      class: ui.value.viewport({ class: unref(props).ui?.viewport })
                    }, [
                      (!!unref(props).virtualize)
                        ? (openBlock(), createBlock(unref(ListboxVirtualizer_default), mergeProps({
                            key: 0,
                            options: filteredItems.value,
                            "text-content": (item2) => unref(get)(item2, unref(props).labelKey)
                          }, virtualizerProps.value), {
                            default: withCtx(({ option: item, virtualItem }) => [
                              createVNode(unref(ReuseItemTemplate), {
                                item: item,
                                index: virtualItem.index
                              }, null, 8, ["item", "index"])
                            ]),
                            _: 1
                          }, 16, ["options", "text-content"]))
                        : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(filteredGroups.value, (group) => {
                            return (openBlock(), createBlock(unref(ListboxGroup_default), {
                              key: `group-${group.id}`,
                              "data-slot": "group",
                              class: ui.value.group({ class: unref(props).ui?.group })
                            }, {
                              default: withCtx(() => [
                                (unref(get)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : 'group-label'])
                                  ? (openBlock(), createBlock(unref(ListboxGroupLabel_default), {
                                      key: 0,
                                      "data-slot": "label",
                                      class: ui.value.label({ class: unref(props).ui?.label })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : 'group-label', {
                                          group: group,
                                          label: unref(get)(group, unref(props).labelKey),
                                          ui: ui.value
                                        }, () => [
                                          createTextVNode(toDisplayString(unref(get)(group, unref(props).labelKey)), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]))
                                  : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item, index) => {
                                  return (openBlock(), createBlock(unref(ReuseItemTemplate), {
                                    key: `group-${group.id}-${index}`,
                                    item: item,
                                    index: index,
                                    group: group
                                  }, null, 8, ["item", "index", "group"]))
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]))
                          }), 128))
                    ], 2))
                  : (openBlock(), createBlock("div", {
                      key: 1,
                      "data-slot": "empty",
                      class: ui.value.empty({ class: unref(props).ui?.empty })
                    }, [
                      renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                        createTextVNode(toDisplayString(searchTerm.value ? unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : unref(t)("commandPalette.noData")), 1)
                      ])
                    ], 2))
              ]
            }
          }),
          _: 3
        }, _parent, _scopeId));
        if (!!slots.footer) {
          _push(`<div data-slot="footer" class="${
            ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "footer", { ui: ui.value }, null, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          (unref(props).input)
            ? (openBlock(), createBlock(unref(ListboxFilter_default), {
                key: 0,
                modelValue: searchTerm.value,
                "onUpdate:modelValue": $event => ((searchTerm).value = $event),
                "as-child": ""
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, mergeProps({
                    variant: "none",
                    size: unref(props).size
                  }, typeof unref(props).input === 'object' ? unref(props).input : {}, {
                    placeholder: placeholder.value,
                    autofocus: unref(props).autofocus,
                    loading: unref(props).loading,
                    "loading-icon": unref(props).loadingIcon,
                    "trailing-icon": unref(props).trailingIcon,
                    icon: unref(props).icon || unref(appConfig).ui.icons.search,
                    "data-slot": "input",
                    class: ui.value.input({ class: unref(props).ui?.input }),
                    onKeydown: withKeys(onBackspace, ["backspace"])
                  }), createSlots({ _: 2 }, [
                    (history.value?.length && (unref(props).back || !!slots.back))
                      ? {
                          name: "leading",
                          fn: withCtx(() => [
                            renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [
                              createVNode(_sfc_main$E, mergeProps({
                                size: unref(props).size,
                                icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
                                color: "neutral",
                                variant: "link",
                                "aria-label": unref(t)('commandPalette.back')
                              }, typeof unref(props).back === 'object' ? unref(props).back : {}, {
                                "data-slot": "back",
                                class: ui.value.back({ class: unref(props).ui?.back }),
                                onClick: navigateBack
                              }), null, 16, ["size", "icon", "aria-label", "class"])
                            ])
                          ]),
                          key: "0"
                        }
                      : undefined,
                    (unref(props).close || !!slots.close)
                      ? {
                          name: "trailing",
                          fn: withCtx(() => [
                            renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                              (unref(props).close)
                                ? (openBlock(), createBlock(_sfc_main$E, mergeProps({
                                    key: 0,
                                    size: unref(props).size,
                                    icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)('commandPalette.close')
                                  }, typeof unref(props).close === 'object' ? unref(props).close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(props).ui?.close }),
                                    onClick: $event => (emits('update:open', false))
                                  }), null, 16, ["size", "icon", "aria-label", "class", "onClick"]))
                                : createCommentVNode("", true)
                            ])
                          ]),
                          key: "1"
                        }
                      : undefined
                  ]), 1040, ["size", "placeholder", "autofocus", "loading", "loading-icon", "trailing-icon", "icon", "class"])
                ]),
                _: 3
              }, 8, ["modelValue", "onUpdate:modelValue"]))
            : createCommentVNode("", true),
          createVNode(unref(ListboxContent_default), {
            "data-slot": "content",
            class: ui.value.content({ class: unref(props).ui?.content })
          }, {
            default: withCtx(() => [
              (filteredGroups.value?.length)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    role: "presentation",
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: unref(props).ui?.viewport })
                  }, [
                    (!!unref(props).virtualize)
                      ? (openBlock(), createBlock(unref(ListboxVirtualizer_default), mergeProps({
                          key: 0,
                          options: filteredItems.value,
                          "text-content": (item2) => unref(get)(item2, unref(props).labelKey)
                        }, virtualizerProps.value), {
                          default: withCtx(({ option: item, virtualItem }) => [
                            createVNode(unref(ReuseItemTemplate), {
                              item: item,
                              index: virtualItem.index
                            }, null, 8, ["item", "index"])
                          ]),
                          _: 1
                        }, 16, ["options", "text-content"]))
                      : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(filteredGroups.value, (group) => {
                          return (openBlock(), createBlock(unref(ListboxGroup_default), {
                            key: `group-${group.id}`,
                            "data-slot": "group",
                            class: ui.value.group({ class: unref(props).ui?.group })
                          }, {
                            default: withCtx(() => [
                              (unref(get)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : 'group-label'])
                                ? (openBlock(), createBlock(unref(ListboxGroupLabel_default), {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: unref(props).ui?.label })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : 'group-label', {
                                        group: group,
                                        label: unref(get)(group, unref(props).labelKey),
                                        ui: ui.value
                                      }, () => [
                                        createTextVNode(toDisplayString(unref(get)(group, unref(props).labelKey)), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]))
                                : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item, index) => {
                                return (openBlock(), createBlock(unref(ReuseItemTemplate), {
                                  key: `group-${group.id}-${index}`,
                                  item: item,
                                  index: index,
                                  group: group
                                }, null, 8, ["item", "index", "group"]))
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"]))
                        }), 128))
                  ], 2))
                : (openBlock(), createBlock("div", {
                    key: 1,
                    "data-slot": "empty",
                    class: ui.value.empty({ class: unref(props).ui?.empty })
                  }, [
                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : unref(t)("commandPalette.noData")), 1)
                    ])
                  ], 2))
            ]),
            _: 3
          }, 8, ["class"]),
          (!!slots.footer)
            ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "footer",
                class: ui.value.footer({ class: unref(props).ui?.footer })
              }, [
                renderSlot(_ctx.$slots, "footer", { ui: ui.value })
              ], 2))
            : createCommentVNode("", true)
        ]
      }
    }),
    _: 3
  }, _parent));
  _push(`<!--]-->`);
}
}

});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/CommandPalette.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const theme = {
  "slots": {
    "modal": "",
    "input": ""
  },
  "variants": {
    "fullscreen": {
      "false": {
        "modal": "sm:max-w-3xl h-full sm:h-[28rem]"
      }
    },
    "size": {
      "xs": {},
      "sm": {},
      "md": {},
      "lg": {},
      "xl": {}
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/;
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/;
const shiftableKeys = ["arrowleft", "arrowright", "arrowup", "arrowright", "tab", "escape", "enter", "backspace"];
function convertKeyToCode(key) {
  if (/^[a-z]$/i.test(key)) {
    return `Key${key.toUpperCase()}`;
  }
  if (/^\d$/.test(key)) {
    return `Digit${key}`;
  }
  if (/^f\d+$/i.test(key)) {
    return key.toUpperCase();
  }
  const specialKeys = {
    space: "Space",
    enter: "Enter",
    escape: "Escape",
    tab: "Tab",
    backspace: "Backspace",
    delete: "Delete",
    arrowup: "ArrowUp",
    arrowdown: "ArrowDown",
    arrowleft: "ArrowLeft",
    arrowright: "ArrowRight"
  };
  return specialKeys[key.toLowerCase()] || key;
}
function defineShortcuts(config, options = {}) {
  const chainedInputs = ref([]);
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length);
  };
  const debouncedClearChainedInput = useDebounceFn(clearChainedInput, options.chainDelay ?? 800);
  const { macOS } = useKbd$1();
  const activeElement = useActiveElement();
  const layoutIndependent = options.layoutIndependent ?? false;
  const shiftableCodes = shiftableKeys.map((k) => convertKeyToCode(k));
  const onKeyDown = (e) => {
    if (!e.key) {
      return;
    }
    const useCode = layoutIndependent || e.altKey;
    const alphabetKey = useCode ? /^Key[A-Z]$/i.test(e.code) : /^[a-z]{1}$/i.test(e.key);
    const shiftableKey = useCode ? shiftableCodes.includes(e.code) : shiftableKeys.includes(e.key.toLowerCase());
    let chainedKey;
    chainedInputs.value.push(layoutIndependent ? e.code : e.key);
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join("-");
      for (const shortcut of shortcuts.value.filter((s) => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue;
        }
        if (shortcut.enabled) {
          e.preventDefault();
          shortcut.handler(e);
        }
        clearChainedInput();
        return;
      }
    }
    for (const shortcut of shortcuts.value.filter((s) => !s.chained)) {
      if (layoutIndependent) {
        if (e.code !== shortcut.key) {
          continue;
        }
      } else if (shortcut.altKey && e.altKey) {
        if (e.code !== convertKeyToCode(shortcut.key)) {
          continue;
        }
      } else {
        if (e.key.toLowerCase() !== shortcut.key) {
          continue;
        }
      }
      if (e.metaKey !== shortcut.metaKey) {
        continue;
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue;
      }
      if (e.altKey !== shortcut.altKey) {
        continue;
      }
      if ((alphabetKey || shiftableKey || shortcut.shiftKey || e.shiftKey && (e.metaKey || e.ctrlKey)) && e.shiftKey !== shortcut.shiftKey) {
        continue;
      }
      if (shortcut.enabled) {
        e.preventDefault();
        shortcut.handler(e);
      }
      clearChainedInput();
      return;
    }
    debouncedClearChainedInput();
  };
  const usingInput = computed(() => {
    const tagName = activeElement.value?.tagName;
    const contentEditable = activeElement.value?.contentEditable;
    const usingInput2 = !!(tagName === "INPUT" || tagName === "TEXTAREA" || contentEditable === "true" || contentEditable === "plaintext-only");
    if (usingInput2) {
      return activeElement.value?.name || true;
    }
    return false;
  });
  const shortcuts = computed(() => {
    return Object.entries(toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null;
      }
      let shortcut;
      if (key.includes("-") && key !== "-" && !key.includes("_") && !key.match(chainedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      if (key.includes("_") && key !== "_" && !key.match(combinedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      const chained = key.includes("-") && key !== "-" && !key.includes("_");
      if (chained) {
        if (layoutIndependent) {
          const parts = key.split("-").map((p) => convertKeyToCode(p));
          shortcut = {
            key: parts.join("-"),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          };
        } else {
          shortcut = {
            key: key.toLowerCase(),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          };
        }
      } else {
        const keySplit = key.toLowerCase().split("_").map((k) => k);
        let baseKey = keySplit.filter((k) => !["meta", "command", "ctrl", "shift", "alt", "option"].includes(k)).join("_");
        if (layoutIndependent) {
          baseKey = convertKeyToCode(baseKey);
        }
        shortcut = {
          key: baseKey,
          metaKey: keySplit.includes("meta") || keySplit.includes("command"),
          ctrlKey: keySplit.includes("ctrl"),
          shiftKey: keySplit.includes("shift"),
          altKey: keySplit.includes("alt") || keySplit.includes("option")
        };
      }
      shortcut.chained = chained;
      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false;
        shortcut.ctrlKey = true;
      }
      if (typeof shortcutConfig === "function") {
        shortcut.handler = shortcutConfig;
      } else if (typeof shortcutConfig === "object") {
        shortcut = { ...shortcut, handler: shortcutConfig.handler };
      }
      if (!shortcut.handler) {
        console.trace("[Shortcut] Invalid value");
        return null;
      }
      let enabled = true;
      if (!shortcutConfig.usingInput) {
        enabled = !usingInput.value;
      } else if (typeof shortcutConfig.usingInput === "string") {
        enabled = usingInput.value === shortcutConfig.usingInput;
      }
      shortcut.enabled = enabled;
      return shortcut;
    }).filter(Boolean);
  });
  return useEventListener("keydown", onKeyDown);
}

const _sfc_main = {
  __name: "UContentSearch",
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  size: { type: null, required: false },
  close: { type: [Boolean, Object], required: false, default: true },
  shortcut: { type: String, required: false, default: "meta_k" },
  links: { type: Array, required: false },
  navigation: { type: Array, required: false },
  files: { type: Array, required: false },
  fuse: { type: Object, required: false },
  search: { type: Function, required: false },
  searchStatus: { type: String, required: false },
  searchDelay: { type: Number, required: false, default: 100 },
  colorMode: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  overlay: { type: Boolean, required: false },
  transition: { type: Boolean, required: false },
  content: { type: Object, required: false },
  dismissible: { type: Boolean, required: false },
  fullscreen: { type: Boolean, required: false, default: false },
  modal: { type: Boolean, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  icon: { type: null, required: false },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  childrenIcon: { type: null, required: false },
  placeholder: { type: String, required: false },
  autofocus: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  closeIcon: { type: null, required: false },
  back: { type: [Boolean, Object], required: false },
  backIcon: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  highlightOnHover: { type: Boolean, required: false },
  labelKey: { type: null, required: false },
  descriptionKey: { type: null, required: false },
  preserveGroupOrder: { type: Boolean, required: false },
  virtualize: { type: [Boolean, Object], required: false },
  groups: { type: Array, required: false }
}, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {},
  }),
  emits: ["update:searchTerm"],
  setup(__props, { expose: __expose }) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("contentSearch", _props);
const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const { open, mapNavigationItems, mapLinks, mapSearchResults, postFilter } = useContentSearch();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const commandPaletteProps = useForwardProps(reactivePick(props, "size", "icon", "trailingIcon", "selectedIcon", "childrenIcon", "placeholder", "autofocus", "loading", "loadingIcon", "close", "closeIcon", "back", "backIcon", "disabled", "highlightOnHover", "labelKey", "descriptionKey", "preserveGroupOrder", "virtualize", "searchDelay"));
const modalProps = useForwardProps(reactivePick(props, "overlay", "transition", "content", "dismissible", "fullscreen", "modal", "portal"));
const getProxySlots = () => omit(slots, ["content"]);
const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    includeMatches: true,
    useTokenSearch: true
  },
  resultLimit: 12
}));
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.contentSearch || {} })({
  size: props.size,
  fullscreen: props.fullscreen
}));
const commandPaletteRef = useTemplateRef("commandPaletteRef");
const debouncedSearchTerm = refDebounced(searchTerm, () => props.searchDelay);
const rawSearchResults = shallowRef([]);
const searchResults = computed(() => mapSearchResults(rawSearchResults.value, props.navigation));
let searchRequestId = 0;
async function runSearch(term) {
  const requestId = ++searchRequestId;
  if (!props.search || !term) {
    rawSearchResults.value = [];
    return;
  }
  try {
    const results = await props.search(term, {
      limit: fuse.value.resultLimit,
      snippet: { columns: ["title", "content"], around: 20 }
    });
    if (requestId !== searchRequestId) return;
    rawSearchResults.value = results;
  } catch (err) {
    if (requestId !== searchRequestId) return;
    console.error("[ContentSearch] search failed:", err);
    rawSearchResults.value = [];
  }
}
watch(debouncedSearchTerm, runSearch);
watch(() => props.search, () => {
  if (debouncedSearchTerm.value) {
    runSearch(debouncedSearchTerm.value);
  }
});
watch(() => props.searchStatus, (status) => {
  if (status === "ready" && debouncedSearchTerm.value) {
    runSearch(debouncedSearchTerm.value);
  }
});
const linksGroup = computed(() => {
  if (!props.links?.length) {
    return null;
  }
  return { id: "links", label: t("contentSearch.links"), items: mapLinks(props.links) };
});
const searchGroups = computed(() => {
  if (!searchTerm.value || !searchResults.value.length) return [];
  return [{ id: "search", label: t("contentSearch.search"), items: searchResults.value, ignoreFilter: true }];
});
const navigationGroups = computed(() => {
  if (!props.navigation?.length) {
    return [];
  }
  if (props.navigation.some((link) => !!link.children?.length)) {
    return props.navigation.map((group) => ({
      id: group.path,
      label: group.title,
      items: mapNavigationItems(group.children || [], props.files || []),
      postFilter
    }));
  } else {
    return [{ id: "docs", items: mapNavigationItems(props.navigation, props.files || []), postFilter }];
  }
});
const themeGroup = computed(() => {
  if (!props.colorMode || colorMode?.forced) {
    return null;
  }
  return {
    id: "theme",
    label: t("contentSearch.theme"),
    items: [{
      label: t("colorMode.system"),
      icon: appConfig.ui.icons.system,
      active: colorMode.preference === "system",
      onSelect: () => {
        colorMode.preference = "system";
      }
    }, {
      label: t("colorMode.light"),
      icon: appConfig.ui.icons.light,
      active: colorMode.preference === "light",
      onSelect: () => {
        colorMode.preference = "light";
      }
    }, {
      label: t("colorMode.dark"),
      icon: appConfig.ui.icons.dark,
      active: colorMode.preference === "dark",
      onSelect: () => {
        colorMode.preference = "dark";
      }
    }]
  };
});
const groups = computed(() => {
  const groups2 = [];
  if (linksGroup.value) {
    groups2.push(linksGroup.value);
  }
  if (props.search) {
    groups2.push(...searchGroups.value);
  } else {
    groups2.push(...navigationGroups.value);
  }
  groups2.push(...props.groups || []);
  if (themeGroup.value) {
    groups2.push(themeGroup.value);
  }
  return groups2;
});
function onSelect(item) {
  if (item.disabled) {
    return;
  }
  open.value = false;
  searchTerm.value = "";
}
defineShortcuts({
  [props.shortcut]: {
    usingInput: true,
    handler: () => open.value = !open.value
  }
});
__expose({
  commandPaletteRef
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(_sfc_main$w, mergeProps({
    open: unref(open),
    "onUpdate:open": $event => (isRef(open) ? (open).value = $event : null),
    title: unref(props).title || unref(t)('contentSearch.title'),
    description: unref(props).description || unref(t)('contentSearch.description')
  }, unref(modalProps), {
    "data-slot": "modal",
    class: ui.value.modal({ class: [unref(props).ui?.modal, unref(props).class] })
  }, _attrs), {
    content: withCtx((contentData, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "content", contentData, () => {
          _push(ssrRenderComponent(_sfc_main$1, mergeProps({
            ref_key: "commandPaletteRef",
            ref: commandPaletteRef,
            "search-term": searchTerm.value,
            "onUpdate:searchTerm": $event => ((searchTerm).value = $event)
          }, unref(commandPaletteProps), {
            groups: groups.value,
            fuse: fuse.value,
            input: { fixed: true },
            ui: unref(transformUI)(unref(omit)(ui.value, ['modal']), unref(props).ui),
            "onUpdate:modelValue": onSelect,
            "onUpdate:open": $event => (open.value = $event)
          }), createSlots({ _: 2 }, [
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
        }, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "content", contentData, () => [
            createVNode(_sfc_main$1, mergeProps({
              ref_key: "commandPaletteRef",
              ref: commandPaletteRef,
              "search-term": searchTerm.value,
              "onUpdate:searchTerm": $event => ((searchTerm).value = $event)
            }, unref(commandPaletteProps), {
              groups: groups.value,
              fuse: fuse.value,
              input: { fixed: true },
              ui: unref(transformUI)(unref(omit)(ui.value, ['modal']), unref(props).ui),
              "onUpdate:modelValue": onSelect,
              "onUpdate:open": $event => (open.value = $event)
            }), createSlots({ _: 2 }, [
              renderList(getProxySlots(), (_, name) => {
                return {
                  name: name,
                  fn: withCtx((slotData) => [
                    renderSlot(_ctx.$slots, name, slotData)
                  ])
                }
              })
            ]), 1040, ["search-term", "onUpdate:searchTerm", "groups", "fuse", "ui", "onUpdate:open"])
          ])
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/content/ContentSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as default };
//# sourceMappingURL=ContentSearch-CsZJEc1B.mjs.map
