import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { computed, toValue, ref, toRaw, mergeProps, unref, resolveComponent, defineAsyncComponent, defineComponent, h, getCurrentInstance, reactive, watch, Text, Comment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { w as joinURL, af as withoutTrailingSlash, ap as pascalCase, aA as kebabCase, r as destr } from '../nitro/nitro.mjs';
import { find, html } from 'property-information';
import { toHast } from 'minimark/hast';
import { X as useRoute, ai as useSiteConfig, $ as useDocusI18n, aj as useSeoMeta, ak as useHead, a2 as useNuxtApp, al as useOgImageRuntimeConfig, am as setHeadOgImagePrebuilt, an as getOgImagePath, ao as createOgImageMeta, Z as useRuntimeConfig } from './server.mjs';

const htmlTags = /* @__PURE__ */ new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]);

const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || isTag(vnode, Symbol.for("v-txt"));
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children?.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.value || node.children || "";
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).filter(Boolean).join("");
  }
  return "";
}
function unwrap(vnode, tags = []) {
  if (Array.isArray(vnode)) {
    return vnode.flatMap((node) => unwrap(node, tags));
  }
  let result = vnode;
  if (tags.some((tag) => tag === "*" || isTag(vnode, tag))) {
    result = nodeChildren(vnode) || vnode;
    if (!Array.isArray(result) && TEXT_TAGS.some((tag) => isTag(vnode, tag))) {
      result = [result];
    }
  }
  return result;
}
function _flatUnwrap(vnodes, tags = []) {
  vnodes = Array.isArray(vnodes) ? vnodes : [vnodes];
  if (!tags.length) {
    return vnodes;
  }
  return vnodes.flatMap((vnode) => _flatUnwrap(unwrap(vnode, [tags[0]]), tags.slice(1))).filter((vnode) => !(isText(vnode) && nodeTextContent(vnode).trim() === ""));
}
function flatUnwrap(vnodes, tags = []) {
  if (typeof tags === "string") {
    tags = tags.split(/[,\s]/).map((tag) => tag.trim()).filter(Boolean);
  }
  if (!tags.length) {
    return vnodes;
  }
  return _flatUnwrap(vnodes, tags).reduce((acc, item) => {
    if (isText(item)) {
      if (typeof acc[acc.length - 1] === "string") {
        acc[acc.length - 1] += item.children;
      } else {
        acc.push(item.children);
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    const value = get(obj, key);
    if (value !== void 0) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
function get(obj, key) {
  return key.split(".").reduce((acc, k) => acc && acc[k], obj);
}

const DEFAULT_SLOT = "default";
const rxOn = /^@|^v-on:/;
const rxBind = /^:|^v-bind:/;
const rxModel = /^v-model/;
const nativeInputs = ["select", "textarea", "input"];
const specialParentTags = /* @__PURE__ */ new Set(["math", "svg"]);
const customElements = /* @__PURE__ */ new Set();
const proseComponentMap = Object.fromEntries(["p", "a", "blockquote", "code", "pre", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "img", "ul", "ol", "li", "strong", "table", "thead", "tbody", "td", "th", "tr", "script"].map((t) => [t, `prose-${t}`]));
const dangerousTags = ["script", "base"];
const _sfc_main$1 = defineComponent({
  name: "MDCRenderer",
  props: {
    /**
     * Content to render
     */
    body: {
      type: Object,
      required: true
    },
    /**
     * Document meta data
     */
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Class(es) to bind to the component
     */
    class: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: [String, Boolean],
      default: void 0
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: void 0
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  async setup(props) {
    const app = getCurrentInstance()?.appContext?.app;
    const $nuxt = app?.$nuxt;
    const route = $nuxt?.$route || $nuxt?._route;
    const { mdc } = $nuxt?.$config?.public || {};
    const customElementTags = mdc?.components?.customElements || mdc?.components?.custom;
    if (customElementTags) {
      customElementTags.forEach((tag) => customElements.add(tag));
    }
    const tags = computed(() => ({
      ...mdc?.components?.prose && props.prose !== false ? proseComponentMap : {},
      ...mdc?.components?.map || {},
      ...toRaw(props.data?.mdc?.components || {}),
      ...props.components
    }));
    const contentKey = computed(() => {
      const components = (props.body?.children || []).map((n) => n.tag || n.type).filter((t) => !ignoreTag(t));
      return Array.from(new Set(components)).sort().join(".");
    });
    const runtimeData = reactive({
      ...props.data
    });
    watch(() => props.data, (newData) => {
      Object.assign(runtimeData, newData);
    });
    await resolveContentComponents(props.body, { tags: tags.value });
    function updateRuntimeData(code, value) {
      const lastIndex = code.split(".").length - 1;
      return code.split(".").reduce((o, k, i) => {
        if (i == lastIndex && o) {
          o[k] = value;
          return o[k];
        }
        return typeof o === "object" ? o[k] : void 0;
      }, runtimeData);
    }
    return { tags, contentKey, route, runtimeData, updateRuntimeData };
  },
  render(ctx) {
    const { tags, tag, body, data, contentKey, route, unwrap, runtimeData, updateRuntimeData } = ctx;
    if (!body) {
      return null;
    }
    const meta = { ...data, tags, $route: route, runtimeData, updateRuntimeData };
    const component = tag !== false ? resolveComponentInstance(tag || meta.component?.name || meta.component || "div") : void 0;
    return component ? h(component, { ...meta.component?.props, class: ctx.class, ...this.$attrs, key: contentKey }, { default: defaultSlotRenderer }) : defaultSlotRenderer?.();
    function defaultSlotRenderer() {
      const defaultSlot = _renderSlots(body, h, { documentMeta: meta, parentScope: meta, resolveComponent: resolveComponentInstance });
      if (!defaultSlot?.default) {
        return null;
      }
      if (unwrap) {
        return flatUnwrap(
          defaultSlot.default(),
          typeof unwrap === "string" ? unwrap.split(" ") : ["*"]
        );
      }
      return defaultSlot.default();
    }
  }
});
function _renderNode(node, h2, options, keyInParent) {
  const { documentMeta, parentScope, resolveComponent } = options;
  if (node.type === "text") {
    return h2(Text, node.value);
  }
  if (node.type === "comment") {
    return h2(Comment, null, node.value);
  }
  const originalTag = node.tag;
  const renderTag = findMappedTag(node, documentMeta.tags);
  if (node.tag === "binding") {
    return renderBinding(node, h2, documentMeta, parentScope);
  }
  const _resolveComponent = isUnresolvableTag(renderTag) ? (component2) => component2 : resolveComponent;
  if (dangerousTags.includes(pascalCase(renderTag).toLowerCase())) {
    return h2(
      "pre",
      { class: "mdc-renderer-dangerous-tag" },
      "<" + renderTag + ">" + nodeTextContent(node) + "</" + renderTag + ">"
    );
  }
  const component = _resolveComponent(renderTag);
  if (typeof component === "object") {
    component.tag = originalTag;
  }
  const props = propsToData(node, documentMeta);
  if (keyInParent) {
    props.key = keyInParent;
  }
  return h2(
    component,
    props,
    _renderSlots(
      node,
      h2,
      {
        documentMeta,
        parentScope: { ...parentScope, ...props },
        resolveComponent: _resolveComponent
      }
    )
  );
}
function _renderSlots(node, h2, options) {
  const { documentMeta, parentScope, resolveComponent } = options;
  const children = node.children || [];
  const slotNodes = children.reduce((data, node2) => {
    if (!isTemplate(node2)) {
      data[DEFAULT_SLOT].children.push(node2);
      return data;
    }
    const slotName = getSlotName(node2);
    data[slotName] = data[slotName] || { props: {}, children: [] };
    if (node2.type === "element") {
      data[slotName].props = node2.props;
      data[slotName].children.push(...node2.children || []);
    }
    return data;
  }, {
    [DEFAULT_SLOT]: { props: {}, children: [] }
  });
  const slots = Object.entries(slotNodes).reduce((slots2, [name, { props, children: children2 }]) => {
    if (!children2.length) {
      return slots2;
    }
    slots2[name] = (data = {}) => {
      const scopedProps = pick(data, Object.keys(props || {}));
      let vNodes = children2.map((child, index) => {
        return _renderNode(
          child,
          h2,
          {
            documentMeta,
            parentScope: { ...parentScope, ...scopedProps },
            resolveComponent
          },
          String(child.props?.key || index)
        );
      });
      if (props?.unwrap) {
        vNodes = flatUnwrap(vNodes, props.unwrap);
      }
      return mergeTextNodes(vNodes);
    };
    return slots2;
  }, {});
  return slots;
}
function renderBinding(node, h2, documentMeta, parentScope = {}) {
  const data = {
    ...documentMeta.runtimeData,
    ...parentScope,
    $document: documentMeta,
    $doc: documentMeta
  };
  const splitter = /\.|\[(\d+)\]/;
  const keys = node.props?.value.trim().split(splitter).filter(Boolean);
  const value = keys.reduce((data2, key) => {
    if (data2 && key in data2) {
      if (typeof data2[key] === "function") {
        return data2[key]();
      } else {
        return data2[key];
      }
    }
    return void 0;
  }, data);
  const defaultValue = node.props?.defaultValue;
  return h2(Text, value ?? defaultValue ?? "");
}
function propsToData(node, documentMeta) {
  const { tag = "", props = {} } = node;
  return Object.keys(props).reduce(function(data, key) {
    if (key === "__ignoreMap") {
      return data;
    }
    const value = props[key];
    if (rxModel.test(key)) {
      return propsToDataRxModel(key, value, data, documentMeta, { native: nativeInputs.includes(tag) });
    }
    if (key === "v-bind") {
      return propsToDataVBind(key, value, data, documentMeta);
    }
    if (rxOn.test(key)) {
      return propsToDataRxOn(key, value, data, documentMeta);
    }
    if (rxBind.test(key)) {
      return propsToDataRxBind(key, value, data, documentMeta);
    }
    const { attribute } = find(html, key);
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      data[attribute] = value.join(" ");
      return data;
    }
    data[attribute] = value;
    return data;
  }, {});
}
function propsToDataRxModel(key, value, data, documentMeta, { native }) {
  const propName = key.match(/^v-model:([^=]+)/)?.[1] || "modelValue";
  const field = native ? "value" : propName;
  const event = native ? "onInput" : `onUpdate:${propName}`;
  data[field] = evalInContext(value, documentMeta.runtimeData);
  data[event] = (e) => {
    documentMeta.updateRuntimeData(value, native ? e.target?.value : e);
  };
  return data;
}
function propsToDataVBind(_key, value, data, documentMeta) {
  const val = evalInContext(value, documentMeta);
  data = Object.assign(data, val);
  return data;
}
function propsToDataRxOn(key, value, data, documentMeta) {
  key = key.replace(rxOn, "");
  data.on = data.on || {};
  data.on[key] = () => evalInContext(value, documentMeta);
  return data;
}
function propsToDataRxBind(key, value, data, documentMeta) {
  key = key.replace(rxBind, "");
  data[key] = evalInContext(value, documentMeta);
  return data;
}
const resolveComponentInstance = (component) => {
  if (typeof component === "string") {
    if (ignoreTag(component)) {
      return component;
    }
    const _component = resolveComponent(pascalCase(component), false);
    if (!component || _component?.name === "AsyncComponentWrapper") {
      return _component;
    }
    if (typeof _component === "string") {
      return _component;
    }
    if ("setup" in _component) {
      return defineAsyncComponent(() => new Promise((resolve) => resolve(_component)));
    }
    return _component;
  }
  return component;
};
function evalInContext(code, context) {
  const result = code.split(".").reduce((o, k) => typeof o === "object" ? o[k] : void 0, context);
  return typeof result === "undefined" ? destr(code) : result;
}
function getSlotName(node) {
  let name = "";
  for (const propName of Object.keys(node.props || {})) {
    if (!propName.startsWith("#") && !propName.startsWith("v-slot:")) {
      continue;
    }
    name = propName.split(/[:#]/, 2)[1];
    break;
  }
  return name || DEFAULT_SLOT;
}
function isTemplate(node) {
  return node.tag === "template";
}
function isUnresolvableTag(tag) {
  return specialParentTags.has(tag);
}
function mergeTextNodes(nodes) {
  const mergedNodes = [];
  for (const node of nodes) {
    const previousNode = mergedNodes[mergedNodes.length - 1];
    if (node.type === Text && previousNode?.type === Text) {
      previousNode.children = previousNode.children + node.children;
    } else {
      mergedNodes.push(node);
    }
  }
  return mergedNodes;
}
async function resolveContentComponents(body, meta) {
  if (!body) {
    return;
  }
  const components = Array.from(new Set(loadComponents(body, meta)));
  await Promise.all(components.map(async (c) => {
    if (c?.render || c?.ssrRender || c?.__ssrInlineRender) {
      return;
    }
    const resolvedComponent = resolveComponentInstance(c);
    if (resolvedComponent?.__asyncLoader && !resolvedComponent.__asyncResolved) {
      await resolvedComponent.__asyncLoader();
    }
  }));
  function loadComponents(node, documentMeta) {
    const tag = node.tag;
    if (node.type === "text" || tag === "binding" || node.type === "comment") {
      return [];
    }
    const renderTag = findMappedTag(node, documentMeta.tags);
    if (isUnresolvableTag(renderTag)) {
      return [];
    }
    const components2 = [];
    if (node.type !== "root" && !ignoreTag(renderTag)) {
      components2.push(renderTag);
    }
    for (const child of node.children || []) {
      components2.push(...loadComponents(child, documentMeta));
    }
    return components2;
  }
}
function findMappedTag(node, tags) {
  const tag = node.tag;
  if (!tag || typeof node.props?.__ignoreMap !== "undefined") {
    return tag;
  }
  return tags[tag] || tags[pascalCase(tag)] || tags[kebabCase(node.tag)] || tag;
}
function ignoreTag(tag) {
  const isCustomEl = typeof tag === "string" ? customElements.has(tag) : false;
  return isCustomEl || htmlTags.has(tag);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const pickExport = (mod, exportName, componentName, path) => {
  const resolved = exportName === "default" ? mod?.default : mod?.[exportName];
  if (!resolved) {
    throw new Error(`[nuxt-content] Missing export "${exportName}" for component "${componentName}" in "${path}".`);
  }
  return resolved;
};
const localComponentLoaders = {
  UButton: () => import('./server.mjs').then(n => n.aK).then((m) => pickExport(m, "default", "UButton", "./../../../../@nuxt/ui/dist/runtime/components/Button.vue")),
  UPageFeature: () => import('./PageFeature-CdZFcCsm.mjs').then((m) => pickExport(m, "default", "UPageFeature", "./../../../../@nuxt/ui/dist/runtime/components/PageFeature.vue")),
  UPageHero: () => import('./PageHero-avgsKcj5.mjs').then((m) => pickExport(m, "default", "UPageHero", "./../../../../@nuxt/ui/dist/runtime/components/PageHero.vue")),
  UPageSection: () => import('./PageSection-x7lRbIyN.mjs').then((m) => pickExport(m, "default", "UPageSection", "./../../../../@nuxt/ui/dist/runtime/components/PageSection.vue"))
};
const globalComponents = ["ProseA", "ProseAccordion", "ProseAccordionItem", "ProseBadge", "ProseBlockquote", "ProseCallout", "ProseCard", "ProseCardGroup", "ProseCode", "ProseCodeCollapse", "ProseCodeGroup", "ProseCodeIcon", "ProseCodePreview", "ProseCodeTree", "ProseCollapsible", "ProseEm", "ProseField", "ProseFieldGroup", "ProseH1", "ProseH2", "ProseH3", "ProseH4", "ProseHr", "ProseIcon", "ProseImg", "ProseKbd", "ProseLi", "ProseOl", "ProseP", "ProsePre", "ProsePrompt", "ProseScript", "ProseSteps", "ProseStrong", "ProseTable", "ProseTabs", "ProseTabsItem", "ProseTbody", "ProseTd", "ProseTh", "ProseThead", "ProseTr", "ProseUl", "ProseCaution", "ProseNote", "ProseTip", "ProseWarning", "ProseH5", "ProseH6", "Icon"];
const localComponents = ["UButton", "UPageFeature", "UPageHero", "UPageSection"];

const _sfc_main = {
  __name: "ContentRenderer",
  __ssrInlineRender: true,
  props: {
    /**
     * Content to render
     */
    value: {
      type: Object,
      required: true
    },
    /**
     * Render only the excerpt
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: String,
      default: "div"
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: void 0
    },
    /**
     * Root tag to use for rendering
     */
    class: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(__props) {
    const renderFunctions = ["render", "ssrRender", "__ssrInlineRender"];
    const props = __props;
    const debug = globalThis._importMeta_.preview;
    const body = computed(() => {
      let body2 = props.value.body || props.value;
      if (props.excerpt && props.value.excerpt) {
        body2 = props.value.excerpt;
      }
      if (body2.type === "minimal" || body2.type === "minimark") {
        return toHast({ type: "minimark", value: body2.value });
      }
      return body2;
    });
    const isEmpty = computed(() => !body.value?.children?.length);
    const data = computed(() => {
      const { body: body2, excerpt, ...data2 } = props.value;
      return {
        ...data2,
        ...props.data
      };
    });
    const proseComponentMap = Object.fromEntries(["p", "a", "blockquote", "code", "pre", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "img", "ul", "ol", "li", "strong", "table", "thead", "tbody", "td", "th", "tr", "script"].map((t) => [t, `prose-${t}`]));
    const { mdc } = useRuntimeConfig().public || {};
    const propsDataMDC = computed(() => props.data.mdc);
    const tags = computed(() => ({
      ...mdc?.components?.prose && props.prose !== false ? proseComponentMap : {},
      ...mdc?.components?.map || {},
      ...toRaw(propsDataMDC.value?.components || {}),
      ...props.components
    }));
    const componentsMap = computed(() => {
      return body.value ? resolveContentComponents(body.value, { tags: tags.value }) : {};
    });
    function resolveVueComponent(component) {
      let _component = component;
      if (typeof component === "string") {
        if (htmlTags.has(component)) {
          return component;
        }
        if (globalComponents.includes(pascalCase(component))) {
          _component = resolveComponent(component, false);
        } else if (localComponents.includes(pascalCase(component))) {
          const loader = localComponentLoaders[pascalCase(component)];
          _component = loader ? defineAsyncComponent(loader) : void 0;
        }
        if (typeof _component === "string") {
          return _component;
        }
      }
      if (!_component) {
        return _component;
      }
      const componentObject = _component;
      if ("__asyncLoader" in componentObject) {
        return componentObject;
      }
      if ("setup" in componentObject) {
        return defineAsyncComponent(() => Promise.resolve(componentObject));
      }
      return componentObject;
    }
    function resolveContentComponents(body2, meta) {
      if (!body2) {
        return;
      }
      const components = Array.from(new Set(loadComponents(body2, meta)));
      const result = {};
      for (const [tag, component] of components) {
        if (result[tag]) {
          continue;
        }
        if (typeof component === "object" && renderFunctions.some((fn) => Object.hasOwnProperty.call(component, fn))) {
          result[tag] = component;
          continue;
        }
        result[tag] = resolveVueComponent(component);
      }
      return result;
    }
    function loadComponents(node, documentMeta) {
      const tag = node.tag;
      if (node.type === "text" || tag === "binding" || node.type === "comment") {
        return [];
      }
      const renderTag = findMappedTag(node, documentMeta.tags);
      const components2 = [];
      if (node.type !== "root" && !htmlTags.has(renderTag)) {
        components2.push([tag, renderTag]);
      }
      for (const child of node.children || []) {
        components2.push(...loadComponents(child, documentMeta));
      }
      return components2;
    }
    function findMappedTag(node, tags2) {
      const tag = node.tag;
      if (!tag || typeof node.props?.__ignoreMap !== "undefined") {
        return tag;
      }
      return tags2[tag] || tags2[pascalCase(tag)] || tags2[kebabCase(node.tag)] || tag;
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (!isEmpty.value) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          body: body.value,
          data: data.value,
          class: props.class,
          tag: props.tag,
          prose: props.prose,
          unwrap: props.unwrap,
          components: componentsMap.value,
          "data-content-id": unref(debug) ? __props.value.id : void 0
        }, _attrs), null, _parent));
      } else {
        ssrRenderSlot(_ctx.$slots, "empty", {
          body: body.value,
          data: data.value,
          dataContentId: unref(debug) ? __props.value.id : void 0
        }, null, _push, _parent);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "ContentRenderer" });

function useSeo(options) {
  const route = useRoute();
  const site = useSiteConfig();
  const { locale, locales, isEnabled: isI18nEnabled, switchLocalePath } = useDocusI18n();
  const title = computed(() => toValue(options.title));
  const description = computed(() => toValue(options.description));
  const type = computed(() => toValue(options.type) || "article");
  const ogImage = computed(() => toValue(options.ogImage));
  const publishedAt = computed(() => toValue(options.publishedAt));
  const modifiedAt = computed(() => toValue(options.modifiedAt));
  const breadcrumbs = computed(() => toValue(options.breadcrumbs));
  const canonicalUrl = computed(() => {
    if (!site.url) return void 0;
    return joinURL(site.url, route.path);
  });
  const baseUrl = computed(() => site.url ? withoutTrailingSlash(site.url) : "");
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl,
    ogLocale: computed(() => isI18nEnabled.value ? locale.value : void 0)
  });
  useHead({
    link: computed(() => {
      const links = [];
      if (canonicalUrl.value) {
        links.push({
          rel: "canonical",
          href: canonicalUrl.value
        });
      }
      if (isI18nEnabled.value && baseUrl.value) {
        for (const loc of locales) {
          const localePath = switchLocalePath(loc.code);
          if (localePath) {
            links.push({
              rel: "alternate",
              hreflang: loc.code,
              href: joinURL(baseUrl.value, localePath)
            });
          }
        }
        const defaultLocalePath = switchLocalePath(locales[0]?.code || "en");
        if (defaultLocalePath) {
          links.push({
            rel: "alternate",
            hreflang: "x-default",
            href: joinURL(baseUrl.value, defaultLocalePath)
          });
        }
      }
      return links;
    })
  });
  if (ogImage.value) {
    useSeoMeta({
      ogImage: ogImage.value,
      twitterImage: ogImage.value
    });
  }
  useHead({
    script: computed(() => {
      const scripts = [];
      if (!baseUrl.value || !title.value) return scripts;
      const pageUrl = joinURL(baseUrl.value, route.path);
      if (type.value === "article") {
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title.value,
          "description": description.value,
          "url": pageUrl,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
          }
        };
        if (publishedAt.value) {
          articleSchema.datePublished = publishedAt.value;
        }
        if (modifiedAt.value) {
          articleSchema.dateModified = modifiedAt.value;
        }
        if (site.name) {
          articleSchema.publisher = {
            "@type": "Organization",
            "name": site.name
          };
        }
        scripts.push({
          type: "application/ld+json",
          innerHTML: JSON.stringify(articleSchema)
        });
      }
      if (type.value === "website") {
        const websiteSchema = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": site.name || title.value,
          "description": description.value,
          "url": baseUrl.value
        };
        scripts.push({
          type: "application/ld+json",
          innerHTML: JSON.stringify(websiteSchema)
        });
      }
      if (breadcrumbs.value && breadcrumbs.value.length > 0) {
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.value.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.title,
            "item": joinURL(baseUrl.value, item.path)
          }))
        };
        scripts.push({
          type: "application/ld+json",
          innerHTML: JSON.stringify(breadcrumbSchema)
        });
      }
      return scripts;
    })
  });
}

function defineOgImage(_options = {}) {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const basePath = route.path || "/";
  if (nuxtApp.payload.path === basePath) {
    const state = ref(false);
    state.value = true;
  }
  const { defaults } = useOgImageRuntimeConfig();
  const options = toValue(_options);
  if (options === false) {
    return;
  }
  const validOptions = options;
  for (const key in defaults) {
    if (validOptions[key] === void 0)
      validOptions[key] = defaults[key];
  }
  if (route.query)
    validOptions._query = route.query;
  if (validOptions.url) {
    setHeadOgImagePrebuilt(validOptions);
    return;
  }
  const path = getOgImagePath(basePath, validOptions);
  createOgImageMeta(path, validOptions, nuxtApp.ssrContext);
}

function defineOgImageComponent(component, props = {}, options = {}) {
  return defineOgImage({
    ...options,
    component,
    props
  });
}

export { __nuxt_component_0 as _, defineOgImageComponent as d, useSeo as u };
//# sourceMappingURL=defineOgImageComponent-Cm85jsZS.mjs.map
