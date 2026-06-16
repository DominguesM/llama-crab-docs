import { u as useSeo, d as defineOgImageComponent, _ as __nuxt_component_0 } from './defineOgImageComponent-Cm85jsZS.mjs';
import { X as useRoute, $ as useDocusI18n, ac as withAsyncContext, ad as useAsyncData, ae as queryCollection, c as createError } from './server.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import 'property-information';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "landing",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { locale, isEnabled } = useDocusI18n();
    const collectionName = computed(() => isEnabled.value ? `landing_${locale.value}` : "landing");
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(collectionName.value, () => queryCollection(collectionName.value).path(route.path).first(), '$fXdHIklQnE' /* nuxt-injected */)), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    const title = page.value.seo?.title || page.value.title;
    const description = page.value.seo?.description || page.value.description;
    useSeo({
      title,
      description,
      type: "website",
      ogImage: page.value?.seo?.ogImage
    });
    if (!page.value?.seo?.ogImage) {
      defineOgImageComponent("Landing", {
        title,
        description
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      if (unref(page)) {
        _push(ssrRenderComponent(_component_ContentRenderer, mergeProps({ value: unref(page) }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/templates/landing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=landing-ByfTNjeF.mjs.map
