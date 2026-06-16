import { useSlots, shallowRef, computed, unref, mergeProps, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { n as useComponentProps, p as useAppConfig, t as tv, P as Primitive, ah as Slot } from './server.mjs';

const theme = {
  "slots": {
    "root": "flex flex-col lg:grid lg:grid-cols-10 lg:gap-10",
    "left": "lg:col-span-2",
    "center": "lg:col-span-8",
    "right": "lg:col-span-2 order-first lg:order-last"
  },
  "variants": {
    "left": {
      "true": ""
    },
    "right": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "left": true,
      "right": true,
      "class": {
        "center": "lg:col-span-6"
      }
    },
    {
      "left": false,
      "right": false,
      "class": {
        "center": "lg:col-span-10"
      }
    }
  ]
};

const _sfc_main = {
  __name: "UPage",
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
},
  setup(__props) {

const _props = __props;
const slots = useSlots();
const props = useComponentProps("page", _props);
const appConfig = useAppConfig();
const hasLeft = shallowRef(!!slots.left);
const hasRight = shallowRef(!!slots.right);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.page || {} })({
  left: hasLeft.value,
  right: hasRight.value
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: unref(props).as,
    "data-slot": "root",
    class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.left) {
          _push(ssrRenderComponent(unref(Slot), {
            "data-slot": "left",
            class: ui.value.left({ class: unref(props).ui?.left })
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "left")
                ]
              }
            }),
            _: 3
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-slot="center" class="${
          ssrRenderClass(ui.value.center({ class: unref(props).ui?.center }))
        }"${
          _scopeId
        }>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
        _push(`</div>`);
        if (!!slots.right) {
          _push(ssrRenderComponent(unref(Slot), {
            "data-slot": "right",
            class: ui.value.right({ class: unref(props).ui?.right })
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "right")
                ]
              }
            }),
            _: 3
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          (!!slots.left)
            ? (openBlock(), createBlock(unref(Slot), {
                key: 0,
                "data-slot": "left",
                class: ui.value.left({ class: unref(props).ui?.left })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "left")
                ]),
                _: 3
              }, 8, ["class"]))
            : createCommentVNode("", true),
          createVNode("div", {
            "data-slot": "center",
            class: ui.value.center({ class: unref(props).ui?.center })
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2),
          (!!slots.right)
            ? (openBlock(), createBlock(unref(Slot), {
                key: 1,
                "data-slot": "right",
                class: ui.value.right({ class: unref(props).ui?.right })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "right")
                ]),
                _: 3
              }, 8, ["class"]))
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
//# sourceMappingURL=Page-DrQeQ56y.mjs.map
