import { p as useAppConfig, ac as withAsyncContext, ai as useSiteConfig } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OgImageLanding",
  __ssrInlineRender: true,
  props: {
    title: { default: "title" },
    description: { default: "description" }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const appConfig = useAppConfig();
    const logoPath = appConfig.header?.logo?.dark || appConfig.header?.logo?.light;
    const logoSvg = ([__temp, __restore] = withAsyncContext(() => fetchLogoSvg(logoPath)), __temp = await __temp, __restore(), __temp);
    const title = (props.title || "").slice(0, 60);
    const description = (props.description || "").slice(0, 200);
    async function fetchLogoSvg(path) {
      if (!path) return "";
      try {
        const { url: siteUrl } = useSiteConfig();
        const url = path.startsWith("http") ? path : `${siteUrl}${path}`;
        const svg = await $fetch(url, { responseType: "text" });
        return svg.replace("<svg", '<svg width="100%" height="100%"');
      } catch {
        return "";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full flex items-center justify-center bg-neutral-900" }, _attrs))}><svg class="absolute right-0 top-0 opacity-50" width="629" height="593" viewBox="0 0 629 593" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_f_199_94966)"><path d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z" fill="white"></path></g><defs><filter id="filter0_f_199_94966" x="0.873535" y="-659" width="1255.25" height="1251.52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="40.5" result="effect1_foregroundBlur_199_94966"></feGaussianBlur></filter></defs></svg><div class="flex flex-col items-center justify-center p-8">`);
      if (unref(logoSvg)) {
        _push(`<div class="flex items-center justify-center mb-10 max-w-[900px]" style="${ssrRenderStyle({ "width": "72px", "height": "72px" })}">${unref(logoSvg) ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(title)) {
        _push(`<h1 class="m-0 text-5xl font-semibold mb-4 text-white text-center">${ssrInterpolate(unref(title))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(description)) {
        _push(`<p class="text-center text-2xl text-neutral-300 leading-tight max-w-[800px]">${ssrInterpolate(unref(description))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/docus/app/components/OgImage/OgImageLanding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OgImageLanding = Object.assign(_sfc_main, { __name: "OgImageLanding" });

export { OgImageLanding as default };
//# sourceMappingURL=OgImageLanding-CILes4oY.mjs.map
