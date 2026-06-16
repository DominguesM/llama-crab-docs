import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { LRUCache } from 'lru-cache';
import { createGenerator } from '@unocss/core';
import presetWind from '@unocss/preset-wind3';
import { parse as parse$2 } from 'devalue';
import { createConsola, consola } from 'consola';
import { createUnhead } from 'unhead';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync, mkdirSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { AsyncLocalStorage } from 'node:async_hooks';
import { toHast } from 'minimark/hast';
import { toValue, isRef, hasInjectionContext, inject, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated } from 'vue';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { stringify as stringify$1 } from 'minimark/stringify';
import { z } from 'zod';
import ms from 'ms';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { readFile as readFile$1 } from 'node:fs/promises';
import satori from 'satori';
import { getIcons } from '@iconify/utils';
import { createHead as createHead$1, propsToString } from 'unhead/server';
import { FlatMetaPlugin } from 'unhead/plugins';
import { walkResolver } from 'unhead/utils';
import { createRenderer } from 'vue-bundle-renderer/runtime';
import { renderToString } from 'vue/server-renderer';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode$2(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$2(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NullObject$1 = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = new NullObject$1();
  const opt = {};
  const dec = opt.decode || decode$1;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode$1(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode$1(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode$1(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o$1(n){throw new Error(`${n} is not implemented yet!`)}let i$2 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o$1("Readable.asyncIterator")}iterator(e){throw o$1("Readable.iterator")}map(e,t){throw o$1("Readable.map")}filter(e,t){throw o$1("Readable.filter")}forEach(e,t){throw o$1("Readable.forEach")}reduce(e,t,r){throw o$1("Readable.reduce")}find(e,t){throw o$1("Readable.find")}findIndex(e,t){throw o$1("Readable.findIndex")}some(e,t){throw o$1("Readable.some")}toArray(e){throw o$1("Readable.toArray")}every(e,t){throw o$1("Readable.every")}flatMap(e,t){throw o$1("Readable.flatMap")}drop(e,t){throw o$1("Readable.drop")}take(e,t){throw o$1("Readable.take")}asIndexedPairs(e){throw o$1("Readable.asIndexedPairs")}};let l$2 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$2=class c{allowHalfOpen=true;_destroy;constructor(e=new i$2,t=new l$2){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _$1(){return Object.assign(c$2.prototype,i$2.prototype),Object.assign(c$2.prototype,l$2.prototype),c$2}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_$1();let A$1 = class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}};class y extends i$2{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A$1;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$2{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R$1(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S$1=new Set([101,204,205,304]);async function b$1(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R$1(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S$1.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C$1(n,e,t={}){try{const r=await b$1(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$2(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
const appendHeader = appendResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks$1(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks$1(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask$1 = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller$1(hooks, args) {
  const name = args.shift();
  const task = createTask$1(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller$1(hooks, args) {
  const name = args.shift();
  const task = createTask$1(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith$1(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

let Hookable$1 = class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks$1(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks$1(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller$1, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller$1, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith$1(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith$1(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith$1(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
};
function createHooks$1() {
  return new Hookable$1();
}

const s$1=globalThis.Headers,i$1=globalThis.AbortController,l$1=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks$1(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks$1(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks$1(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks$1(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks$1(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l$1;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l$1(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i$1;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive$1(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$2 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$2,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["nuxt-og-image:fonts:Inter-normal-400.ttf.base64"]: {
    import: () => import('../raw/Inter-normal-400.ttf.mjs').then(r => r.default || r),
    meta: {"type":"text/plain; charset=utf-8","etag":"\"652cc-qEeSD1DXCSV8gPP2rnBA6ePGdZ4\"","mtime":"2026-06-16T15:07:57.026Z"}
  },
  ["nuxt-og-image:fonts:Inter-normal-700.ttf.base64"]: {
    import: () => import('../raw/Inter-normal-700.ttf.mjs').then(r => r.default || r),
    meta: {"type":"text/plain; charset=utf-8","etag":"\"674f0-FZReUXHhPTnY0HmYVn2iPpKm9ds\"","mtime":"2026-06-16T15:07:57.026Z"}
  }
};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME$1 = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME$1, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME$1,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME$1,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c$1().serialize(o)}const c$1=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r$1="sha256",s="base64url";function digest(t){if(e)return e(r$1,t,s);const o=createHash(r$1).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  header: {
    title: "llama-crab",
    logo: false
  },
  seo: {
    title: "llama-crab",
    titleTemplate: "%s - llama-crab",
    description: "Local GGUF inference for Rust, HTTP server, Tauri, and TypeScript applications."
  },
  github: {
    url: "https://github.com/DominguesM/llama-crab",
    branch: "main"
  },
  ui: {
    colors: {
      primary: "orange",
      neutral: "zinc"
    }
  },
  socials: {
    github: "https://github.com/DominguesM/llama-crab"
  }
});

const appConfig1 = defineAppConfig({
  docus: {
    locale: "en"
  },
  ui: {
    colors: {
      primary: "emerald",
      neutral: "zinc"
    },
    commandPalette: {
      slots: {
        item: "items-center",
        input: "[&_.iconify]:size-4 [&_.iconify]:mx-0.5",
        itemLeadingIcon: "size-4 mx-0.5"
      }
    },
    contentNavigation: {
      slots: {
        linkLeadingIcon: "size-4 mr-1",
        linkTrailing: "hidden"
      },
      defaultVariants: {
        variant: "link"
      }
    },
    pageLinks: {
      slots: {
        linkLeadingIcon: "size-4",
        linkLabelExternalIcon: "size-2.5"
      }
    }
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "header": {
    "title": "llama-crab"
  },
  "seo": {
    "titleTemplate": "%s - llama-crab",
    "title": "llama-crab",
    "description": ""
  },
  "github": {
    "owner": "DominguesM",
    "name": "llama-crab-docs",
    "url": "https://github.com/DominguesM/llama-crab-docs",
    "branch": "main"
  },
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "drag": "i-lucide-grip-vertical",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "iconify",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "base",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codex",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "cuida",
      "dashicons",
      "devicon",
      "devicon-plain",
      "dinkie-icons",
      "duo-icons",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fa7-brands",
      "fa7-regular",
      "fa7-solid",
      "fad",
      "famicons",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-color",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "garden",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "ix",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "lineicons",
      "logos",
      "ls",
      "lsicon",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-icon-theme",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "meteor-icons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "nrk",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "picon",
      "pixel",
      "pixelarticons",
      "prime",
      "proicons",
      "ps",
      "qlementine-icons",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "roentgen",
      "si",
      "si-glyph",
      "sidekickicons",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "stash",
      "streamline",
      "streamline-block",
      "streamline-color",
      "streamline-cyber",
      "streamline-cyber-color",
      "streamline-emojis",
      "streamline-flex",
      "streamline-flex-color",
      "streamline-freehand",
      "streamline-freehand-color",
      "streamline-kameleon-color",
      "streamline-logos",
      "streamline-pixel",
      "streamline-plump",
      "streamline-plump-color",
      "streamline-sharp",
      "streamline-sharp-color",
      "streamline-stickies-color",
      "streamline-ultimate",
      "streamline-ultimate-color",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "temaki",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons",
      "custom"
    ],
    "fetchTimeout": 1500,
    "customCollections": [
      "custom",
      "custom"
    ]
  }
};

const appConfig = defuFn(appConfig0, appConfig1, inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p)).join("") : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}
const titleCaseExceptions = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function titleCase(str, opts) {
  return (Array.isArray(str) ? str : splitByCase(str)).filter(Boolean).map(
    (p) => titleCaseExceptions.test(p) ? p.toLowerCase() : upperFirst(p)
  ).join(" ");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "7bd93c10-de99-4faa-91f1-c4d089f8e4c6",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/__nuxt_content/**": {
        "robots": false,
        "cache": false
      },
      "/__nuxt_content/docs/sql_dump.txt": {
        "prerender": true
      },
      "/__nuxt_content/landing/sql_dump.txt": {
        "prerender": true
      },
      "/_nuxt": {
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable",
          "X-Robots-Tag": "noindex"
        },
        "robots": "noindex"
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "assistant": {
      "enabled": false,
      "apiPath": "/__docus__/assistant"
    },
    "mdc": {
      "components": {
        "prose": true,
        "map": {
          "accordion": "ProseAccordion",
          "accordion-item": "ProseAccordionItem",
          "badge": "ProseBadge",
          "callout": "ProseCallout",
          "card": "ProseCard",
          "card-group": "ProseCardGroup",
          "caution": "ProseCaution",
          "code-collapse": "ProseCodeCollapse",
          "code-group": "ProseCodeGroup",
          "code-icon": "ProseCodeIcon",
          "code-preview": "ProseCodePreview",
          "code-tree": "ProseCodeTree",
          "collapsible": "ProseCollapsible",
          "field": "ProseField",
          "field-group": "ProseFieldGroup",
          "icon": "ProseIcon",
          "kbd": "ProseKbd",
          "note": "ProseNote",
          "prompt": "ProsePrompt",
          "steps": "ProseSteps",
          "tabs": "ProseTabs",
          "tabs-item": "ProseTabsItem",
          "tip": "ProseTip",
          "warning": "ProseWarning"
        },
        "customElements": []
      },
      "headings": {
        "anchorLinks": {
          "h1": false,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": false,
          "h6": false
        }
      },
      "highlight": {
        "noApiRoute": true,
        "theme": {
          "light": "material-theme-lighter",
          "default": "material-theme",
          "dark": "material-theme-palenight"
        },
        "shikiEngine": "javascript",
        "langs": [
          "bash",
          "diff",
          "json",
          "js",
          "ts",
          "html",
          "css",
          "vue",
          "shell",
          "mdc",
          "md",
          "yaml"
        ],
        "highlighter": "shiki"
      }
    },
    "content": {
      "wsUrl": ""
    },
    "nuxt-robots": {
      "version": "5.7.1",
      "isNuxtContentV2": false,
      "debug": false,
      "credits": true,
      "groups": [
        {
          "userAgent": [
            "*"
          ],
          "allow": [
            "/"
          ],
          "disallow": [],
          "contentUsage": [],
          "contentSignal": [],
          "_indexable": true,
          "_rules": [
            {
              "pattern": "/",
              "allow": true
            }
          ],
          "_normalized": true
        }
      ],
      "sitemap": [
        "/sitemap.xml"
      ],
      "header": true,
      "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "robotsDisabledValue": "noindex, nofollow",
      "cacheControl": "max-age=14400, must-revalidate",
      "botDetection": true,
      "pageMetaRobots": {}
    }
  },
  "llms": {
    "domain": "https://dominguesm.github.io",
    "title": "llama-crab",
    "description": "",
    "notes": [],
    "sections": [
      {
        "title": "Documentation Sets",
        "links": [
          {
            "title": "llama-crab",
            "description": "",
            "href": "https://dominguesm.github.io/llms-full.txt"
          }
        ]
      }
    ],
    "contentRawMarkdown": {
      "excludeCollections": []
    }
  },
  "icon": {
    "serverKnownCssClasses": []
  },
  "content": {
    "databaseVersion": "v3.5.0",
    "version": "3.14.0",
    "database": {
      "type": "sqlite",
      "filename": "./contents.sqlite"
    },
    "localDatabase": {
      "type": "sqlite",
      "filename": "/home/runner/work/llama-crab-docs/llama-crab-docs/.data/content/contents.sqlite"
    },
    "integrityCheck": true
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "name": "llama-crab-docs",
        "env": "production"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "llama-crab-docs"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "url": "https://dominguesm.github.io",
        "name": "llama-crab",
        "description": "Local GGUF inference for Rust, HTTP server, Tauri, and TypeScript applications."
      }
    ],
    "version": "3.2.21",
    "debug": false,
    "multiTenancy": []
  },
  "nuxt-robots": {
    "version": "5.7.1",
    "isNuxtContentV2": false,
    "debug": false,
    "credits": true,
    "groups": [
      {
        "userAgent": [
          "*"
        ],
        "allow": [
          "/"
        ],
        "disallow": [],
        "contentUsage": [],
        "contentSignal": [],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "/",
            "allow": true
          }
        ],
        "_normalized": true
      }
    ],
    "sitemap": [
      "/sitemap.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate",
    "botDetection": true,
    "pageMetaRobots": {}
  },
  "nuxt-og-image": {
    "version": "5.1.13",
    "satoriOptions": {},
    "resvgOptions": {},
    "sharpOptions": {},
    "publicStoragePath": "root:public",
    "defaults": {
      "emojis": "noto",
      "renderer": "satori",
      "component": "NuxtSeo",
      "extension": "png",
      "width": 1200,
      "height": 600,
      "cacheMaxAgeSeconds": 259200
    },
    "debug": false,
    "baseCacheKey": "/cache/nuxt-og-image/5.1.13",
    "fonts": [
      {
        "cacheKey": "Inter:undefined:400",
        "style": "normal",
        "weight": 400,
        "name": "Inter",
        "key": "nuxt-og-image:fonts:Inter-normal-400.ttf.base64"
      },
      {
        "cacheKey": "Inter:undefined:700",
        "style": "normal",
        "weight": 700,
        "name": "Inter",
        "key": "nuxt-og-image:fonts:Inter-normal-700.ttf.base64"
      }
    ],
    "hasNuxtIcon": true,
    "colorPreference": "light",
    "strictNuxtContentPaths": "",
    "isNuxtContentDocumentDriven": false
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});
function useEvent() {
  try {
    return nitroAsyncContext.use().event;
  } catch {
    const hint = "Note: This is an experimental feature and might be broken on non-Node.js environments." ;
    throw createError$1({
      message: `Nitro request context is not available. ${hint}`
    });
  }
}

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$1({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await import('../_/error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const checksums = {
  "docs": "v3.5.0--5zyV3qp8kv1QvHFT6Fdo0s1XuNoiaGHsrF_FdVb1aok",
  "landing": "v3.5.0--ZZWpWIThmOTKJXuV_S9YaN1QYcnOgAtaOSTccxQMlcQ"
};
const checksumsStructure = {
  "docs": "34VO9dvAPvtpqIagDKzbpgcpKTSRhud0mLOnSKb5i1E",
  "landing": "tZyOKbtBW1Y6jgOgyl3rm-ghuJUJsbLCHIgBPzIXDfk"
};

const tables = {
  "docs": "_content_docs",
  "landing": "_content_landing",
  "info": "_content_info"
};

const contentManifest = {
  "docs": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "description": "string",
      "extension": "string",
      "links": "json",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "landing": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
};

const linkProps = ["href", "src", "to"];
async function createDocumentGenerator() {
  const { visit } = await import('unist-util-visit');
  const { stringifyMarkdown } = await import('../_/index.mjs');
  return generateDocument;
  async function generateDocument(doc, options) {
    const hastTree = refineDocumentBody(doc.body, options);
    let markdown = await stringifyMarkdown(hastTree, {});
    if (!markdown?.trim().startsWith("# ")) {
      const title = doc.title || doc.seo?.title || "";
      if (title) {
        markdown = `# ${title}

${markdown}`;
      }
    }
    return markdown;
  }
  function refineDocumentBody(body, options) {
    const hastTree = toHast(body);
    visit(hastTree, (node) => {
      const el = node;
      if (!el.props?.to && !el.props?.href && !el.props?.src) {
        return;
      }
      for (const prop of linkProps) {
        if (el.props?.[prop]) {
          el.props[prop] = withBase(el.props[prop], options.domain);
        }
      }
    });
    return hastTree;
  }
}
function prepareContentSections(sections) {
  const contentSections = sections.filter((section) => section.contentCollection);
  if (contentSections.length) {
    return;
  }
  const pageCollecitons = Object.keys(contentManifest).filter((c) => contentManifest[c].type === "page");
  const autoGeneratedSections = pageCollecitons.map((c) => ({
    __nuxt_content_auto_generate: true,
    title: pascalCase(c),
    contentCollection: c,
    contentFilters: [
      {
        field: "extension",
        operator: "=",
        value: "md"
      }
    ]
  }));
  sections.push(...autoGeneratedSections);
}

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function baseURL() {
	
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const buildGroup = (group, type) => {
  const conditions = group._conditions;
  return conditions.length > 0 ? `(${conditions.join(` ${type} `)})` : "";
};
const collectionQueryGroup = (collection) => {
  const conditions = [];
  const query = {
    // @ts-expect-error -- internal
    _conditions: conditions,
    where(field, operator, value) {
      let condition;
      switch (operator.toUpperCase()) {
        case "IN":
        case "NOT IN":
          if (Array.isArray(value)) {
            const values = value.map((val) => singleQuote(val)).join(", ");
            condition = `"${String(field)}" ${operator.toUpperCase()} (${values})`;
          } else {
            throw new TypeError(`Value for ${operator} must be an array`);
          }
          break;
        case "BETWEEN":
        case "NOT BETWEEN":
          if (Array.isArray(value) && value.length === 2) {
            condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value[0])} AND ${singleQuote(value[1])}`;
          } else {
            throw new Error(`Value for ${operator} must be an array with two elements`);
          }
          break;
        case "IS NULL":
        case "IS NOT NULL":
          condition = `"${String(field)}" ${operator.toUpperCase()}`;
          break;
        case "LIKE":
        case "NOT LIKE":
          condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value)}`;
          break;
        default:
          condition = `"${String(field)}" ${operator} ${singleQuote(typeof value === "boolean" ? Number(value) : value)}`;
      }
      conditions.push(`${condition}`);
      return query;
    },
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "OR"));
      return query;
    }
  };
  return query;
};
const collectionQueryBuilder = (collection, fetch) => {
  const params = {
    conditions: [],
    selectedFields: [],
    offset: 0,
    limit: 0,
    orderBy: [],
    // Count query
    count: {
      field: "",
      distinct: false
    }
  };
  const query = {
    // @ts-expect-error -- internal
    __params: params,
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "OR"));
      return query;
    },
    path(path) {
      return query.where("path", "=", withoutTrailingSlash(path));
    },
    skip(skip) {
      params.offset = skip;
      return query;
    },
    where(field, operator, value) {
      query.andWhere((group) => group.where(String(field), operator, value));
      return query;
    },
    limit(limit) {
      params.limit = limit;
      return query;
    },
    select(...fields) {
      if (fields.length) {
        params.selectedFields.push(...fields);
      }
      return query;
    },
    order(field, direction) {
      params.orderBy.push(`"${String(field)}" ${direction}`);
      return query;
    },
    async all() {
      return fetch(collection, buildQuery()).then((res) => res || []);
    },
    async first() {
      return fetch(collection, buildQuery({ limit: 1 })).then((res) => res[0] || null);
    },
    async count(field = "*", distinct = false) {
      return fetch(collection, buildQuery({
        count: { field: String(field), distinct }
      })).then((m) => m[0].count);
    }
  };
  function buildQuery(opts = {}) {
    let query2 = "SELECT ";
    if (opts?.count) {
      query2 += `COUNT(${opts.count.distinct ? "DISTINCT " : ""}${opts.count.field}) as count`;
    } else {
      const fields = Array.from(new Set(params.selectedFields));
      query2 += fields.length > 0 ? fields.map((f) => `"${String(f)}"`).join(", ") : "*";
    }
    query2 += ` FROM ${tables[String(collection)]}`;
    if (params.conditions.length > 0) {
      query2 += ` WHERE ${params.conditions.join(" AND ")}`;
    }
    if (params.orderBy.length > 0) {
      query2 += ` ORDER BY ${params.orderBy.join(", ")}`;
    } else {
      query2 += ` ORDER BY stem ASC`;
    }
    const limit = opts?.limit || params.limit;
    if (limit > 0) {
      if (params.offset > 0) {
        query2 += ` LIMIT ${limit} OFFSET ${params.offset}`;
      } else {
        query2 += ` LIMIT ${limit}`;
      }
    }
    return query2;
  }
  return query;
};
function singleQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function fetchContent(event, collection, path, options) {
  const headers = event ? getRequestHeaders(event) : {};
  headers["accept-encoding"] = void 0;
  const url = `/__nuxt_content/${collection}/${path}`;
  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    },
    query: { v: checksums[String(collection)], t: void 0 }
  };
  return event ? await event.$fetch(url, fetchOptions) : await $fetch(url, fetchOptions);
}
async function fetchDatabase(event, collection) {
  return fetchContent(event, collection, "sql_dump.txt", {
    responseType: "text",
    headers: {
      "content-type": "text/plain"
    }
  });
}
async function fetchQuery(event, collection, sql) {
  return fetchContent(event, collection, "query", {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: {
      sql
    }
  });
}

const queryCollection$1 = (event, collection) => {
  return collectionQueryBuilder(collection, (collection2, sql) => fetchQuery(event, collection2, sql));
};

const queryCollection = (event, collection) => {
  return queryCollection$1(event, collection);
};

function parseCacheDuration(duration) {
  if (typeof duration === "number") {
    return duration;
  }
  const parsed = ms(duration);
  if (parsed === void 0) {
    throw new Error(`Invalid cache duration: ${duration}`);
  }
  return Math.ceil(parsed / 1e3);
}
function createCacheOptions(cache, name, defaultGetKey) {
  if (typeof cache === "object") {
    return {
      getKey: defaultGetKey,
      ...cache,
      maxAge: parseCacheDuration(cache.maxAge),
      name: cache.name ?? name,
      group: cache.group ?? "mcp"
    };
  }
  return {
    maxAge: parseCacheDuration(cache),
    name,
    group: "mcp",
    getKey: defaultGetKey
  };
}
function wrapWithCache(fn, cacheOptions) {
  return defineCachedFunction(
    fn,
    cacheOptions
  );
}

function enrichNameTitle(options) {
  const { name, title, _meta, type } = options;
  const filename = _meta?.filename;
  let enrichedName = name;
  let enrichedTitle = title;
  if (filename) {
    const nameWithoutExt = filename.replace(/\.(ts|js|mts|mjs)$/, "");
    if (!enrichedName) {
      enrichedName = kebabCase(nameWithoutExt);
    }
    if (!enrichedTitle) {
      enrichedTitle = titleCase(nameWithoutExt);
    }
  }
  if (!enrichedName) {
    throw new Error(`Failed to auto-generate ${type} name from filename. Please provide a name explicitly.`);
  }
  return {
    name: enrichedName,
    title: enrichedTitle
  };
}

function registerToolFromDefinition(server, tool) {
  const { name, title } = enrichNameTitle({
    name: tool.name,
    title: tool.title,
    _meta: tool._meta,
    type: "tool"
  });
  let handler = tool.handler;
  if (tool.cache !== void 0) {
    const defaultGetKey = tool.inputSchema ? (args) => {
      const values = Object.values(args);
      return values.map((v) => String(v).replace(/\//g, "-").replace(/^-/, "")).join(":");
    } : void 0;
    const cacheOptions = createCacheOptions(tool.cache, `mcp-tool:${name}`, defaultGetKey);
    handler = wrapWithCache(
      tool.handler,
      cacheOptions
    );
  }
  const options = {
    title,
    description: tool.description,
    inputSchema: tool.inputSchema,
    outputSchema: tool.outputSchema,
    annotations: tool.annotations,
    _meta: {
      ...tool._meta,
      ...tool.inputExamples && { inputExamples: tool.inputExamples }
    }
  };
  return server.registerTool(name, options, handler);
}
function defineMcpTool(definition) {
  return definition;
}

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  switch (ext) {
    case ".md":
      return "text/markdown";
    case ".ts":
    case ".mts":
    case ".cts":
      return "text/typescript";
    case ".js":
    case ".mjs":
    case ".cjs":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".xml":
      return "text/xml";
    case ".csv":
      return "text/csv";
    case ".yaml":
    case ".yml":
      return "text/yaml";
    default:
      return "text/plain";
  }
}
function registerResourceFromDefinition(server, resource) {
  const { name, title } = enrichNameTitle({
    name: resource.name,
    title: resource.title,
    _meta: resource._meta,
    type: "resource"
  });
  let uri = resource.uri;
  let handler = resource.handler;
  const metadata = {
    ...resource.metadata,
    title: resource.title || resource.metadata?.title || title,
    description: resource.description || resource.metadata?.description
  };
  if ("file" in resource && resource.file) {
    const filePath = resolve$1(process.cwd(), resource.file);
    if (!uri) {
      uri = pathToFileURL(filePath).toString();
    }
    if (!handler) {
      handler = async (requestUri) => {
        try {
          const content = await readFile$1(filePath, "utf-8");
          return {
            contents: [{
              uri: requestUri.toString(),
              mimeType: resource.metadata?.mimeType || getMimeType(filePath),
              text: content
            }]
          };
        } catch (error) {
          throw new Error(`Failed to read file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
        }
      };
    }
  }
  if (!uri) {
    throw new Error(`Resource ${name} is missing a URI`);
  }
  if (!handler) {
    throw new Error(`Resource ${name} is missing a handler`);
  }
  if (resource.cache !== void 0) {
    const defaultGetKey = (requestUri) => requestUri.pathname.replace(/\//g, "-").replace(/^-/, "");
    const cacheOptions = createCacheOptions(resource.cache, `mcp-resource:${name}`, defaultGetKey);
    handler = wrapWithCache(
      handler,
      cacheOptions
    );
  }
  if (typeof uri === "string") {
    return server.registerResource(
      name,
      uri,
      metadata,
      handler
    );
  } else {
    return server.registerResource(
      name,
      uri,
      metadata,
      handler
    );
  }
}

function registerPromptFromDefinition(server, prompt) {
  const { name, title } = enrichNameTitle({
    name: prompt.name,
    title: prompt.title,
    _meta: prompt._meta,
    type: "prompt"
  });
  if (prompt.inputSchema) {
    return server.registerPrompt(
      name,
      {
        title,
        description: prompt.description,
        argsSchema: prompt.inputSchema
      },
      prompt.handler
    );
  } else {
    return server.registerPrompt(
      name,
      {
        title,
        description: prompt.description
      },
      prompt.handler
    );
  }
}

function jsonResult(data, pretty = true) {
  const text = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  return { content: [{ type: "text", text }] };
}
function errorResult(message) {
  return { content: [{ type: "text", text: message }], isError: true };
}

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

const llmsHooks = createHooks();
llmsHooks.beforeEach(() => {
  const hooks = Object.values(llmsHooks._hooks || {});
  const hasRegisteredHook = hooks.some((hooksList) => Array.isArray(hooksList) && hooksList.length > 0);
  if (hasRegisteredHook) {
    console.warn("[nuxt-llms] `llmsHooks` are deprecated and will be removed in future versions. Use `useNitroApp().hooks.hook('llms:generate', (event, options) => {})` instead");
  }
});

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),o=new Proxy(r,{get(e,s){return i()[s]??r[s]},has(e,s){const E=i();return s in E||s in r},set(e,s,E){const B=i(true);return B[s]=E,true},deleteProperty(e,s){if(!s)return  false;const E=i(true);return delete E[s],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"production"||"",f=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CLOUDFLARE_WORKERS","WORKERS_CI",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["CODESANDBOX","CODESANDBOX_HOST",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function b(){if(globalThis.process?.env)for(const e of f){const s=e[1]||e[0];if(globalThis.process?.env[s])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=b();l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(o.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(o.DEBUG);const a=t==="test"||n(o.TEST),h=t==="dev"||t==="development";n(o.MINIMAL)||T||a||!R;const A=/^win/i.test(I);!n(o.NO_COLOR)&&(n(o.FORCE_COLOR)||(R||A)&&o.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const W=globalThis.process||Object.create(null),_={versions:{}};new Proxy(W,{get(e,s){if(s==="env")return o;if(s in e)return e[s];if(s in _)return _[s]}});const O=globalThis.process?.release?.name==="node",c=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,L=!!globalThis.fastly,S=!!globalThis.Netlify,u=!!globalThis.EdgeRuntime,N=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[u,"edge-light"],[N,"workerd"],[L,"fastly"],[D,"deno"],[c,"bun"],[O,"node"]];function G(){const e=F.find(s=>s[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

function isLocalhostHost(host) {
  if (!host || host.startsWith("localhost") || host.startsWith("127.") || host.startsWith("0.0.0.0"))
    return true;
  const hostname = host.startsWith("[") ? host.slice(0, host.indexOf("]") + 1) : host;
  return hostname === "[::1]" || hostname === "::1" || hostname === "[::]" || hostname === "::";
}
function extractHostname(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    return close !== -1 ? host.slice(0, close + 1) : host;
  }
  const colonCount = host.split(":").length - 1;
  return colonCount === 1 ? host.slice(0, host.indexOf(":")) : host;
}
function splitHostPort(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    const hostname = close !== -1 ? host.slice(0, close + 1) : host;
    const port = close !== -1 && host[close + 1] === ":" ? host.slice(close + 2) : "";
    const normalized = hostname === "[::1]" || hostname === "[::]" ? "localhost" : hostname;
    return { host: normalized, port };
  }
  if (host === "0.0.0.0" || host.startsWith("0.0.0.0:")) {
    const i = host.indexOf(":");
    return { host: "localhost", port: i !== -1 ? host.slice(i + 1) : "" };
  }
  const colonCount = host.split(":").length - 1;
  if (colonCount === 1) {
    const i = host.indexOf(":");
    return { host: host.slice(0, i), port: host.slice(i + 1) };
  }
  if (colonCount > 1) {
    const normalized = host === "::1" || host === "::" ? "localhost" : `[${host}]`;
    return { host: normalized, port: "" };
  }
  return { host, port: "" };
}
function getNitroOrigin$1(ctx = {}) {
  const isDev = ctx.isDev ?? h;
  const isPrerender = ctx.isPrerender ?? !!o.prerender;
  let host = "";
  let port = "";
  let protocol = o.NITRO_SSL_CERT && o.NITRO_SSL_KEY ? "https" : "http";
  if (isDev || isPrerender) {
    const devEnv = o.__NUXT_DEV__ || o.NUXT_VITE_NODE_OPTIONS;
    if (devEnv) {
      const parsed = JSON.parse(devEnv);
      const origin = parsed.proxy?.url || parsed.baseURL?.replace("/__nuxt_vite_node__", "");
      host = origin.replace(/^https?:\/\//, "").replace(/\/$/, "");
      protocol = origin.startsWith("https") ? "https" : "http";
    }
  }
  if (isDev && isLocalhostHost(host) && ctx.requestHost) {
    const reqHost = extractHostname(ctx.requestHost);
    if (reqHost && !isLocalhostHost(reqHost)) {
      host = ctx.requestHost;
      protocol = ctx.requestProtocol || protocol;
    }
  }
  if (!host && ctx.requestHost) {
    host = ctx.requestHost;
    protocol = ctx.requestProtocol || protocol;
  }
  if (!host) {
    host = o.NITRO_HOST || o.HOST || "";
    if (isDev)
      port = o.NITRO_PORT || o.PORT || "3000";
  }
  const split = splitHostPort(host);
  host = split.host;
  if (split.port)
    port = split.port;
  host = o.NUXT_SITE_HOST_OVERRIDE || host;
  port = o.NUXT_SITE_PORT_OVERRIDE || port;
  if (host.startsWith("http://") || host.startsWith("https://")) {
    protocol = host.startsWith("https://") ? "https" : "http";
    host = host.replace(/^https?:\/\//, "");
  } else if (!isDev && (!host || !isLocalhostHost(host))) {
    protocol = "https";
  }
  return `${protocol}://${host}${port ? `:${port}` : ""}/`;
}

function getNitroOrigin(e) {
  return getNitroOrigin$1({
    isDev: false,
    isPrerender: false,
    requestHost: e ? getRequestHost(e, { xForwardedHost: true }) : void 0,
    requestProtocol: e ? getRequestProtocol(e, { xForwardedProto: true }) : void 0
  });
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(String(config.url), { acceptRelative: true, strict: false }))
    config.url = withHttps(String(config.url));
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0) {
      return () => {
      };
    }
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2]?.split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length === 0) {
      return () => {
      };
    }
    stack.push(entry);
    return () => {
      const idx = stack.indexOf(entry);
      if (idx !== -1)
        stack.splice(idx, 1);
    };
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    siteConfig._priority = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined" && val !== "") {
          siteConfig[k] = val;
          if (typeof stack[o]._priority !== "undefined" && stack[o]._priority !== -1) {
            siteConfig._priority[key] = stack[o]._priority;
          }
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function envSiteConfig(env = {}) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(/^NUXT_(PUBLIC_)?SITE_/, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0]?.toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

function getSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

function getSiteIndexable(e) {
  const { env, indexable } = getSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

function useNitroOrigin(e) {
  return getNitroOrigin(e);
}

function useSiteConfig(e, _options) {
  return getSiteConfig(e, _options);
}

function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
const fileExtensions = [
  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
  // Documents
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  "markdown",
  // Archives
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  // Audio
  "mp3",
  "wav",
  "flac",
  "ogg",
  "opus",
  "m4a",
  "aac",
  "midi",
  "mid",
  // Video
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  // Web
  "html",
  "css",
  "js",
  "json",
  "xml",
  "tsx",
  "jsx",
  "ts",
  "vue",
  "svelte",
  "xsl",
  "rss",
  "atom",
  // Programming
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "h",
  "go",
  // Data formats
  "csv",
  "tsv",
  "sql",
  "yaml",
  "yml",
  // Fonts
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  // Executables/Binaries
  "exe",
  "msi",
  "apk",
  "ipa",
  "dmg",
  "iso",
  "bin",
  // Scripts/Config
  "bat",
  "cmd",
  "sh",
  "env",
  "htaccess",
  "conf",
  "toml",
  "ini",
  // Package formats
  "deb",
  "rpm",
  "jar",
  "war",
  // E-books
  "epub",
  "mobi",
  // Common temporary/backup files
  "log",
  "tmp",
  "bak",
  "old",
  "sav"
];
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  const ext = (lastSegment || path).match(/\.[0-9a-z]+$/i)?.[0];
  return ext && fileExtensions.includes(ext.replace(".", ""));
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const nuxtBase = useRuntimeConfig(e).app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = e.context.siteConfig?.get();
  let siteUrl = e.context.siteConfigNitroOrigin;
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    base: e.context.nitro.baseURL,
    withBase: options.withBase
  });
}

const KNOWN_SEARCH_BOTS = [
  {
    pattern: "googlebot",
    name: "googlebot",
    secondaryPatterns: ["google.com/bot.html"]
  },
  {
    pattern: "bingbot",
    name: "bingbot",
    secondaryPatterns: ["msnbot"]
  },
  {
    pattern: "yandexbot",
    name: "yandexbot"
  },
  {
    pattern: "baiduspider",
    name: "baiduspider",
    secondaryPatterns: ["baidu.com"]
  },
  {
    pattern: "duckduckbot",
    name: "duckduckbot",
    secondaryPatterns: ["duckduckgo.com"]
  },
  {
    pattern: "slurp",
    name: "yahoo"
  },
  {
    pattern: "applebot",
    name: "applebot",
    secondaryPatterns: ["apple.com/go/applebot"]
  }
];
const SOCIAL_BOTS = [
  {
    pattern: "twitterbot",
    name: "twitter",
    secondaryPatterns: ["twitter"]
  },
  {
    pattern: "facebookexternalhit",
    name: "facebook",
    secondaryPatterns: ["facebook.com"]
  },
  {
    pattern: "linkedinbot",
    name: "linkedin",
    secondaryPatterns: ["linkedin"]
  },
  {
    pattern: "pinterestbot",
    name: "pinterest",
    secondaryPatterns: ["pinterest"]
  },
  {
    pattern: "discordbot",
    name: "discord",
    secondaryPatterns: ["discordapp"]
  }
];
const SEO_BOTS = [
  {
    pattern: "mj12bot",
    name: "majestic12",
    secondaryPatterns: ["majestic12.co.uk/bot"]
  },
  {
    pattern: "ahrefsbot",
    name: "ahrefs",
    secondaryPatterns: ["ahrefs.com"]
  },
  {
    pattern: "semrushbot",
    name: "semrush",
    secondaryPatterns: ["semrush.com/bot"]
  },
  {
    pattern: "screaming frog",
    name: "screaming-frog",
    secondaryPatterns: ["screamingfrog.co.uk"]
  },
  {
    pattern: "rogerbot",
    name: "moz"
  }
];
const AI_BOTS = [
  {
    pattern: "anthropic",
    name: "anthropic"
  },
  {
    pattern: "claude",
    name: "claude"
  },
  {
    pattern: "gptbot",
    name: "gpt",
    secondaryPatterns: ["openai.com"]
  },
  {
    pattern: "google-extended",
    name: "google-extended"
  },
  {
    pattern: "applebot-extended",
    name: "applebot-extended"
  },
  {
    pattern: "bytespider",
    name: "bytespider"
  },
  {
    pattern: "diffbot",
    name: "diffbot"
  },
  {
    pattern: "googlebot-news",
    name: "google-news"
  },
  {
    pattern: "cohere",
    name: "cohere",
    secondaryPatterns: ["cohere.com"]
  },
  {
    pattern: "ccbot",
    name: "commoncrawl",
    secondaryPatterns: ["commoncrawl.org"]
  },
  {
    pattern: "perplexitybot",
    name: "perplexity",
    secondaryPatterns: ["perplexity.ai"]
  }
];
const HTTP_TOOL_BOTS = [
  {
    pattern: "python-requests",
    name: "requests",
    secondaryPatterns: ["python"]
  },
  {
    pattern: "wget",
    name: "wget"
  },
  {
    pattern: "curl",
    name: "curl",
    secondaryPatterns: ["curl"]
  }
];
const SECURITY_SCANNING_BOTS = [
  {
    pattern: "zgrab",
    name: "zgrab"
  },
  {
    pattern: "masscan",
    name: "masscan"
  },
  {
    pattern: "nmap",
    name: "nmap",
    secondaryPatterns: ["insecure.org"]
  },
  {
    pattern: "nikto",
    name: "nikto"
  },
  {
    pattern: "wpscan",
    name: "wpscan"
  }
];
const SCRAPING_BOTS = [
  {
    pattern: "scrapy",
    name: "scrapy",
    secondaryPatterns: ["scrapy.org"]
  }
];
const AUTOMATION_BOTS = [
  {
    pattern: "phantomjs",
    name: "phantomjs"
  },
  {
    pattern: "headless",
    name: "headless-browser"
  },
  {
    pattern: "playwright",
    name: "playwright"
  },
  {
    pattern: "selenium",
    name: "selenium",
    secondaryPatterns: ["webdriver"]
  },
  {
    pattern: "puppeteer",
    name: "puppeteer",
    secondaryPatterns: ["headless"]
  }
];
const GENERIC_BOTS = [
  {
    pattern: "bot",
    name: "generic-bot"
  },
  {
    pattern: "spider",
    name: "generic-spider"
  },
  {
    pattern: "crawler",
    name: "generic-crawler"
  },
  {
    pattern: "scraper",
    name: "generic-scraper"
  }
];
const BOT_MAP = [
  {
    type: "search-engine",
    bots: KNOWN_SEARCH_BOTS,
    trusted: true
  },
  {
    type: "social",
    bots: SOCIAL_BOTS,
    trusted: true
  },
  {
    type: "seo",
    bots: SEO_BOTS,
    trusted: true
  },
  {
    type: "ai",
    bots: AI_BOTS,
    trusted: true
  },
  {
    type: "generic",
    bots: GENERIC_BOTS,
    trusted: false
  },
  {
    type: "automation",
    bots: AUTOMATION_BOTS,
    trusted: false
  },
  {
    type: "http-tool",
    bots: HTTP_TOOL_BOTS,
    trusted: false
  },
  {
    type: "security-scanner",
    bots: SECURITY_SCANNING_BOTS,
    trusted: false
  },
  {
    type: "scraping",
    bots: SCRAPING_BOTS,
    trusted: false
  }
];

const ROBOT_DIRECTIVE_VALUES = {
  // Standard directives
  enabled: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  disabled: "noindex, nofollow",
  index: "index",
  noindex: "noindex",
  follow: "follow",
  nofollow: "nofollow",
  none: "none",
  all: "all",
  // Non-standard directives (not part of official robots spec)
  noai: "noai",
  noimageai: "noimageai"
};
function formatMaxImagePreview(value) {
  return `max-image-preview:${value}`;
}
function formatMaxSnippet(value) {
  return `max-snippet:${value}`;
}
function formatMaxVideoPreview(value) {
  return `max-video-preview:${value}`;
}
function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!rule || !matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function contentUsageToString(prefs) {
  return Object.entries(prefs).filter(([_, value]) => value !== void 0).map(([key, value]) => `${key}=${value}`).join(", ");
}
function normalizeContentPreferences(value) {
  if (!value)
    return [];
  if (Array.isArray(value))
    return value.filter((rule) => Boolean(rule));
  if (typeof value === "object" && !Array.isArray(value)) {
    const str = contentUsageToString(value);
    return str ? [str] : [];
  }
  if (typeof value === "string")
    return value ? [value] : [];
  return [];
}
function normalizeGroup(group) {
  if (group._normalized) {
    const resolvedGroup = group;
    const disallow2 = asArray(resolvedGroup.disallow);
    resolvedGroup._indexable = !disallow2.includes("/");
    resolvedGroup._rules = [
      ...resolvedGroup.disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...resolvedGroup.allow.map((r) => ({ pattern: r, allow: true }))
    ];
    return resolvedGroup;
  }
  const disallow = asArray(group.disallow);
  const allow = asArray(group.allow).filter((rule) => Boolean(rule));
  const contentUsage = normalizeContentPreferences(group.contentUsage);
  const contentSignal = normalizeContentPreferences(group.contentSignal);
  return {
    ...group,
    userAgent: group.userAgent ? asArray(group.userAgent) : ["*"],
    disallow,
    allow,
    contentUsage,
    contentSignal,
    _indexable: !disallow.includes("/"),
    _rules: [
      ...disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...allow.map((r) => ({ pattern: r, allow: true }))
    ],
    _normalized: true
  };
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    for (const contentUsage of group.contentUsage || [])
      lines.push(`Content-Usage: ${contentUsage}`);
    for (const contentSignal of group.contentSignal || [])
      lines.push(`Content-Signal: ${contentSignal}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
function createPatternMap() {
  const patternMap = /* @__PURE__ */ new Map();
  for (const def of BOT_MAP) {
    for (const bot of def.bots) {
      const patterns = [bot.pattern, ...bot.secondaryPatterns || []];
      for (const pattern of patterns) {
        patternMap.set(pattern.toLowerCase(), {
          botName: bot.name,
          botCategory: def.type,
          trusted: def.trusted
        });
      }
    }
  }
  return patternMap;
}
function normaliseRobotsRouteRule(config) {
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && "indexable" in config.robots && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  let rule;
  if (typeof config.robots === "object" && config.robots !== null) {
    if ("rule" in config.robots && typeof config.robots.rule !== "undefined") {
      rule = config.robots.rule;
    } else if (!("indexable" in config.robots)) {
      const directives = [];
      for (const [key, value] of Object.entries(config.robots)) {
        if (value === false || value === null || value === void 0)
          continue;
        if (key in ROBOT_DIRECTIVE_VALUES && typeof value === "boolean" && value) {
          directives.push(ROBOT_DIRECTIVE_VALUES[key]);
        } else if (key === "max-image-preview" && typeof value === "string") {
          directives.push(formatMaxImagePreview(value));
        } else if (key === "max-snippet" && typeof value === "number") {
          directives.push(formatMaxSnippet(value));
        } else if (key === "max-video-preview" && typeof value === "number") {
          directives.push(formatMaxVideoPreview(value));
        }
      }
      if (directives.length > 0) {
        rule = directives.join(", ");
      }
    }
  } else if (typeof config.robots === "string") {
    rule = config.robots;
  }
  if (rule && typeof allow === "undefined") {
    const disallowIndicators = ["none", "noindex", "noai", "noimageai"];
    allow = !disallowIndicators.some(
      (indicator) => rule === indicator || rule.split(",").some((part) => part.trim() === indicator)
    );
  }
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function withoutQuery$1(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher$1(e) {
  const { nitro, app } = useRuntimeConfig(e);
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery$1(path)), app.baseURL)
    ).reverse());
  };
}

function useRuntimeConfigNuxtRobots(event) {
  return useRuntimeConfig(event)["nuxt-robots"];
}

function getSiteRobotConfig(e) {
  const query = getQuery(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfigNuxtRobots(e);
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  if (debug || false) {
    const { _context } = getSiteConfig(e, { debug: debug || false });
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && _context.indexable === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!queryIndexableEnabled && !_context.indexable) {
      hints.push(`Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.`);
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is blocked by site config set by ${_context.indexable}.`);
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is enabled from ${_context.indexable}.`);
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

function getPathRobotConfig(e, options) {
  const runtimeConfig = useRuntimeConfig(e);
  const { robotsDisabledValue, robotsEnabledValue, isNuxtContentV2 } = useRuntimeConfigNuxtRobots(e);
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false,
        debug: {
          source: "Site Config"
        }
      };
    }
  }
  const path = options?.path || e.path;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    try {
      userAgent = getRequestHeader(e, "User-Agent");
    } catch {
    }
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => ua.toLowerCase().includes(userAgent.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (group._indexable === false) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: JSON.stringify(group)
        }
      };
    }
    const robotsTxtRule = matchPathToRule(path, group._rules || []);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  if (isNuxtContentV2 && nitroApp._robots?.nuxtContentUrls?.has(withoutTrailingSlash(path))) {
    return {
      indexable: false,
      rule: robotsDisabledValue,
      debug: {
        source: "Nuxt Content"
      }
    };
  }
  const { pageMetaRobots } = useRuntimeConfigNuxtRobots(e);
  const pageMetaRule = pageMetaRobots?.[withoutTrailingSlash(path)];
  if (typeof pageMetaRule !== "undefined") {
    const normalised = normaliseRobotsRouteRule({ robots: pageMetaRule });
    if (normalised && (typeof normalised.allow !== "undefined" || typeof normalised.rule !== "undefined")) {
      return {
        indexable: normalised.allow ?? false,
        rule: normalised.rule || (normalised.allow ? robotsEnabledValue : robotsDisabledValue),
        debug: {
          source: "Page Meta"
        }
      };
    }
  }
  nitroApp._robotsRuleMatcher = nitroApp._robotsRuleMatcher || createNitroRouteRuleMatcher$1(e);
  let robotRouteRules = nitroApp._robotsRuleMatcher(path);
  let routeRulesPath = path;
  if (runtimeConfig.public?.i18n?.locales && typeof robotRouteRules.robots === "undefined") {
    const { locales } = runtimeConfig.public.i18n;
    const locale = locales.find((l) => routeRulesPath.startsWith(`/${l.code}`));
    if (locale) {
      routeRulesPath = routeRulesPath.replace(`/${locale.code}`, "");
      robotRouteRules = nitroApp._robotsRuleMatcher(routeRulesPath);
    }
  }
  const routeRules = normaliseRobotsRouteRule(robotRouteRules);
  if (routeRules && (typeof routeRules.allow !== "undefined" || typeof routeRules.rule !== "undefined")) {
    return {
      indexable: routeRules.allow ?? false,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

function getAvailableLocales(config) {
  var _a, _b;
  if ((_a = config.docus) == null ? void 0 : _a.filteredLocales) {
    return config.docus.filteredLocales.map((locale) => locale.code);
  }
  return ((_b = config.i18n) == null ? void 0 : _b.locales) ? config.i18n.locales.map((locale) => typeof locale === "string" ? locale : locale.code) : [];
}
function getCollectionsToQuery(locale, availableLocales) {
  if (locale && availableLocales.includes(locale)) {
    return [`docs_${locale}`];
  }
  return availableLocales.length > 0 ? availableLocales.map((l) => `docs_${l}`) : ["docs"];
}
function getCollectionFromPath(path, availableLocales) {
  const pathSegments = path.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  if (firstSegment && availableLocales.includes(firstSegment)) {
    return `docs_${firstSegment}`;
  }
  return "docs";
}

const _nob0FTjVIY2Ni0AXf4xZYAkwhDTsFaen07dvkEFTN4 = defineNitroPlugin((nitroApp) => {
  const prerenderPaths = /* @__PURE__ */ new Set();
  nitroApp.hooks.hook("llms:generate", async (event, options) => {
    prepareContentSections(options.sections);
    const sectionsToRemove = [];
    for (const index in options.sections) {
      const section = options.sections[index];
      if (!section.contentCollection) {
        continue;
      }
      const query = queryCollection(event, section.contentCollection).select("path", "title", "seo", "description").where("path", "NOT LIKE", "%/.navigation");
      const filters = section.contentFilters || [];
      for (const filter of filters) {
        query.where(filter.field, filter.operator, filter.value);
      }
      const docs = await query.all();
      if (docs.length === 0 && section.__nuxt_content_auto_generate) {
        sectionsToRemove.push(index);
        continue;
      }
      section.links ||= [];
      section.links.push(...docs.map((doc) => {
        return {
          title: doc.title || doc?.seo?.title || "",
          description: doc.description || doc?.seo?.description || "",
          href: getDocumentLink(doc.path, section.contentCollection, options)
        };
      }));
    }
    sectionsToRemove.reverse().forEach((index) => {
      options.sections.splice(Number(index), 1);
    });
  });
  nitroApp.hooks.hook("llms:generate:full", async (event, options, contents) => {
    prepareContentSections(options.sections);
    const generateDocument = await createDocumentGenerator();
    for (const index in options.sections) {
      const section = options.sections[index];
      if (!section.contentCollection) {
        continue;
      }
      const query = queryCollection(event, section.contentCollection).where("path", "NOT LIKE", "%/.navigation");
      const filters = section.contentFilters || [];
      for (const filter of filters) {
        query.where(filter.field, filter.operator, filter.value);
      }
      const docs = await query.all();
      for (const doc of docs) {
        await nitroApp.hooks.callHook("content:llms:generate:document", event, doc, options);
        const markdown = await generateDocument(doc, options);
        contents.push(markdown);
      }
    }
  });
  if (["nitro-prerender", "nitro-dev"].includes("node-server")) {
    nitroApp.hooks.hook("beforeResponse", (event) => {
      if (event.path === "/") {
        appendHeader(event, "x-nitro-prerender", Array.from(prerenderPaths));
      }
    });
  }
  function getDocumentLink(link, collection, options) {
    const contentRawMarkdown = options?.contentRawMarkdown;
    if (contentRawMarkdown === false || contentRawMarkdown?.rewriteLLMSTxt === false || contentRawMarkdown?.excludeCollections?.includes(collection)) {
      return withBase(link, options.domain);
    }
    link = `/raw${link}.md`;
    if (link.endsWith("/.md")) {
      link = link.slice(0, -3) + "index.md";
    }
    prerenderPaths.add(link);
    return withBase(link, options.domain);
  }
});

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

const _7YpwhBsBNRoSUjMAwuJm9vCCgkaYPKv9MsChIczwdWo = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = !!process.env.NUXT_NO_SSR || event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(getSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const logger$1 = createConsola({
  defaults: { tag: "@nuxtjs/robots" }
});

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfigNuxtRobots(e);
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  generateRobotsTxtCtx.groups = generateRobotsTxtCtx.groups.map(normalizeGroup);
  nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _OpTV14BG6VcTj8VYRrEPEatsfaAr0IBm6qFYw7L_UAg = defineNitroPlugin(async (nitroApp) => {
  const { isNuxtContentV2, robotsDisabledValue, botDetection } = useRuntimeConfigNuxtRobots();
  if (botDetection !== false) {
    nitroApp._robotsPatternMap = createPatternMap();
  }
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
  const nuxtContentUrls = /* @__PURE__ */ new Set();
  if (isNuxtContentV2) {
    let urls;
    try {
      urls = await (await nitroApp.localFetch("/__robots__/nuxt-content.json", {})).json();
    } catch (e) {
      logger$1.error("Failed to read robot rules from content files.", e);
    }
    if (urls && Array.isArray(urls) && urls.length) {
      urls.forEach((url) => nuxtContentUrls.add(withoutTrailingSlash(url)));
    }
  }
  if (nuxtContentUrls.size) {
    nitroApp._robots.nuxtContentUrls = nuxtContentUrls;
  }
});

const DRIVER_NAME = "lru-cache";
const lruCacheDriver = defineDriver((opts = {}) => {
  const cache = new LRUCache({
    max: 1e3,
    sizeCalculation: opts.maxSize || opts.maxEntrySize ? (value, key) => {
      return key.length + byteLength(value);
    } : void 0,
    ...opts
  });
  return {
    name: DRIVER_NAME,
    options: opts,
    getInstance: () => cache,
    hasItem(key) {
      return cache.has(key);
    },
    getItem(key) {
      return cache.get(key) ?? null;
    },
    getItemRaw(key) {
      return cache.get(key) ?? null;
    },
    setItem(key, value) {
      cache.set(key, value);
    },
    setItemRaw(key, value) {
      cache.set(key, value);
    },
    removeItem(key) {
      cache.delete(key);
    },
    getKeys() {
      return [...cache.keys()];
    },
    clear() {
      cache.clear();
    },
    dispose() {
      cache.clear();
    }
  };
});
function byteLength(value) {
  if (typeof Buffer !== "undefined") {
    try {
      return Buffer.byteLength(value);
    } catch {
    }
  }
  try {
    return typeof value === "string" ? value.length : JSON.stringify(value).length;
  } catch {
  }
  return 0;
}

const htmlPayloadCache = createStorage({
  // short cache time so we don't need many entries at runtime
  driver: lruCacheDriver({ max: 50 })
});
const fontCache = createStorage({
  driver: lruCacheDriver({ max: 10 })
});
const emojiCache = createStorage({
  driver: lruCacheDriver({ max: 1e3 })
});

function detectBase64MimeType(data) {
  const signatures = {
    "R0lGODdh": "image/gif",
    "R0lGODlh": "image/gif",
    "iVBORw0KGgo": "image/png",
    "/9j/": "image/jpeg",
    "UklGR": "image/webp",
    "AAABAA": "image/x-icon"
  };
  for (const s in signatures) {
    if (data.startsWith(s)) {
      return signatures[s];
    }
  }
  return "image/svg+xml";
}
function toBase64Image(data) {
  const base64 = typeof data === "string" ? data : Buffer.from(data).toString("base64");
  const type = detectBase64MimeType(base64);
  return `data:${type};base64,${base64}`;
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "fonts",
    "alt",
    "props",
    "renderer",
    "html",
    "component",
    "renderer",
    "emojis",
    "_query",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "cacheMaxAgeSeconds"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(/-([a-z])/g, (g) => String(g[1]).toUpperCase())] = val;
  });
  return {
    ...Object.fromEntries(
      Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k))
    ),
    props
  };
}
function normaliseFontInput(fonts) {
  return fonts.map((f) => {
    if (typeof f === "string") {
      const vals = f.split(":");
      const includesStyle = vals.length === 3;
      let name, weight, style;
      if (includesStyle) {
        name = vals[0];
        style = vals[1];
        weight = vals[2];
      } else {
        name = vals[0];
        weight = vals[1];
      }
      return {
        cacheKey: f,
        name,
        weight: weight || 400,
        style: style || "normal",
        path: void 0
      };
    }
    return {
      cacheKey: f.key || `${f.name}:${f.style}:${f.weight}`,
      style: "normal",
      weight: 400,
      ...f
    };
  });
}

const theme = {};

function htmlDecodeQuotes(html) {
  return html.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
}
function decodeHtml(html) {
  return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&cent;/g, "\xA2").replace(/&pound;/g, "\xA3").replace(/&yen;/g, "\xA5").replace(/&euro;/g, "\u20AC").replace(/&copy;/g, "\xA9").replace(/&reg;/g, "\xAE").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#(\d+);/g, (full, int) => {
    return String.fromCharCode(Number.parseInt(int));
  }).replace(/&amp;/g, "&");
}
function decodeObjectHtmlEntities(obj) {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string")
      obj[key] = decodeHtml(value);
  });
  return obj;
}

function fetchIsland(e, component, props) {
  const hashId = hash$1([component, props]).replaceAll("_", "-");
  return e.$fetch(`/__nuxt_island/${component}_${hashId}.json`, {
    params: {
      props: JSON.stringify(props)
    }
  });
}
function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery(path)), app.baseURL)
    ).reverse());
  };
}

const logger = createConsola({
  defaults: {
    tag: "Nuxt OG Image"
  }
});

const componentNames = [{"hash":"3gUNmfj0r7TVdbezwVTxxzzSeYVg6wGL0QEVQ-YQ5j4","pascalName":"OgImageDocs","kebabName":"og-image-docs","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/docus/app/components/OgImage/OgImageDocs.vue","category":"app"},{"hash":"X0dlpeDv-7Dglooh2sjU880WkWJoTe52a28d87dpLpI","pascalName":"OgImageLanding","kebabName":"og-image-landing","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/docus/app/components/OgImage/OgImageLanding.vue","category":"app"},{"hash":"SOHaoKfoo4fUkREsCFGw8ewxkl4-XkkHkug2VwYRtFM","pascalName":"BrandedLogo","kebabName":"branded-logo","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/BrandedLogo.vue","category":"community"},{"hash":"tFoYPh0fXaZR3uXybAqFEOGnQuQsvz-E-Yq-CtrFlIY","pascalName":"Frame","kebabName":"frame","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/Frame.vue","category":"community"},{"hash":"NPQTTXYQ8toXx5OaJ1VlRUUcxy1SNOxg-FoM7C08ZPM","pascalName":"Nuxt","kebabName":"nuxt","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/Nuxt.vue","category":"community"},{"hash":"VAHSTZlVcPHzkozocV1iTnwc4-YttdoOkHsYfoSgDZ4","pascalName":"NuxtSeo","kebabName":"nuxt-seo","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/NuxtSeo.vue","category":"community"},{"hash":"8CNn4yU043gQFqO-sZNDPz9GKED-h7ahXJ-61c9ThHM","pascalName":"Pergel","kebabName":"pergel","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/Pergel.vue","category":"community"},{"hash":"b-Juo-FXQepo6SOCnA478MTAqbXNZuve6-MzHgTKA7s","pascalName":"SimpleBlog","kebabName":"simple-blog","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/SimpleBlog.vue","category":"community"},{"hash":"vRUm5ru-64PEHIGsBby6-vCgLBg7iUJfvFKL6VuCXtI","pascalName":"UnJs","kebabName":"un-js","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/UnJs.vue","category":"community"},{"hash":"hq07GBU-Yd16ICfETt8SfSxfaYj3qBmDAiQkTcv89nw","pascalName":"Wave","kebabName":"wave","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/Wave.vue","category":"community"},{"hash":"zSwOodBXcjwS1qvFqGBJqitTEEnrvVfwQYkTeIxNpws","pascalName":"WithEmoji","kebabName":"with-emoji","path":"/home/runner/work/llama-crab-docs/llama-crab-docs/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/WithEmoji.vue","category":"community"}];

function normaliseOptions(_options) {
  const options = { ..._options };
  if (!options)
    return options;
  if (options.component && componentNames) {
    const originalName = options.component;
    for (const component of componentNames) {
      if (component.pascalName.endsWith(originalName) || component.kebabName.endsWith(originalName)) {
        options.component = component.pascalName;
        break;
      }
    }
  } else if (!options.component) {
    options.component = componentNames[0]?.pascalName;
  }
  return options;
}

function useOgImageRuntimeConfig(e) {
  const c = useRuntimeConfig(e);
  return {
    ...c["nuxt-og-image"],
    app: {
      baseURL: c.app.baseURL
    }
  };
}

const satoriRendererInstance = { instance: void 0 };
const chromiumRendererInstance = { instance: void 0 };
async function useSatoriRenderer() {
  satoriRendererInstance.instance = satoriRendererInstance.instance || await import('../_/renderer.mjs').then((m) => m.default);
  return satoriRendererInstance.instance;
}
async function useChromiumRenderer() {
  chromiumRendererInstance.instance = chromiumRendererInstance.instance || await import('../_/empty.mjs').then((m) => m.default);
  return chromiumRendererInstance.instance;
}

function resolvePathCacheKey(e, path) {
  const siteConfig = useSiteConfig(e, {
    resolveRefs: true
  });
  const basePath = withoutTrailingSlash(withoutLeadingSlash(normalizeKey$1(path)));
  return [
    !basePath || basePath === "/" ? "index" : basePath,
    hash$1([
      basePath,
      siteConfig.url,
      hash$1(getQuery(e))
    ])
  ].join(":");
}
async function resolveContext(e) {
  const runtimeConfig = useOgImageRuntimeConfig();
  const resolvePathWithBase = createSitePathResolver(e, {
    absolute: false,
    withBase: true
  });
  const path = resolvePathWithBase(parseURL(e.path).pathname);
  const extension = path.split(".").pop();
  if (!extension) {
    return createError$1({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Missing OG Image type.`
    });
  }
  if (!["png", "jpeg", "jpg", "svg", "html", "json"].includes(extension)) {
    return createError$1({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Unknown OG Image type ${extension}.`
    });
  }
  const query = getQuery(e);
  let queryParams = {};
  for (const k in query) {
    const v = String(query[k]);
    if (!v)
      continue;
    if (v.startsWith("{")) {
      try {
        queryParams[k] = JSON.parse(v);
      } catch (error) {
      }
    } else {
      queryParams[k] = v;
    }
  }
  queryParams = separateProps(queryParams);
  const basePath = withoutTrailingSlash(
    path.replace(`/__og-image__/image`, "").replace(`/__og-image__/static`, "").replace(`/og.${extension}`, "")
  );
  const basePathWithQuery = queryParams._query && typeof queryParams._query === "object" ? withQuery(basePath, queryParams._query) : basePath;
  const isDebugJsonPayload = extension === "json" && runtimeConfig.debug;
  const key = resolvePathCacheKey(e, basePathWithQuery);
  let options = queryParams.options;
  if (!options) {
    if (!options) {
      const payload = await fetchPathHtmlAndExtractOptions(e, basePathWithQuery, key);
      if (payload instanceof Error)
        return payload;
      options = payload;
    }
  }
  delete queryParams.options;
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const routeRules = routeRuleMatcher(basePath);
  if (typeof routeRules.ogImage === "undefined" && !options) {
    return createError$1({
      statusCode: 400,
      statusMessage: "The route is missing the Nuxt OG Image payload or route rules."
    });
  }
  const ogImageRouteRules = separateProps(routeRules.ogImage);
  options = defu(queryParams, options, ogImageRouteRules, runtimeConfig.defaults);
  if (!options) {
    return createError$1({
      statusCode: 404,
      statusMessage: "[Nuxt OG Image] OG Image not found."
    });
  }
  let renderer;
  switch (options.renderer) {
    case "satori":
      renderer = await useSatoriRenderer();
      break;
    case "chromium":
      renderer = await useChromiumRenderer();
      break;
  }
  if (!renderer || renderer.__mock__) {
    throw createError$1({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Renderer ${options.renderer} is not enabled.`
    });
  }
  const unocss = await createGenerator({ theme }, {
    presets: [
      presetWind()
    ]
  });
  const ctx = {
    unocss,
    e,
    key,
    renderer,
    isDebugJsonPayload,
    runtimeConfig,
    publicStoragePath: runtimeConfig.publicStoragePath,
    extension,
    basePath,
    options: normaliseOptions(options),
    _nitro: useNitroApp()
  };
  await ctx._nitro.hooks.callHook("nuxt-og-image:context", ctx);
  return ctx;
}
const PAYLOAD_REGEX = /<script.+id="nuxt-og-image-options"[^>]*>(.+?)<\/script>/;
function getPayloadFromHtml(html) {
  const match = String(html).match(PAYLOAD_REGEX);
  return match ? String(match[1]) : null;
}
function extractAndNormaliseOgImageOptions(html) {
  const _payload = getPayloadFromHtml(html);
  let options = false;
  try {
    const payload2 = parse$2(_payload || "{}");
    Object.entries(payload2).forEach(([key, value]) => {
      if (!value && value !== 0)
        delete payload2[key];
    });
    options = payload2;
  } catch (e) {
  }
  if (options && typeof options?.props?.description === "undefined") {
    const description = html.match(/<meta[^>]+name="description"[^>]*>/)?.[0];
    if (description) {
      const [, content] = description.match(/content="([^"]+)"/) || [];
      if (content && !options.props.description)
        options.props.description = content;
    }
  }
  const payload = decodeObjectHtmlEntities(options || {});
  return payload;
}
async function doFetchWithErrorHandling(fetch, path) {
  const res = await fetch(path, {
    redirect: "follow",
    headers: {
      accept: "text/html"
    }
  }).catch((err) => {
    return err;
  });
  let errorDescription;
  if (res.status >= 300 && res.status < 400) {
    if (res.headers.has("location")) {
      return await doFetchWithErrorHandling(fetch, res.headers.get("location") || "");
    }
    errorDescription = `${res.status} redirected to ${res.headers.get("location") || "unknown"}`;
  } else if (res.status >= 500) {
    errorDescription = `${res.status} error: ${res.statusText}`;
  }
  if (errorDescription) {
    return [null, createError$1({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to parse \`${path}\` for og-image extraction. ${errorDescription}`
    })];
  }
  if (res._data) {
    return [res._data, null];
  } else if (res.text) {
    return [await res.text(), null];
  }
  return ["", null];
}
async function fetchPathHtmlAndExtractOptions(e, path, key) {
  const cachedHtmlPayload = await htmlPayloadCache.getItem(key);
  if (cachedHtmlPayload && cachedHtmlPayload.expiresAt < Date.now())
    return cachedHtmlPayload.value;
  let _payload = null;
  let [html, err] = await doFetchWithErrorHandling(e.fetch, path);
  if (err) {
    logger.warn(err);
  } else {
    _payload = getPayloadFromHtml(html);
  }
  if (!_payload) {
    const [fallbackHtml, err2] = await doFetchWithErrorHandling(globalThis.$fetch.raw, path);
    if (err2) {
      return err2;
    }
    _payload = getPayloadFromHtml(fallbackHtml);
    if (_payload) {
      html = fallbackHtml;
    }
  }
  if (!html) {
    return createError$1({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to read the path ${path} for og-image extraction, returning no HTML.`
    });
  }
  if (!_payload) {
    const payload2 = extractAndNormaliseOgImageOptions(html);
    if (payload2 && typeof payload2 === "object" && payload2.socialPreview?.og?.image) {
      const image = payload2.socialPreview.og.image;
      const p = {
        custom: true,
        url: typeof image === "string" ? image : image
      };
      if (typeof image === "object" && image["image:width"]) {
        p.width = image["image:width"];
      }
      if (typeof image === "object" && image["image:height"]) {
        p.height = image["image:height"];
      }
      return p;
    }
    return createError$1({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] HTML response from ${path} is missing the #nuxt-og-image-options script tag. Make sure you have defined an og image for this page.`
    });
  }
  const payload = extractAndNormaliseOgImageOptions(html);
  if (payload) {
    await htmlPayloadCache.setItem(key, {
      // 60 minutes for prerender, 10 seconds for runtime
      expiresAt: Date.now() + 1e3 * (10),
      value: payload
    });
  }
  return typeof payload === "object" ? payload : createError$1({
    statusCode: 500,
    statusMessage: "[Nuxt OG Image] Invalid payload type."
  });
}

const _prL6KcoAGmo8SiOvTkAMDPcBrM54qtq5UIdGc08UsP8 = defineNitroPlugin(async (nitro) => {
  return;
});

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _vR6hHZqVLYLdYhG5wqnYAL2n7ISOIynYeiGk9qNe0D8 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _nob0FTjVIY2Ni0AXf4xZYAkwhDTsFaen07dvkEFTN4,
_7YpwhBsBNRoSUjMAwuJm9vCCgkaYPKv9MsChIczwdWo,
_OpTV14BG6VcTj8VYRrEPEatsfaAr0IBm6qFYw7L_UAg,
_prL6KcoAGmo8SiOvTkAMDPcBrM54qtq5UIdGc08UsP8,
_vR6hHZqVLYLdYhG5wqnYAL2n7ISOIynYeiGk9qNe0D8
];

const assets = {
  "/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"36fc-fK2se3PxVU56UUDstk28YGtJkrU\"",
    "mtime": "2026-06-16T15:08:40.087Z",
    "size": 14076,
    "path": "../public/_payload.json"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"bb0-WkpOI3J0JU6K7Vto/ylw3v8IrKM\"",
    "mtime": "2026-06-16T15:08:45.485Z",
    "size": 2992,
    "path": "../public/favicon.ico"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": "\"bb0-WkpOI3J0JU6K7Vto/ylw3v8IrKM\"",
    "mtime": "2026-06-16T15:08:45.485Z",
    "size": 2992,
    "path": "../public/favicon.png"
  },
  "/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"dd37-F5rVfQF3dOmr27uW0d1McsCt5n8\"",
    "mtime": "2026-06-16T15:08:38.546Z",
    "size": 56631,
    "path": "../public/index.html"
  },
  "/llms-full.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"39c5e-gbIileoCO5aaJWVNmXYcGoGtA4I\"",
    "mtime": "2026-06-16T15:08:38.472Z",
    "size": 236638,
    "path": "../public/llms-full.txt"
  },
  "/llms.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"151c-V43aZVYj12DpG6dCh6SRldkN3ps\"",
    "mtime": "2026-06-16T15:08:38.472Z",
    "size": 5404,
    "path": "../public/llms.txt"
  },
  "/logo.webp": {
    "type": "image/webp",
    "etag": "\"16bae-8WuNKgI7etDt3mheuqMlfqVIwBs\"",
    "mtime": "2026-06-16T15:08:45.485Z",
    "size": 93102,
    "path": "../public/logo.webp"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": "\"79f-NRguj8e229BVmgHuEhwvTg+0bhU\"",
    "mtime": "2026-06-16T15:08:38.472Z",
    "size": 1951,
    "path": "../public/sitemap.xml"
  },
  "/og-image.png": {
    "type": "image/png",
    "etag": "\"16bae-8WuNKgI7etDt3mheuqMlfqVIwBs\"",
    "mtime": "2026-06-16T15:08:45.485Z",
    "size": 93102,
    "path": "../public/og-image.png"
  },
  "/troubleshooting.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"285d7-rw78AJh4wxavy4hjG2E9Nq88yQA\"",
    "mtime": "2026-06-16T15:08:40.316Z",
    "size": 165335,
    "path": "../public/troubleshooting.html"
  },
  "/_nuxt/2LUv8iP1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"382-5KOvOae26yviPeCwyGyixA3Lp7g\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 898,
    "path": "../public/_nuxt/2LUv8iP1.js"
  },
  "/_nuxt/4BC2p3NL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3de-7+1LRPBs48XFf3l1ONeewQFkIGM\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 990,
    "path": "../public/_nuxt/4BC2p3NL.js"
  },
  "/_nuxt/4MfykMgL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"52b-8hz5BUM9I3s1kzThRd71IOh4B38\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 1323,
    "path": "../public/_nuxt/4MfykMgL.js"
  },
  "/_nuxt/5h7RgRcA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7bb-6mygDKKBcYuUNKcNISHQVe0AHPI\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 1979,
    "path": "../public/_nuxt/5h7RgRcA.js"
  },
  "/_nuxt/5rIGr8z9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33c-xm4BG10u7h5iXisMDFM6rmfkrhA\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 828,
    "path": "../public/_nuxt/5rIGr8z9.js"
  },
  "/_nuxt/6T8yJ-rC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac4a-273qt8F9ay5EWBWdjGRs84dOA+M\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 44106,
    "path": "../public/_nuxt/6T8yJ-rC.js"
  },
  "/_nuxt/B2SOUjVZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e1-L37a5TL2OL5zsQeUcKUx3piDLdA\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 1249,
    "path": "../public/_nuxt/B2SOUjVZ.js"
  },
  "/_nuxt/B-PpxLzy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19f-esNt5E8k4zpI8rsnBtvmdsjTwVU\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 415,
    "path": "../public/_nuxt/B-PpxLzy.js"
  },
  "/_nuxt/B2BkG1JB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"211-gu0ZSlU4oR6MtlO29zMLdYbkIsM\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 529,
    "path": "../public/_nuxt/B2BkG1JB.js"
  },
  "/_nuxt/B2Te4lL_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"62a-jf1cSZ6I8oJBNX3wDCF7JTVxYrk\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 1578,
    "path": "../public/_nuxt/B2Te4lL_.js"
  },
  "/_nuxt/B4ik53cK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"447-SL3GWcoIhCidysG6pmEg5H+ZTgw\"",
    "mtime": "2026-06-16T15:08:45.476Z",
    "size": 1095,
    "path": "../public/_nuxt/B4ik53cK.js"
  },
  "/_nuxt/B7lz8QxX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36e-kppyG8rrSWN7eeb9KhsDd77jhxQ\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 878,
    "path": "../public/_nuxt/B7lz8QxX.js"
  },
  "/_nuxt/B85o2y5o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"150-na2Y3ObvCIh22OJ5BjHmUtqnk74\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 336,
    "path": "../public/_nuxt/B85o2y5o.js"
  },
  "/_nuxt/B8FQNJWL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ea-SH9oNSNbFVNX3gCMQiu/2KczrBY\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 490,
    "path": "../public/_nuxt/B8FQNJWL.js"
  },
  "/_nuxt/B9kpXFJf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e3-N1AI6FKMAT597xDorMs8pgztZ+A\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 483,
    "path": "../public/_nuxt/B9kpXFJf.js"
  },
  "/_nuxt/BCxegmsL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1dd-1B4kHJ42ApveS/0SCM/hsalnkF8\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 477,
    "path": "../public/_nuxt/BCxegmsL.js"
  },
  "/_nuxt/BI1deuOC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"398-d9TdNSww/QAD/eyTlyIL3NnQN7o\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 920,
    "path": "../public/_nuxt/BI1deuOC.js"
  },
  "/_nuxt/BM3qNy0o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"289-tZO9NfdA0bhQq8k80LCDaMhb3Mg\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 649,
    "path": "../public/_nuxt/BM3qNy0o.js"
  },
  "/_nuxt/BNJjbcjM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34d-fdbgrPGCCBN1QkrtRIW7l0bk3iI\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 845,
    "path": "../public/_nuxt/BNJjbcjM.js"
  },
  "/_nuxt/BO4WveYW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33a-Sk8IJSfZWltUCE5SwLZgTk8NSgw\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 826,
    "path": "../public/_nuxt/BO4WveYW.js"
  },
  "/_nuxt/BQIxkNfj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"218-yeHMXdFSW03zoKXDGXUtgiMPccc\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 536,
    "path": "../public/_nuxt/BQIxkNfj.js"
  },
  "/_nuxt/BOpgU1sE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"337-pvemyGL7wO+clK2t58moz45HqTQ\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 823,
    "path": "../public/_nuxt/BOpgU1sE.js"
  },
  "/_nuxt/BXYnEgZb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13ba-l74e6Y+AH4nFhF1TR9GeyHpXJh4\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 5050,
    "path": "../public/_nuxt/BXYnEgZb.js"
  },
  "/_nuxt/BawzHBdm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37a-1Eza4efkKtYwXyGBL2zSNWjDPeo\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 890,
    "path": "../public/_nuxt/BawzHBdm.js"
  },
  "/_nuxt/Bb1KAn49.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"471-qpAJsxtiJr2qoMZ/TobGsZjuz68\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 1137,
    "path": "../public/_nuxt/Bb1KAn49.js"
  },
  "/_nuxt/BcsdVTsV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a4b-nLePT5h0mADdtOvZnnx5Hn0VZD8\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 2635,
    "path": "../public/_nuxt/BcsdVTsV.js"
  },
  "/_nuxt/BeTDfVYm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bf-dxd/xHcJBBjzBbfjss3niYA704k\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 447,
    "path": "../public/_nuxt/BeTDfVYm.js"
  },
  "/_nuxt/Bj7YOS6u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19e-V9Ev+oourJTlyOPFuZbLk8CyrsU\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 414,
    "path": "../public/_nuxt/Bj7YOS6u.js"
  },
  "/_nuxt/BjTKTovo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"228-LXxvlE+6nqIrqLtW4r4/vxY9Bzs\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 552,
    "path": "../public/_nuxt/BjTKTovo.js"
  },
  "/_nuxt/BlAsXoAO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dd5-nddTJxpU87SdgS8ix7Y/OMj6cYc\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 3541,
    "path": "../public/_nuxt/BlAsXoAO.js"
  },
  "/_nuxt/Bn3cJPXn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"343-GilmsZlDekLWuIuAYHQVceIYUD8\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 835,
    "path": "../public/_nuxt/Bn3cJPXn.js"
  },
  "/_nuxt/BpCAS4jk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2116-7NcT2NVYU5c5M6f6d1aVJuCe+h0\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 8470,
    "path": "../public/_nuxt/BpCAS4jk.js"
  },
  "/_nuxt/Br1hSJNa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"360-mC5SAblZ4Xp4iXTHmpfBmuF8OnU\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 864,
    "path": "../public/_nuxt/Br1hSJNa.js"
  },
  "/_nuxt/Bt84ik4R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14e-KAeGkGvUzihbFTay/pN2rAJSogA\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 334,
    "path": "../public/_nuxt/Bt84ik4R.js"
  },
  "/_nuxt/Bu7DdsV2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"344-o8j/jREpvz9NlRrHlLXB76bFDI8\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 836,
    "path": "../public/_nuxt/Bu7DdsV2.js"
  },
  "/_nuxt/BuUjNKsM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d-Xe4EVSdFl6F4bOYVR0+AkPU8mxg\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 589,
    "path": "../public/_nuxt/BuUjNKsM.js"
  },
  "/_nuxt/ByX0czXS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"233-gaKGNeRoFh2IjUBcG+PqMRHZHPA\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 563,
    "path": "../public/_nuxt/ByX0czXS.js"
  },
  "/_nuxt/C-uoA5-0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"349-eZHMPd6X2WJuIaIcv5stRpljci8\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 841,
    "path": "../public/_nuxt/C-uoA5-0.js"
  },
  "/_nuxt/C02vUvhe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d2-6+oIjzHGkMvS6uP5BbgvVsOa2lk\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 466,
    "path": "../public/_nuxt/C02vUvhe.js"
  },
  "/_nuxt/C3R_b7Zj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13e-6nBRKPifYPDgt4oeaZ90QsVifoc\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 318,
    "path": "../public/_nuxt/C3R_b7Zj.js"
  },
  "/_nuxt/CANvInnb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3-2zG0VzYg6p6rkQ3gsXnZ8iB+raY\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 195,
    "path": "../public/_nuxt/CANvInnb.js"
  },
  "/_nuxt/CB5kuboL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"374-uzIqMcVcNjTg2ZMxqxjcF7zdiH4\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 884,
    "path": "../public/_nuxt/CB5kuboL.js"
  },
  "/_nuxt/CBVTaAuR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"379-WUjjBj6wyObzx+MA+9DIlmEtBLo\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 889,
    "path": "../public/_nuxt/CBVTaAuR.js"
  },
  "/_nuxt/CBx6YE8S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"634-DM71IfiHm4+0FGCKAGboMzjncT0\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 1588,
    "path": "../public/_nuxt/CBx6YE8S.js"
  },
  "/_nuxt/CEqQfAIP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"392-IaP4hmpJ++UiIkIpAY4Tr0KFLnE\"",
    "mtime": "2026-06-16T15:08:45.477Z",
    "size": 914,
    "path": "../public/_nuxt/CEqQfAIP.js"
  },
  "/_nuxt/CRErMDfT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"425-HWpzduSE7rc6/CVtgRW46RPBy24\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 1061,
    "path": "../public/_nuxt/CRErMDfT.js"
  },
  "/_nuxt/CNCYKuT6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ac-mbyuHdmfcAgFuyIoU1MguwWG4jw\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 428,
    "path": "../public/_nuxt/CNCYKuT6.js"
  },
  "/_nuxt/CTRONIv5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b3-HpF2DM5FZB9Y8mdkCRJo+1ugS7M\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 1203,
    "path": "../public/_nuxt/CTRONIv5.js"
  },
  "/_nuxt/CR9u8UUQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30c3d-xEixJR9t0Z97yIV6sllLJw2rpO0\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 199741,
    "path": "../public/_nuxt/CR9u8UUQ.js"
  },
  "/_nuxt/CUPmGOfY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d9-3X4pe4uSjoqiTc4AgIGtjizJgXk\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 985,
    "path": "../public/_nuxt/CUPmGOfY.js"
  },
  "/_nuxt/CV9qZc_b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1360-LqC48FEAZUSrUIW0p4BGB6q56IQ\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 4960,
    "path": "../public/_nuxt/CV9qZc_b.js"
  },
  "/_nuxt/CXOU0HaI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e5-3D9RZPh7hGxoA6wurdX22YW3+9o\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 485,
    "path": "../public/_nuxt/CXOU0HaI.js"
  },
  "/_nuxt/CZILNdj9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36f-pCjen4JjksLyS7mIkvFtDCmFXjE\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 879,
    "path": "../public/_nuxt/CZILNdj9.js"
  },
  "/_nuxt/C_N8oHBA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c4-YMTxxiTGDT9yTqxD7D9TMQ+LEng\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 452,
    "path": "../public/_nuxt/C_N8oHBA.js"
  },
  "/_nuxt/CjGk0bzn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e15-0dzVfXcNBIzqSy8AEoa20Nv1qt0\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 3605,
    "path": "../public/_nuxt/CjGk0bzn.js"
  },
  "/_nuxt/CeSr-y1w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aa5-uD75Qwm5PfPfghTh+jThaoij53Y\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 2725,
    "path": "../public/_nuxt/CeSr-y1w.js"
  },
  "/_nuxt/CmqA0CSc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"311-s0iABUtv8I44zYYF1y3X08mmNWE\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 785,
    "path": "../public/_nuxt/CmqA0CSc.js"
  },
  "/_nuxt/Cod50NpR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c1-oMqeiNTZfGVq7O5AKsELCtqI7AE\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 1729,
    "path": "../public/_nuxt/Cod50NpR.js"
  },
  "/_nuxt/Cou-zGXj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aed-1uUb6+wctHK7nTV+Hd1GsGdgPrA\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 2797,
    "path": "../public/_nuxt/Cou-zGXj.js"
  },
  "/_nuxt/CqcWxbfW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b2-Vh+tmmE6TPGkAXOMTS+NZk5bebg\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 434,
    "path": "../public/_nuxt/CqcWxbfW.js"
  },
  "/_nuxt/CsDSejr2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24b-317Dnh3PoqSAuv/fn7gfw1Tnotc\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 587,
    "path": "../public/_nuxt/CsDSejr2.js"
  },
  "/_nuxt/CsXSPBgL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"380-P+CZWpKIbst4RefVXu64GYijvVI\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 896,
    "path": "../public/_nuxt/CsXSPBgL.js"
  },
  "/_nuxt/CvAgAiIT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"360-g5lRAZA0toyUwM25b+K4KVGMVMo\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 864,
    "path": "../public/_nuxt/CvAgAiIT.js"
  },
  "/_nuxt/CvSlpzr3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f910-+CIzAuE8FYC7n2ZvjCBmeVUkR4c\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 129296,
    "path": "../public/_nuxt/CvSlpzr3.js"
  },
  "/_nuxt/D2ZEug2y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33b-Cbk0HH3x2bQ9PIdK5fcEdgUNgR0\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 827,
    "path": "../public/_nuxt/D2ZEug2y.js"
  },
  "/_nuxt/D5g9Es5u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243-0a8gz+3v3pMhu/Iypxcdnfz37bc\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 579,
    "path": "../public/_nuxt/D5g9Es5u.js"
  },
  "/_nuxt/D3MNM3Ht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"335-pLHj1v435lKYQ4obKm3TiOaHvnw\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 821,
    "path": "../public/_nuxt/D3MNM3Ht.js"
  },
  "/_nuxt/D68KOXeS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"904-8AQgkE9UNJDGWK7Up3w6UN70frk\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 2308,
    "path": "../public/_nuxt/D68KOXeS.js"
  },
  "/_nuxt/DAxOR17F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"262-dSK/9pf+oQWTxELiFvgWaXfgMM0\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 610,
    "path": "../public/_nuxt/DAxOR17F.js"
  },
  "/_nuxt/DBdlQykD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39b-u6dgbnyofkwMgbUdigpes58YVJc\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 923,
    "path": "../public/_nuxt/DBdlQykD.js"
  },
  "/_nuxt/DECDa4mY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"683-DXuHHhV1ouy2Cv4iKPl4oezdA0k\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 1667,
    "path": "../public/_nuxt/DECDa4mY.js"
  },
  "/_nuxt/DF0GTGEE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7c3c-VhgISINMSwLHSX5/5DPWjR/BpBY\"",
    "mtime": "2026-06-16T15:08:45.478Z",
    "size": 31804,
    "path": "../public/_nuxt/DF0GTGEE.js"
  },
  "/_nuxt/DFsT1jXc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2fd-27Xm8NBX5ajMJ4xh98czi7Mpus0\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 765,
    "path": "../public/_nuxt/DFsT1jXc.js"
  },
  "/_nuxt/DOelY9Nb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f4-lonuNsAYJEN0/VgJBn/futB3hQI\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1524,
    "path": "../public/_nuxt/DOelY9Nb.js"
  },
  "/_nuxt/DJ2nnukS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"165c4-OIbYhsy+FNUtS6hrxmV3sL/uENc\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 91588,
    "path": "../public/_nuxt/DJ2nnukS.js"
  },
  "/_nuxt/DRcsPdjN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"261f-RkH4Kgwce8ujijEc1gutf3XkR0Q\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 9759,
    "path": "../public/_nuxt/DRcsPdjN.js"
  },
  "/_nuxt/DSfPxec8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e2-FN11kXj5CnrRhf/pBZE8AwiOv5k\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1250,
    "path": "../public/_nuxt/DSfPxec8.js"
  },
  "/_nuxt/DYd_Qh-u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5ac-NmWAhpW4ahpcIJu5IbRCFyA+AUA\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1452,
    "path": "../public/_nuxt/DYd_Qh-u.js"
  },
  "/_nuxt/D_zvPmm0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c0-qrhjMwqqBX3caOY67kDL4hLHCi4\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1216,
    "path": "../public/_nuxt/D_zvPmm0.js"
  },
  "/_nuxt/De5l3hrd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"137a-A24GT6gDxORNNC6rI95/nDf26CY\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 4986,
    "path": "../public/_nuxt/De5l3hrd.js"
  },
  "/_nuxt/DfHfAfcH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c0-42EGjDTGiCo4vzSSKkjtzLwGhFc\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1472,
    "path": "../public/_nuxt/DfHfAfcH.js"
  },
  "/_nuxt/Dhm6Gk3G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ab-dv2EyC4AzPh3sAk1N4j3xiL3upQ\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 427,
    "path": "../public/_nuxt/Dhm6Gk3G.js"
  },
  "/_nuxt/DlwAckkv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"413-DEQ2vGtuDAN9AimbOF8QU15a6to\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1043,
    "path": "../public/_nuxt/DlwAckkv.js"
  },
  "/_nuxt/DpDXv5tT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a8-OA/nQ8e1XCqKw3ScTbGazIdQFdA\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 424,
    "path": "../public/_nuxt/DpDXv5tT.js"
  },
  "/_nuxt/DrmdR_Yl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"55c-27V7XF/UTJ6u9dDoofIVNtr/E8Y\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1372,
    "path": "../public/_nuxt/DrmdR_Yl.js"
  },
  "/_nuxt/DtWJ1Ffs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35c-NEDxkkZOXNlILqSBkfGL9cYzHJ4\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 860,
    "path": "../public/_nuxt/DtWJ1Ffs.js"
  },
  "/_nuxt/DuMHyX8f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f0-uTZJ+YNOuoHcQ0DKcJIvFNOacso\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1520,
    "path": "../public/_nuxt/DuMHyX8f.js"
  },
  "/_nuxt/DuhoAnL7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6dc-MbWMmcmPiXtUhm9Lf7mi2pqFDsI\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1756,
    "path": "../public/_nuxt/DuhoAnL7.js"
  },
  "/_nuxt/DxQyWESs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c1-3Mu2Or3EWuEU+IrDAqC8eOWk/5M\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 961,
    "path": "../public/_nuxt/DxQyWESs.js"
  },
  "/_nuxt/Dz8QC3nQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f3-AcVWU4LE03gQ8DkCuLS9Wtmltgc\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 243,
    "path": "../public/_nuxt/Dz8QC3nQ.js"
  },
  "/_nuxt/Ixvejwx2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f0-JrEcFrdX1OKValLBJuGUraHO6Fo\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 1520,
    "path": "../public/_nuxt/Ixvejwx2.js"
  },
  "/_nuxt/KXpMNwwj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"339-Huj7w++3Oge2PND0BKHrk+Ey46Q\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 825,
    "path": "../public/_nuxt/KXpMNwwj.js"
  },
  "/_nuxt/NxuedP0G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ea-uxtDbDSrVB1sfIRPBfr+rYVpUaI\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 490,
    "path": "../public/_nuxt/NxuedP0G.js"
  },
  "/_nuxt/UQ2fDrWF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"342-xEtBEDH2Ywsg5H0pA9xyCP7Tr3A\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 834,
    "path": "../public/_nuxt/UQ2fDrWF.js"
  },
  "/_nuxt/WxJmI3HP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d1-iOFsHACQynTZbuMOBiFSgGYEpSk\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 465,
    "path": "../public/_nuxt/WxJmI3HP.js"
  },
  "/_nuxt/WyJIcACs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30ed-TVLkb328eTcqrRUYu99KlmfEsZ0\"",
    "mtime": "2026-06-16T15:08:45.479Z",
    "size": 12525,
    "path": "../public/_nuxt/WyJIcACs.js"
  },
  "/_nuxt/XBizFgdD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14fa-5eX35HE9Fg/GA+MutCVeo08ip58\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 5370,
    "path": "../public/_nuxt/XBizFgdD.js"
  },
  "/_nuxt/e3FPWjaS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"147-C2OHR2BfvbUyGnd8aK6d3dZwD4I\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 327,
    "path": "../public/_nuxt/e3FPWjaS.js"
  },
  "/_nuxt/eb2kgyDa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49d-1vscADH+T3A6+Y6MHVxYxQCuX70\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 1181,
    "path": "../public/_nuxt/eb2kgyDa.js"
  },
  "/_nuxt/g3yuUDjQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"657-Z5YUi9hPSQ6yj+i3haUt7gcHaIA\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 1623,
    "path": "../public/_nuxt/g3yuUDjQ.js"
  },
  "/_nuxt/entry.uf7WM91M.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"343ee-6Eu0vnMUlJpLpoA0UA2QQe/qbBg\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 213998,
    "path": "../public/_nuxt/entry.uf7WM91M.css"
  },
  "/_nuxt/k22TW3fQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a2-XU6JoYF+FlXoVD+diEYaQ+7ljOY\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 1698,
    "path": "../public/_nuxt/k22TW3fQ.js"
  },
  "/_nuxt/ljTahg5y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cd9-1L8JJ6Y103pl+5/rN/q1OZO5Z8k\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 3289,
    "path": "../public/_nuxt/ljTahg5y.js"
  },
  "/_nuxt/pmZgY2vO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54f-vHG2MqLkn8kioMvng5t8XMGJP8c\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 1359,
    "path": "../public/_nuxt/pmZgY2vO.js"
  },
  "/_nuxt/s211Z-g7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36f-Gs6v4wUhrK/H/2aWPHv7yy6k31I\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 879,
    "path": "../public/_nuxt/s211Z-g7.js"
  },
  "/_nuxt/sqlite3-opfs-async-proxy-C_otN2ZJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24eb-/FBLK7guMdffqRNvJNbJgk4Zwss\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 9451,
    "path": "../public/_nuxt/sqlite3-opfs-async-proxy-C_otN2ZJ.js"
  },
  "/_nuxt/sqlite3-worker1-bundler-friendly-6iGJrEPe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"300f4-QhE42rOjP3OD2kE+hwUo3oIeo+w\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 196852,
    "path": "../public/_nuxt/sqlite3-worker1-bundler-friendly-6iGJrEPe.js"
  },
  "/_nuxt/tQT260zh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b84-X8wYsztpwKN2nZ858ALSxH7KC7w\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 2948,
    "path": "../public/_nuxt/tQT260zh.js"
  },
  "/_nuxt/u-hFmgO1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54f-TO6/ABKZLlASzaQchep7embX9GM\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 1359,
    "path": "../public/_nuxt/u-hFmgO1.js"
  },
  "/_nuxt/vVH31doZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"881-k39rxK0gyafM9xWgIRJhl0f0wyU\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 2177,
    "path": "../public/_nuxt/vVH31doZ.js"
  },
  "/_nuxt/xtB0SSU-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1733-pAUUp0oojp7GIzr0/vgNQnaonLk\"",
    "mtime": "2026-06-16T15:08:45.481Z",
    "size": 5939,
    "path": "../public/_nuxt/xtB0SSU-.js"
  },
  "/contributing/development.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2a61c-NI3w5cKnm7zpn2gMSwFWUitG5ZI\"",
    "mtime": "2026-06-16T15:08:43.799Z",
    "size": 173596,
    "path": "../public/contributing/development.html"
  },
  "/_nuxt/qQ-JSsoE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f98c5-JlwPA0wXlo0+9hD51MkW76YL1d0\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 1022149,
    "path": "../public/_nuxt/qQ-JSsoE.js"
  },
  "/_nuxt/sqlite3.DBpDb1lf.wasm": {
    "type": "application/wasm",
    "etag": "\"d117f-DZ/FD4oW3SqSLEuDOEQ4+vXRNGQ\"",
    "mtime": "2026-06-16T15:08:45.481Z",
    "size": 856447,
    "path": "../public/_nuxt/sqlite3.DBpDb1lf.wasm"
  },
  "/_nuxt/sqlite3-DBpDb1lf.wasm": {
    "type": "application/wasm",
    "etag": "\"d117f-DZ/FD4oW3SqSLEuDOEQ4+vXRNGQ\"",
    "mtime": "2026-06-16T15:08:45.480Z",
    "size": 856447,
    "path": "../public/_nuxt/sqlite3-DBpDb1lf.wasm"
  },
  "/contributing/examples.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1d25a-2fUVyPKAJ1wYSdYm8BZHbX61HP4\"",
    "mtime": "2026-06-16T15:08:43.828Z",
    "size": 119386,
    "path": "../public/contributing/examples.html"
  },
  "/contributing/releases.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1def1-xBZ9X0YrVidrXj0US5ykADkPSng\"",
    "mtime": "2026-06-16T15:08:43.910Z",
    "size": 122609,
    "path": "../public/contributing/releases.html"
  },
  "/examples/examples.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2f1dd-ULrPdity/o8XaBuKgQIKFp2qBFA\"",
    "mtime": "2026-06-16T15:08:43.991Z",
    "size": 192989,
    "path": "../public/examples/examples.html"
  },
  "/getting-started/first-run.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1f664-jZoSNpPNkEqBEpGxwWl3x1t/svQ\"",
    "mtime": "2026-06-16T15:08:40.316Z",
    "size": 128612,
    "path": "../public/getting-started/first-run.html"
  },
  "/getting-started/backends.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1e666-lwvYDPdYnLJARER7ZBJNQqiP9aI\"",
    "mtime": "2026-06-16T15:08:42.494Z",
    "size": 124518,
    "path": "../public/getting-started/backends.html"
  },
  "/getting-started/installation.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"20730-fygOe030FvlDeHt815wQMd0R+ek\"",
    "mtime": "2026-06-16T15:08:40.316Z",
    "size": 132912,
    "path": "../public/getting-started/installation.html"
  },
  "/getting-started/introduction.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1fb8c-dM37RD0wjqeFACYr1aS/je4ZQQA\"",
    "mtime": "2026-06-16T15:08:40.315Z",
    "size": 129932,
    "path": "../public/getting-started/introduction.html"
  },
  "/getting-started/models.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1f39d-walMTTVrimb49uxMxBrqFdvg2w0\"",
    "mtime": "2026-06-16T15:08:42.494Z",
    "size": 127901,
    "path": "../public/getting-started/models.html"
  },
  "/guides/mobile.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"249a3-DopWdqabTQ0tiFu/AiD3yugOjdU\"",
    "mtime": "2026-06-16T15:08:43.786Z",
    "size": 149923,
    "path": "../public/guides/mobile.html"
  },
  "/guides/performance.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2255b-2UmBOg3VVtSBTs7aPn8vc266ghA\"",
    "mtime": "2026-06-16T15:08:40.315Z",
    "size": 140635,
    "path": "../public/guides/performance.html"
  },
  "/guides/troubleshooting-models.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"23996-Orr4zHNO4OI7cU428eyo6q5WKfE\"",
    "mtime": "2026-06-16T15:08:43.799Z",
    "size": 145814,
    "path": "../public/guides/troubleshooting-models.html"
  },
  "/raw/index.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"19e5-EFA8S5jUWRgGSQgLi/eYUr4qQ80\"",
    "mtime": "2026-06-16T15:08:42.170Z",
    "size": 6629,
    "path": "../public/raw/index.md"
  },
  "/raw/troubleshooting.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"1c37-2+Uk1WBifAk9dRRvxwwHLqcC6iY\"",
    "mtime": "2026-06-16T15:08:41.959Z",
    "size": 7223,
    "path": "../public/raw/troubleshooting.md"
  },
  "/reference/cargo-features.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2773d-Q52xn+fpUpsX5jQD8BcIhhrfAq4\"",
    "mtime": "2026-06-16T15:08:43.799Z",
    "size": 161597,
    "path": "../public/reference/cargo-features.html"
  },
  "/reference/crates.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2076a-CLPje5OzjjtmuPQdm9Bg5smH8R0\"",
    "mtime": "2026-06-16T15:08:43.776Z",
    "size": 132970,
    "path": "../public/reference/crates.html"
  },
  "/reference/versioning.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"1dbe3-5HJyHkrqL4smzK+/PTcJbe50bsc\"",
    "mtime": "2026-06-16T15:08:43.799Z",
    "size": 121827,
    "path": "../public/reference/versioning.html"
  },
  "/rust/chat.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"29ff8-nG7UJOBZXCEeNsgkdHRi7kdwp6s\"",
    "mtime": "2026-06-16T15:08:42.490Z",
    "size": 172024,
    "path": "../public/rust/chat.html"
  },
  "/rust/completion.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"23d25-opxPVa5Og5GYXNIUYb9pTeAjCaY\"",
    "mtime": "2026-06-16T15:08:42.404Z",
    "size": 146725,
    "path": "../public/rust/completion.html"
  },
  "/rust/lifecycle.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2873c-E8LkhFwRt5pqCkD08mERX80gYoA\"",
    "mtime": "2026-06-16T15:08:40.314Z",
    "size": 165692,
    "path": "../public/rust/lifecycle.html"
  },
  "/rust/embeddings.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"22846-Ly+IVc3L2PPMzCB1yXM1fQ1AnAg\"",
    "mtime": "2026-06-16T15:08:42.494Z",
    "size": 141382,
    "path": "../public/rust/embeddings.html"
  },
  "/rust/multimodal.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"250d8-S38QnpwHCW8JY517zKrGEI6Gn50\"",
    "mtime": "2026-06-16T15:08:42.524Z",
    "size": 151768,
    "path": "../public/rust/multimodal.html"
  },
  "/rust/structured-output.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"23d30-Wl1mXz/SJInCq6zV3ZAoDS3n88U\"",
    "mtime": "2026-06-16T15:08:42.615Z",
    "size": 146736,
    "path": "../public/rust/structured-output.html"
  },
  "/rust/workspace.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"26f4a-QY7Y8/kJQumgWb67Nl7x9q9uqCc\"",
    "mtime": "2026-06-16T15:08:42.364Z",
    "size": 159562,
    "path": "../public/rust/workspace.html"
  },
  "/server/openai-api.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"6635f-FHZZyAGjN3VUZ4dnPIw6vI1ex68\"",
    "mtime": "2026-06-16T15:08:43.099Z",
    "size": 418655,
    "path": "../public/server/openai-api.html"
  },
  "/server/operations.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2d682-oMTAqWsQOagokyeCNXZO9xdLG9E\"",
    "mtime": "2026-06-16T15:08:43.228Z",
    "size": 185986,
    "path": "../public/server/operations.html"
  },
  "/server/running.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"30e16-4hTSg+2wDlPl9J3shb0uiR7B9aQ\"",
    "mtime": "2026-06-16T15:08:40.316Z",
    "size": 200214,
    "path": "../public/server/running.html"
  },
  "/server/streaming.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2bcb6-fGLMuik7wcmxV2H8G3t6rON9pfA\"",
    "mtime": "2026-06-16T15:08:43.103Z",
    "size": 179382,
    "path": "../public/server/streaming.html"
  },
  "/tauri/permissions.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"28200-shEFisV3CX+MmxHqTegj/N8FrsQ\"",
    "mtime": "2026-06-16T15:08:43.417Z",
    "size": 164352,
    "path": "../public/tauri/permissions.html"
  },
  "/tauri/plugin.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"33825-xNBtoKG8tXd8PUEua0SDa+cy+B0\"",
    "mtime": "2026-06-16T15:08:40.315Z",
    "size": 210981,
    "path": "../public/tauri/plugin.html"
  },
  "/tauri/typescript-client.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"31d51-PYm76TdRdxQa3hS7+N0ImhnUoRw\"",
    "mtime": "2026-06-16T15:08:43.658Z",
    "size": 204113,
    "path": "../public/tauri/typescript-client.html"
  },
  "/troubleshooting/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"68a7-/8XRCYzTJ3etiANXoVQr46h5NYg\"",
    "mtime": "2026-06-16T15:08:43.969Z",
    "size": 26791,
    "path": "../public/troubleshooting/_payload.json"
  },
  "/tauri/update_notes.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2a17f-IBY9ud5/giOGBJJ2hWULgycLkpE\"",
    "mtime": "2026-06-16T15:08:43.684Z",
    "size": 172415,
    "path": "../public/tauri/update_notes.html"
  },
  "/typescript/update_notes.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"28c81-D0hkHwT2hFxBmY7Hx+1jtlWOOPM\"",
    "mtime": "2026-06-16T15:08:43.710Z",
    "size": 167041,
    "path": "../public/typescript/update_notes.html"
  },
  "/typescript/packages.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"37005-CHL6XGH/4iQHk2JauKUC3rtIV68\"",
    "mtime": "2026-06-16T15:08:40.316Z",
    "size": 225285,
    "path": "../public/typescript/packages.html"
  },
  "/__nuxt_content/docs/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1f648-xh6DhVlg5bIqvEjtaJ71BTWJeRA\"",
    "mtime": "2026-06-16T15:08:38.473Z",
    "size": 128584,
    "path": "../public/__nuxt_content/docs/sql_dump.txt"
  },
  "/typescript/client-contracts.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"2fb6c-J2R44HC8HqQURtrU3Z21tNGWszY\"",
    "mtime": "2026-06-16T15:08:43.691Z",
    "size": 195436,
    "path": "../public/typescript/client-contracts.html"
  },
  "/__nuxt_content/landing/sql_dump.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"eb4-EcedUgSs9H0cmtbnlD6Tu2/CoMY\"",
    "mtime": "2026-06-16T15:08:38.473Z",
    "size": 3764,
    "path": "../public/__nuxt_content/landing/sql_dump.txt"
  },
  "/__og-image__/static/og.png": {
    "type": "image/png",
    "etag": "\"111cb-UHfuI0Ww/VkW1lRlfrw+WciN+v8\"",
    "mtime": "2026-06-16T15:08:40.123Z",
    "size": 70091,
    "path": "../public/__og-image__/static/og.png"
  },
  "/_ipx/_/logo.webp": {
    "type": "image/webp",
    "etag": "\"175c4-GIHeB62t3Ee1xwdb2RFL0xDEhMI\"",
    "mtime": "2026-06-16T15:08:40.517Z",
    "size": 95684,
    "path": "../public/_ipx/_/logo.webp"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-6Q098CbARIIYzi4f1ip0OkI9k1Q\"",
    "mtime": "2026-06-16T15:08:45.431Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/contributing/development/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"6642-7QGxbJKH80vVFEY6ddUbPZJn+XE\"",
    "mtime": "2026-06-16T15:08:45.069Z",
    "size": 26178,
    "path": "../public/contributing/development/_payload.json"
  },
  "/contributing/examples/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"2be8-iJeTYn2gx0IgyGOZ1hTPVik25Y4\"",
    "mtime": "2026-06-16T15:08:45.085Z",
    "size": 11240,
    "path": "../public/contributing/examples/_payload.json"
  },
  "/contributing/releases/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"291a-yOByJ2cc6bkQysmbOaTXpUoprGU\"",
    "mtime": "2026-06-16T15:08:45.087Z",
    "size": 10522,
    "path": "../public/contributing/releases/_payload.json"
  },
  "/examples/examples/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"7105-4T/P61QdCHsFc9eD+lYQVU87VOo\"",
    "mtime": "2026-06-16T15:08:45.089Z",
    "size": 28933,
    "path": "../public/examples/examples/_payload.json"
  },
  "/getting-started/backends/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"2bad-EWARysa1qTu+j31mHEiuDd7glMY\"",
    "mtime": "2026-06-16T15:08:44.043Z",
    "size": 11181,
    "path": "../public/getting-started/backends/_payload.json"
  },
  "/getting-started/first-run/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3b42-9Rz3ClcqVi/st6IKtECvnCOIHXQ\"",
    "mtime": "2026-06-16T15:08:43.952Z",
    "size": 15170,
    "path": "../public/getting-started/first-run/_payload.json"
  },
  "/getting-started/installation/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"32f8-j4Qvv0gCAw2Z6Pgd5zEVTpLkfRc\"",
    "mtime": "2026-06-16T15:08:43.929Z",
    "size": 13048,
    "path": "../public/getting-started/installation/_payload.json"
  },
  "/getting-started/introduction/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"295b-7P6LpDOCWnI6LRRjfe9vHsU3AWQ\"",
    "mtime": "2026-06-16T15:08:43.817Z",
    "size": 10587,
    "path": "../public/getting-started/introduction/_payload.json"
  },
  "/getting-started/models/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"2d44-okuBdR3fgrbpCq4wBJmWpI0alQc\"",
    "mtime": "2026-06-16T15:08:44.062Z",
    "size": 11588,
    "path": "../public/getting-started/models/_payload.json"
  },
  "/guides/mobile/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"43e1-o0vv5ZCtqAw6Xepa3X6oFvk+H/4\"",
    "mtime": "2026-06-16T15:08:44.225Z",
    "size": 17377,
    "path": "../public/guides/mobile/_payload.json"
  },
  "/guides/performance/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3c0b-jCoAF/S5QmnpiiDSYlqxWh4Jdp4\"",
    "mtime": "2026-06-16T15:08:43.900Z",
    "size": 15371,
    "path": "../public/guides/performance/_payload.json"
  },
  "/guides/troubleshooting-models/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"4a4b-99hXj7VMZRWuP2oTuiiCXZc0ezU\"",
    "mtime": "2026-06-16T15:08:44.755Z",
    "size": 19019,
    "path": "../public/guides/troubleshooting-models/_payload.json"
  },
  "/raw/contributing/examples.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"634-m0C+M96tjf4Jsy6DbkknHM/HFtc\"",
    "mtime": "2026-06-16T15:08:41.766Z",
    "size": 1588,
    "path": "../public/raw/contributing/examples.md"
  },
  "/raw/contributing/development.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"1db4-d8MrRekcR561ZamsA+9YwVKF+G4\"",
    "mtime": "2026-06-16T15:08:41.477Z",
    "size": 7604,
    "path": "../public/raw/contributing/development.md"
  },
  "/raw/contributing/releases.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"8c1-CkQG+R5+G1GNka0darILv/2Xmkk\"",
    "mtime": "2026-06-16T15:08:41.766Z",
    "size": 2241,
    "path": "../public/raw/contributing/releases.md"
  },
  "/raw/examples/examples.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"2a8b-DhyWYUg90aQ9vwthUmp32k7/3F0\"",
    "mtime": "2026-06-16T15:08:40.964Z",
    "size": 10891,
    "path": "../public/raw/examples/examples.md"
  },
  "/raw/getting-started/backends.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"958-+XndWpu47whL1wq8DBNAt4I5LLk\"",
    "mtime": "2026-06-16T15:08:40.127Z",
    "size": 2392,
    "path": "../public/raw/getting-started/backends.md"
  },
  "/raw/getting-started/first-run.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"83c-cy1Df4OZdVxFdnVLKMebYE3QqHY\"",
    "mtime": "2026-06-16T15:08:40.119Z",
    "size": 2108,
    "path": "../public/raw/getting-started/first-run.md"
  },
  "/raw/getting-started/installation.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"9a2-+SwSVY7N5KiRZRso1gp3bMtDc9I\"",
    "mtime": "2026-06-16T15:08:40.113Z",
    "size": 2466,
    "path": "../public/raw/getting-started/installation.md"
  },
  "/raw/getting-started/introduction.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"b61-T+SAZbErA/d87QA+tbVLqXL4iUs\"",
    "mtime": "2026-06-16T15:08:40.119Z",
    "size": 2913,
    "path": "../public/raw/getting-started/introduction.md"
  },
  "/raw/getting-started/models.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"817-dydnQ5QykXxhE3yC3VdBqrSEgPE\"",
    "mtime": "2026-06-16T15:08:40.089Z",
    "size": 2071,
    "path": "../public/raw/getting-started/models.md"
  },
  "/raw/guides/mobile.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"13c7-I3dRQ/5CKVmE9FA5JaHZeoMh+wo\"",
    "mtime": "2026-06-16T15:08:40.517Z",
    "size": 5063,
    "path": "../public/raw/guides/mobile.md"
  },
  "/raw/guides/performance.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"c13-YdqopfXm7dK1O/NCQcmEq/t/Xpc\"",
    "mtime": "2026-06-16T15:08:40.509Z",
    "size": 3091,
    "path": "../public/raw/guides/performance.md"
  },
  "/raw/guides/troubleshooting-models.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"11f6-Tb1fjlc9B2/h4k8K3PIPArdoYw4\"",
    "mtime": "2026-06-16T15:08:40.517Z",
    "size": 4598,
    "path": "../public/raw/guides/troubleshooting-models.md"
  },
  "/raw/reference/cargo-features.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"1df6-0dtZ7vbElMsrpZSiNjVhS/arhO4\"",
    "mtime": "2026-06-16T15:08:40.525Z",
    "size": 7670,
    "path": "../public/raw/reference/cargo-features.md"
  },
  "/raw/reference/crates.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"d1b-/W1Hxzy1oD3fF3D6vmaFwlC4Wpw\"",
    "mtime": "2026-06-16T15:08:40.509Z",
    "size": 3355,
    "path": "../public/raw/reference/crates.md"
  },
  "/raw/reference/versioning.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"7bf-baEBw8bRSLHmPpXpMjRbyvhQOP0\"",
    "mtime": "2026-06-16T15:08:41.274Z",
    "size": 1983,
    "path": "../public/raw/reference/versioning.md"
  },
  "/raw/rust/chat.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"24f8-lCypep+qhaER035RXzVGiPl06oY\"",
    "mtime": "2026-06-16T15:08:40.235Z",
    "size": 9464,
    "path": "../public/raw/rust/chat.md"
  },
  "/raw/rust/completion.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"155a-jjRjemZMZm4TW1S46hTkEBzKE1Q\"",
    "mtime": "2026-06-16T15:08:40.235Z",
    "size": 5466,
    "path": "../public/raw/rust/completion.md"
  },
  "/raw/rust/embeddings.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"126e-s42Ax8LIVgYcgsz55boGB/N+T0Y\"",
    "mtime": "2026-06-16T15:08:40.251Z",
    "size": 4718,
    "path": "../public/raw/rust/embeddings.md"
  },
  "/raw/rust/lifecycle.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"2077-QuEw3Ggd9PI0I37AAuMI2MyDkk8\"",
    "mtime": "2026-06-16T15:08:40.234Z",
    "size": 8311,
    "path": "../public/raw/rust/lifecycle.md"
  },
  "/raw/rust/multimodal.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"1779-8uVDFSpHCWzWOMPNF/q4GoWQWDI\"",
    "mtime": "2026-06-16T15:08:40.311Z",
    "size": 6009,
    "path": "../public/raw/rust/multimodal.md"
  },
  "/raw/rust/structured-output.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"176b-symOsmynDdIcNdamjWf0KAMKQHE\"",
    "mtime": "2026-06-16T15:08:40.311Z",
    "size": 5995,
    "path": "../public/raw/rust/structured-output.md"
  },
  "/raw/rust/workspace.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"1e62-e7Y9IgrrMg7+yBsZvD+RpBSx88Y\"",
    "mtime": "2026-06-16T15:08:40.130Z",
    "size": 7778,
    "path": "../public/raw/rust/workspace.md"
  },
  "/raw/server/openai-api.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"960e-p29wK89ljc4/MQyAlWnGsbxm17g\"",
    "mtime": "2026-06-16T15:08:40.496Z",
    "size": 38414,
    "path": "../public/raw/server/openai-api.md"
  },
  "/raw/server/operations.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"29d5-mjIANqBPrScHcPgaDP6iKSU/Ufc\"",
    "mtime": "2026-06-16T15:08:40.507Z",
    "size": 10709,
    "path": "../public/raw/server/operations.md"
  },
  "/raw/server/running.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"30af-ALg/qX8ZEAdl1HDkKEILuPGiZGs\"",
    "mtime": "2026-06-16T15:08:40.316Z",
    "size": 12463,
    "path": "../public/raw/server/running.md"
  },
  "/raw/server/streaming.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"203b-GezZUDxLclArCq2BMP8JNo9m4P8\"",
    "mtime": "2026-06-16T15:08:40.496Z",
    "size": 8251,
    "path": "../public/raw/server/streaming.md"
  },
  "/raw/tauri/permissions.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"204f-ZMfl/Lc0zQcqrCMhOnU1LrRvHj8\"",
    "mtime": "2026-06-16T15:08:40.508Z",
    "size": 8271,
    "path": "../public/raw/tauri/permissions.md"
  },
  "/raw/tauri/plugin.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"4645-uAM8w4/NUrB+3SkHpvm5BEg0erk\"",
    "mtime": "2026-06-16T15:08:40.507Z",
    "size": 17989,
    "path": "../public/raw/tauri/plugin.md"
  },
  "/raw/tauri/typescript-client.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"1ecf-QzfnlpqAXn/mqmXzI/WKqlxRPOw\"",
    "mtime": "2026-06-16T15:08:40.508Z",
    "size": 7887,
    "path": "../public/raw/tauri/typescript-client.md"
  },
  "/raw/tauri/update_notes.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"2940-JfHrSvu0S7/H43c085cj6+9jggw\"",
    "mtime": "2026-06-16T15:08:40.508Z",
    "size": 10560,
    "path": "../public/raw/tauri/update_notes.md"
  },
  "/raw/typescript/client-contracts.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"306c-sN0IcyjOKRXPXtNId3boxFQbE7g\"",
    "mtime": "2026-06-16T15:08:40.508Z",
    "size": 12396,
    "path": "../public/raw/typescript/client-contracts.md"
  },
  "/raw/typescript/packages.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"321e-Z0SYzRUQdzord4FqTgn377WBG/o\"",
    "mtime": "2026-06-16T15:08:40.507Z",
    "size": 12830,
    "path": "../public/raw/typescript/packages.md"
  },
  "/raw/typescript/update_notes.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"262d-E4CBLTTyaGKpZu61WKr2UfrYgic\"",
    "mtime": "2026-06-16T15:08:40.517Z",
    "size": 9773,
    "path": "../public/raw/typescript/update_notes.md"
  },
  "/reference/cargo-features/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"402a-fwryWbfjacQJ2kPNpumkirb336M\"",
    "mtime": "2026-06-16T15:08:45.056Z",
    "size": 16426,
    "path": "../public/reference/cargo-features/_payload.json"
  },
  "/reference/crates/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"2b82-SrB5ao0GsMvUXEfkJ9kRvihrYWE\"",
    "mtime": "2026-06-16T15:08:44.215Z",
    "size": 11138,
    "path": "../public/reference/crates/_payload.json"
  },
  "/reference/versioning/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"26f7-AHctR8b6xjZrhqPsxUAkofLFsN0\"",
    "mtime": "2026-06-16T15:08:44.721Z",
    "size": 9975,
    "path": "../public/reference/versioning/_payload.json"
  },
  "/rust/chat/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"81e8-SGvYUCjwNhL2ypw/OpWQfyRja3Q\"",
    "mtime": "2026-06-16T15:08:44.031Z",
    "size": 33256,
    "path": "../public/rust/chat/_payload.json"
  },
  "/rust/completion/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"5b2d-78ZcTHMRuIYHBPIvV3M8aykNdTE\"",
    "mtime": "2026-06-16T15:08:43.999Z",
    "size": 23341,
    "path": "../public/rust/completion/_payload.json"
  },
  "/rust/lifecycle/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"5799-OUejPCJgfiElZcZF7yg7VGWiv0w\"",
    "mtime": "2026-06-16T15:08:43.776Z",
    "size": 22425,
    "path": "../public/rust/lifecycle/_payload.json"
  },
  "/rust/embeddings/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"583b-Z9TWuJTHykFmwAKQAMxlYCyGctM\"",
    "mtime": "2026-06-16T15:08:44.062Z",
    "size": 22587,
    "path": "../public/rust/embeddings/_payload.json"
  },
  "/rust/multimodal/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"5d2d-tocJ9dHaLPmS+O5cT2yjKssPsYE\"",
    "mtime": "2026-06-16T15:08:44.069Z",
    "size": 23853,
    "path": "../public/rust/multimodal/_payload.json"
  },
  "/rust/structured-output/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"5c90-0QwqUG4CohRgTidhezjLJtjEDwM\"",
    "mtime": "2026-06-16T15:08:44.083Z",
    "size": 23696,
    "path": "../public/rust/structured-output/_payload.json"
  },
  "/rust/workspace/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3e5f-Mn9P7dWi8U1+IJB0UnbKpszubs0\"",
    "mtime": "2026-06-16T15:08:43.991Z",
    "size": 15967,
    "path": "../public/rust/workspace/_payload.json"
  },
  "/server/openai-api/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"15a6f-KoSSi9FvAA+A6Uvi0GFuNZlvOuU\"",
    "mtime": "2026-06-16T15:08:44.100Z",
    "size": 88687,
    "path": "../public/server/openai-api/_payload.json"
  },
  "/server/operations/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"721e-O7/8esqv8a5mfx6WO7qCX04p9Vg\"",
    "mtime": "2026-06-16T15:08:44.158Z",
    "size": 29214,
    "path": "../public/server/operations/_payload.json"
  },
  "/server/running/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"76c1-NKkujHC42S/pw+YLuq4QyWhkrAE\"",
    "mtime": "2026-06-16T15:08:43.928Z",
    "size": 30401,
    "path": "../public/server/running/_payload.json"
  },
  "/server/streaming/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"9aac-OYsjXF32r6GvacU5kjvep79QIZE\"",
    "mtime": "2026-06-16T15:08:44.108Z",
    "size": 39596,
    "path": "../public/server/streaming/_payload.json"
  },
  "/tauri/permissions/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"5938-tYYvp6G7UvKLyYQ7lfEVSwALOMk\"",
    "mtime": "2026-06-16T15:08:44.162Z",
    "size": 22840,
    "path": "../public/tauri/permissions/_payload.json"
  },
  "/tauri/plugin/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"80f9-IFDSiMhzj+jR2J2YCzcqaO3+LGo\"",
    "mtime": "2026-06-16T15:08:43.913Z",
    "size": 33017,
    "path": "../public/tauri/plugin/_payload.json"
  },
  "/tauri/typescript-client/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"d57b-OhmuYvzLTi5qbY6dJ3iUJfuhjic\"",
    "mtime": "2026-06-16T15:08:44.181Z",
    "size": 54651,
    "path": "../public/tauri/typescript-client/_payload.json"
  },
  "/tauri/update_notes/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"51b0-JeqfUWhbhC9Fnd6tQvafcU2AMxw\"",
    "mtime": "2026-06-16T15:08:44.192Z",
    "size": 20912,
    "path": "../public/tauri/update_notes/_payload.json"
  },
  "/typescript/client-contracts/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"7650-iQ8qxC4SLfwZefgdPmJXGiOJwfo\"",
    "mtime": "2026-06-16T15:08:44.211Z",
    "size": 30288,
    "path": "../public/typescript/client-contracts/_payload.json"
  },
  "/typescript/packages/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"9266-nJdKfgaMzkd9WPD/ZSa+VMeC1Ik\"",
    "mtime": "2026-06-16T15:08:43.986Z",
    "size": 37478,
    "path": "../public/typescript/packages/_payload.json"
  },
  "/typescript/update_notes/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"4ee1-SWw843GvHpa54i4DSYYJ3rALVBU\"",
    "mtime": "2026-06-16T15:08:44.213Z",
    "size": 20193,
    "path": "../public/typescript/update_notes/_payload.json"
  },
  "/__og-image__/static/troubleshooting/og.png": {
    "type": "image/png",
    "etag": "\"e84d-iaY3x1l38eT+415eQlS7NN9pE1I\"",
    "mtime": "2026-06-16T15:08:44.031Z",
    "size": 59469,
    "path": "../public/__og-image__/static/troubleshooting/og.png"
  },
  "/_nuxt/builds/meta/7bd93c10-de99-4faa-91f1-c4d089f8e4c6.json": {
    "type": "application/json",
    "etag": "\"36f-MKM/pgpQC9QZfn2MdBdGA2tEpj4\"",
    "mtime": "2026-06-16T15:08:45.427Z",
    "size": 879,
    "path": "../public/_nuxt/builds/meta/7bd93c10-de99-4faa-91f1-c4d089f8e4c6.json"
  },
  "/__og-image__/static/contributing/development/og.png": {
    "type": "image/png",
    "etag": "\"f91a-oG9K9xGbx6FrgBZ2C8Jx57kr7sc\"",
    "mtime": "2026-06-16T15:08:45.090Z",
    "size": 63770,
    "path": "../public/__og-image__/static/contributing/development/og.png"
  },
  "/__og-image__/static/contributing/examples/og.png": {
    "type": "image/png",
    "etag": "\"defd-TRxqLdS7CcWfrvyp6gvV06+4vSk\"",
    "mtime": "2026-06-16T15:08:45.090Z",
    "size": 57085,
    "path": "../public/__og-image__/static/contributing/examples/og.png"
  },
  "/__og-image__/static/contributing/releases/og.png": {
    "type": "image/png",
    "etag": "\"e71c-eux/GKJehK3UESVKL2oXJ1nrlHE\"",
    "mtime": "2026-06-16T15:08:45.392Z",
    "size": 59164,
    "path": "../public/__og-image__/static/contributing/releases/og.png"
  },
  "/__og-image__/static/examples/examples/og.png": {
    "type": "image/png",
    "etag": "\"e237-1qFJCBWULFwJxPjZKHN05rIH2FY\"",
    "mtime": "2026-06-16T15:08:45.393Z",
    "size": 57911,
    "path": "../public/__og-image__/static/examples/examples/og.png"
  },
  "/__og-image__/static/getting-started/backends/og.png": {
    "type": "image/png",
    "etag": "\"d837-oCjP2U3pFgnV3gl/tArHCSl5Ifw\"",
    "mtime": "2026-06-16T15:08:44.100Z",
    "size": 55351,
    "path": "../public/__og-image__/static/getting-started/backends/og.png"
  },
  "/__og-image__/static/getting-started/first-run/og.png": {
    "type": "image/png",
    "etag": "\"d941-Bxz1WOeSmTY5OOliZb1UtDDrXhY\"",
    "mtime": "2026-06-16T15:08:43.991Z",
    "size": 55617,
    "path": "../public/__og-image__/static/getting-started/first-run/og.png"
  },
  "/__og-image__/static/getting-started/installation/og.png": {
    "type": "image/png",
    "etag": "\"df15-pbhInxMuzTghoCDWyJVazY+R5m4\"",
    "mtime": "2026-06-16T15:08:43.991Z",
    "size": 57109,
    "path": "../public/__og-image__/static/getting-started/installation/og.png"
  },
  "/__og-image__/static/getting-started/introduction/og.png": {
    "type": "image/png",
    "etag": "\"fc61-o+MalunYBQvIQSfK7nJNaV0Yjdk\"",
    "mtime": "2026-06-16T15:08:43.952Z",
    "size": 64609,
    "path": "../public/__og-image__/static/getting-started/introduction/og.png"
  },
  "/__og-image__/static/getting-started/models/og.png": {
    "type": "image/png",
    "etag": "\"d985-vF61H/+ixplehKcy5TWWlCPq4XI\"",
    "mtime": "2026-06-16T15:08:44.108Z",
    "size": 55685,
    "path": "../public/__og-image__/static/getting-started/models/og.png"
  },
  "/__og-image__/static/guides/performance/og.png": {
    "type": "image/png",
    "etag": "\"101c1-f1P9c2rLDi4PRPLcvdFP+8zd7WI\"",
    "mtime": "2026-06-16T15:08:43.986Z",
    "size": 65985,
    "path": "../public/__og-image__/static/guides/performance/og.png"
  },
  "/__og-image__/static/guides/mobile/og.png": {
    "type": "image/png",
    "etag": "\"f236-lgZdsiLpaLbtQmPPhDjGo5IxeBQ\"",
    "mtime": "2026-06-16T15:08:45.056Z",
    "size": 62006,
    "path": "../public/__og-image__/static/guides/mobile/og.png"
  },
  "/__og-image__/static/guides/troubleshooting-models/og.png": {
    "type": "image/png",
    "etag": "\"1158e-J2hUY/pI8YxEEpEnJsAypTr/5Cg\"",
    "mtime": "2026-06-16T15:08:45.087Z",
    "size": 71054,
    "path": "../public/__og-image__/static/guides/troubleshooting-models/og.png"
  },
  "/__og-image__/static/reference/cargo-features/og.png": {
    "type": "image/png",
    "etag": "\"e839-72VTUOALhn9hTYDEwU4nQbNDV8w\"",
    "mtime": "2026-06-16T15:08:45.087Z",
    "size": 59449,
    "path": "../public/__og-image__/static/reference/cargo-features/og.png"
  },
  "/__og-image__/static/reference/crates/og.png": {
    "type": "image/png",
    "etag": "\"f1ff-7dvbQyqBMxPNghug7aRhHM9N2MI\"",
    "mtime": "2026-06-16T15:08:45.085Z",
    "size": 61951,
    "path": "../public/__og-image__/static/reference/crates/og.png"
  },
  "/__og-image__/static/reference/versioning/og.png": {
    "type": "image/png",
    "etag": "\"e0c0-jFtjm8kJ0uCBpgDCEMuX2rlWhLQ\"",
    "mtime": "2026-06-16T15:08:45.075Z",
    "size": 57536,
    "path": "../public/__og-image__/static/reference/versioning/og.png"
  },
  "/__og-image__/static/rust/chat/og.png": {
    "type": "image/png",
    "etag": "\"d602-dxDFg8Wi1yhRn5FSGWf/3PNSTqg\"",
    "mtime": "2026-06-16T15:08:44.069Z",
    "size": 54786,
    "path": "../public/__og-image__/static/rust/chat/og.png"
  },
  "/__og-image__/static/rust/completion/og.png": {
    "type": "image/png",
    "etag": "\"f110-mjCMJ0zvurU1ElooYzp9K1a3O/8\"",
    "mtime": "2026-06-16T15:08:44.062Z",
    "size": 61712,
    "path": "../public/__og-image__/static/rust/completion/og.png"
  },
  "/__og-image__/static/rust/embeddings/og.png": {
    "type": "image/png",
    "etag": "\"e7cf-SHkAncl5UvG92vewNNAcRS9OiZo\"",
    "mtime": "2026-06-16T15:08:44.108Z",
    "size": 59343,
    "path": "../public/__og-image__/static/rust/embeddings/og.png"
  },
  "/__og-image__/static/rust/lifecycle/og.png": {
    "type": "image/png",
    "etag": "\"e5fe-qke+fuCbLccd1uyParLEYV804AI\"",
    "mtime": "2026-06-16T15:08:43.928Z",
    "size": 58878,
    "path": "../public/__og-image__/static/rust/lifecycle/og.png"
  },
  "/__og-image__/static/rust/multimodal/og.png": {
    "type": "image/png",
    "etag": "\"e394-oS+OqoRC56HRaEl6YBBRp9ivhUU\"",
    "mtime": "2026-06-16T15:08:44.108Z",
    "size": 58260,
    "path": "../public/__og-image__/static/rust/multimodal/og.png"
  },
  "/__og-image__/static/rust/structured-output/og.png": {
    "type": "image/png",
    "etag": "\"f38a-KVhKzkEKfsIYp/EEfyYucjfL7qM\"",
    "mtime": "2026-06-16T15:08:44.162Z",
    "size": 62346,
    "path": "../public/__og-image__/static/rust/structured-output/og.png"
  },
  "/__og-image__/static/rust/workspace/og.png": {
    "type": "image/png",
    "etag": "\"e12b-dJd3vaEI1J31zktUtv2CBaR4izs\"",
    "mtime": "2026-06-16T15:08:44.062Z",
    "size": 57643,
    "path": "../public/__og-image__/static/rust/workspace/og.png"
  },
  "/__og-image__/static/server/openai-api/og.png": {
    "type": "image/png",
    "etag": "\"10653-TR4NkZJggoiNsaM45mwO2UB8nEk\"",
    "mtime": "2026-06-16T15:08:44.181Z",
    "size": 67155,
    "path": "../public/__og-image__/static/server/openai-api/og.png"
  },
  "/__og-image__/static/server/operations/og.png": {
    "type": "image/png",
    "etag": "\"e739-vZiZu4yeDwMYCIYymW+hpmxOndA\"",
    "mtime": "2026-06-16T15:08:44.211Z",
    "size": 59193,
    "path": "../public/__og-image__/static/server/operations/og.png"
  },
  "/__og-image__/static/server/running/og.png": {
    "type": "image/png",
    "etag": "\"df21-7ik5MnQreqddUF6X3UwOpoJ/krE\"",
    "mtime": "2026-06-16T15:08:43.999Z",
    "size": 57121,
    "path": "../public/__og-image__/static/server/running/og.png"
  },
  "/__og-image__/static/server/streaming/og.png": {
    "type": "image/png",
    "etag": "\"d5e5-fRlGo7vowcji5w03kVuaw4svc+s\"",
    "mtime": "2026-06-16T15:08:44.211Z",
    "size": 54757,
    "path": "../public/__og-image__/static/server/streaming/og.png"
  },
  "/__og-image__/static/tauri/permissions/og.png": {
    "type": "image/png",
    "etag": "\"dfc8-flMBXmBdTH30Ih3NVkQJoW85oPs\"",
    "mtime": "2026-06-16T15:08:44.215Z",
    "size": 57288,
    "path": "../public/__og-image__/static/tauri/permissions/og.png"
  },
  "/__og-image__/static/tauri/plugin/og.png": {
    "type": "image/png",
    "etag": "\"ca2d-/KN9uFZlMA5BV435ImcvrNC0Ahc\"",
    "mtime": "2026-06-16T15:08:43.989Z",
    "size": 51757,
    "path": "../public/__og-image__/static/tauri/plugin/og.png"
  },
  "/__og-image__/static/tauri/typescript-client/og.png": {
    "type": "image/png",
    "etag": "\"ef30-EvVHSeTENXQjRyA9ir7+5na+Sog\"",
    "mtime": "2026-06-16T15:08:44.215Z",
    "size": 61232,
    "path": "../public/__og-image__/static/tauri/typescript-client/og.png"
  },
  "/__og-image__/static/tauri/update_notes/og.png": {
    "type": "image/png",
    "etag": "\"cbd7-LacLymT8fNkSOecJCHKJgxqbsr4\"",
    "mtime": "2026-06-16T15:08:45.087Z",
    "size": 52183,
    "path": "../public/__og-image__/static/tauri/update_notes/og.png"
  },
  "/__og-image__/static/typescript/packages/og.png": {
    "type": "image/png",
    "etag": "\"dc46-JjwXNmOtctRhIUzZD3MmnlHdjJs\"",
    "mtime": "2026-06-16T15:08:44.069Z",
    "size": 56390,
    "path": "../public/__og-image__/static/typescript/packages/og.png"
  },
  "/__og-image__/static/typescript/client-contracts/og.png": {
    "type": "image/png",
    "etag": "\"ed11-DE5I2XqGnWA1X4g01RqZmub7s1g\"",
    "mtime": "2026-06-16T15:08:44.755Z",
    "size": 60689,
    "path": "../public/__og-image__/static/typescript/client-contracts/og.png"
  },
  "/__og-image__/static/typescript/update_notes/og.png": {
    "type": "image/png",
    "etag": "\"dff1-ECKXFEuTIxWgN7ZsYH+qQgFtnQE\"",
    "mtime": "2026-06-16T15:08:45.090Z",
    "size": 57329,
    "path": "../public/__og-image__/static/typescript/update_notes/og.png"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _YxaNxH = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _ClPXAn = eventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const llmsConfig = config.llms;
  const slug = getRouterParams(event)["slug.md"];
  if (!slug?.endsWith(".md") || llmsConfig?.contentRawMarkdown === false) {
    throw createError$1({ statusCode: 404, statusMessage: "Page not found", fatal: true });
  }
  let path = withLeadingSlash(slug.replace(".md", ""));
  if (path.endsWith("/index")) {
    path = path.substring(0, path.length - 6);
  }
  const excludeCollections = llmsConfig?.contentRawMarkdown?.excludeCollections || [];
  const _collections = Object.entries(contentManifest).filter(([_key, value]) => value.type === "page" && !excludeCollections.includes(_key)).map(([key]) => key);
  let page = null;
  for (const collection of _collections) {
    page = await queryCollection$1(event, collection).path(path).first();
    if (page) {
      break;
    }
  }
  if (!page) {
    throw createError$1({ statusCode: 404, statusMessage: "Page not found", fatal: true });
  }
  if (page.body.value[0]?.[0] !== "h1") {
    page.body.value.unshift(["blockquote", {}, page.description]);
    page.body.value.unshift(["h1", {}, page.title]);
  }
  const links = page.links || page.meta?.links;
  if (Array.isArray(links) && links.length > 0) {
    const linkItems = links.filter((link) => link.label && link.to).map((link) => ["li", {}, ["a", { href: link.to }, link.label]]);
    if (linkItems.length > 0) {
      page.body.value.push(["hr"]);
      page.body.value.push(["ul", {}, ...linkItems]);
    }
  }
  setHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  return stringify$1({ ...page.body, type: "minimark" }, { format: "markdown/html" });
});

const _aWVlbX = eventHandler(async (e) => {
  if (e.context._initedSiteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = e.context.siteConfig || createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = getNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: 0,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    ...envSiteConfig(globalThis._importMeta_.env || {})
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  if (config.multiTenancy) {
    const host = parseURL(nitroOrigin).host?.replace(/:\d+$/, "") || "";
    const tenant = config.multiTenancy?.find((t) => t.hosts.includes(host));
    if (tenant) {
      siteConfig.push({
        _context: `multi-tenancy:${host}`,
        _priority: 0,
        ...tenant.config
      });
    }
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
  e.context._initedSiteConfig = true;
});

const _il2C9e = defineEventHandler(async (e) => {
  const nitroApp = useNitroApp();
  const { indexable} = getSiteRobotConfig(e);
  const { credits, isNuxtContentV2, cacheControl } = useRuntimeConfigNuxtRobots(e);
  let robotsTxtCtx = {
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true}) : s)
    )];
    if (isNuxtContentV2) {
      const contentWithRobotRules = await e.$fetch("/__robots__/nuxt-content.json", {
        headers: {
          Accept: "application/json"
        }
      });
      if (String(contentWithRobotRules).trim().startsWith("<!DOCTYPE")) {
        logger$1.error("Invalid HTML returned from /__robots__/nuxt-content.json, skipping.");
      } else {
        for (const group of robotsTxtCtx.groups) {
          if (group.userAgent.includes("*")) {
            group.disallow.push(...contentWithRobotRules);
            group.disallow = group.disallow.filter(Boolean);
          }
        }
      }
    }
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (credits) {
    robotsTxt = [
      `# START nuxt-robots (${indexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  setHeader(e, "Content-Type", "text/plain; charset=utf-8");
  setHeader(e, "Cache-Control", globalThis._importMeta_.test || !cacheControl ? "no-store" : cacheControl);
  const hookCtx = { robotsTxt, e };
  await nitroApp.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

const _shdLcD = defineEventHandler(async (e) => {
  if (e.path === "/robots.txt" || e.path.startsWith("/__") || e.path.startsWith("/api") || e.path.startsWith("/_nuxt"))
    return;
  const nuxtRobotsConfig = useRuntimeConfigNuxtRobots(e);
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    const robotConfig = getPathRobotConfig(e, { skipSiteIndexable: Boolean(getQuery(e)?.mockProductionEnv) });
    if (header) {
      setHeader(e, "X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
  }
});

const mcpConfig = {"route":"/mcp","browserRedirect":"/","name":"","version":"1.0.0"};

function inferSiteURL() {
  const url = process.env.NUXT_PUBLIC_SITE_URL || process.env.NUXT_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL || process.env.URL || process.env.CI_PAGES_URL || process.env.CF_PAGES_URL;
  return url ? withHttps(url) : void 0;
}

const get_page = defineMcpTool({
  description: `Retrieves the full content and details of a specific documentation page.

WHEN TO USE: Use this tool when you know the EXACT path to a documentation page. Common use cases:
- User asks for a specific page: "Show me the getting started guide" \u2192 /en/getting-started/installation
- User asks about a known topic with a dedicated page
- You found a relevant path from list-pages and want the full content
- User references a specific section or guide they want to read

WHEN NOT TO USE: If you don't know the exact path and need to search/explore, use list-pages first.

WORKFLOW: This tool returns the complete page content including title, description, and full markdown. Use this when you need to provide detailed answers or code examples from specific documentation pages.
`,
  inputSchema: {
    path: z.string().describe("The page path from list-pages or provided by the user (e.g., /en/getting-started/installation)")
  },
  cache: "1h",
  handler: async ({ path }) => {
    var _a;
    const event = useEvent();
    const config = useRuntimeConfig(event).public;
    const siteUrl = getRequestURL(event).origin || inferSiteURL();
    const availableLocales = getAvailableLocales(config);
    const collectionName = ((_a = config.i18n) == null ? void 0 : _a.locales) ? getCollectionFromPath(path, availableLocales) : "docs";
    try {
      const page = await queryCollection$1(event, collectionName).where("path", "=", path).select("title", "path", "description").first();
      if (!page) {
        return errorResult("Page not found");
      }
      const content = await event.$fetch(`/raw${path}.md`);
      return jsonResult({
        title: page.title,
        path: page.path,
        description: page.description,
        content,
        url: `${siteUrl}${page.path}`
      });
    } catch {
      return errorResult("Failed to get page");
    }
  }
});

const list_pages = defineMcpTool({
  description: `Lists all available documentation pages with their categories and basic information.

WHEN TO USE: Use this tool when you need to EXPLORE or SEARCH for documentation about a topic but don't know the exact page path. Common scenarios:
- "Find documentation about markdown features" - explore available guides
- "Show me all getting started guides" - browse introductory content
- "Search for advanced configuration options" - find specific topics
- User asks general questions without specifying exact pages
- You need to understand the overall documentation structure

WHEN NOT TO USE: If you already know the specific page path (e.g., "/en/getting-started/installation"), use get-page directly instead.

WORKFLOW: This tool returns page titles, descriptions, and paths. After finding relevant pages, use get-page to retrieve the full content of specific pages that match the user's needs.

OUTPUT: Returns a structured list with:
- title: Human-readable page name
- path: Exact path for use with get-page
- description: Brief summary of page content
- url: Full URL for reference`,
  inputSchema: {
    locale: z.string().optional().describe("The locale to filter pages by")
  },
  cache: "1h",
  handler: async ({ locale }) => {
    const event = useEvent();
    const config = useRuntimeConfig(event).public;
    const siteUrl = getRequestURL(event).origin || inferSiteURL();
    const availableLocales = getAvailableLocales(config);
    const collections = getCollectionsToQuery(locale, availableLocales);
    try {
      const allPages = await Promise.all(
        collections.map(async (collectionName) => {
          const pages = await queryCollection$1(event, collectionName).select("title", "path", "description").all();
          return pages.map((page) => ({
            title: page.title,
            path: page.path,
            description: page.description,
            locale: collectionName.replace("docs_", ""),
            url: `${siteUrl}${page.path}`
          }));
        })
      );
      return jsonResult(allPages.flat());
    } catch {
      return errorResult("Failed to list pages");
    }
  }
});

const tools = [
  (function() {
  const def = get_page;
  return {
    ...def,
    _meta: {
      ...def._meta,
      filename: "get-page.ts"
    }
  }
})(),
  (function() {
  const def = list_pages;
  return {
    ...def,
    _meta: {
      ...def._meta,
      filename: "list-pages.ts"
    }
  }
})()
];

const resources = [];

const prompts = [];

const handlers$1 = [];

const createMcpTransportHandler = (handler) => handler;

const handleMcpRequest = createMcpTransportHandler(async (server, event) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: void 0 });
  event.node.res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  const body = await readBody(event);
  await transport.handleRequest(event.node.req, event.node.res, body);
});

function resolveConfig(config, event) {
  return typeof config === "function" ? config(event) : config;
}
function createMcpServer(config) {
  const server = new McpServer({
    name: config.name,
    version: config.version
  });
  for (const tool of config.tools || []) {
    registerToolFromDefinition(server, tool);
  }
  for (const resource of config.resources || []) {
    registerResourceFromDefinition(server, resource);
  }
  for (const prompt of config.prompts || []) {
    registerPromptFromDefinition(server, prompt);
  }
  return server;
}
function createMcpHandler(config) {
  return defineEventHandler(async (event) => {
    const resolvedConfig = resolveConfig(config, event);
    if (getHeader(event, "accept")?.includes("text/html")) {
      return sendRedirect(event, resolvedConfig.browserRedirect);
    }
    const handler = async () => {
      const server = createMcpServer(resolvedConfig);
      return handleMcpRequest(server, event);
    };
    if (resolvedConfig.middleware) {
      let nextCalled = false;
      let handlerResult;
      const next = async () => {
        nextCalled = true;
        handlerResult = await handler();
        return handlerResult;
      };
      const middlewareResult = await resolvedConfig.middleware(event, next);
      if (middlewareResult !== void 0) {
        return middlewareResult;
      }
      if (nextCalled) {
        return handlerResult;
      }
      return handler();
    }
    return handler();
  });
}

const _7tMXoa = createMcpHandler((event) => {
  const handlerName = getRouterParam(event, "handler");
  if (handlerName) {
    const handlerDef = handlers$1.find(
      (h) => h.name === handlerName
    );
    if (!handlerDef) {
      throw new Error(`Handler "${handlerName}" not found`);
    }
    return {
      name: handlerDef.name ?? handlerName,
      version: handlerDef.version ?? mcpConfig.version,
      browserRedirect: handlerDef.browserRedirect ?? mcpConfig.browserRedirect,
      tools: handlerDef.tools,
      resources: handlerDef.resources,
      prompts: handlerDef.prompts,
      middleware: handlerDef.middleware
    };
  }
  return {
    name: "MCP Server",
    version: mcpConfig.version,
    browserRedirect: mcpConfig.browserRedirect,
    tools,
    resources,
    prompts
  };
});

const IDE_CONFIGS = {
  cursor: {
    name: "Cursor",
    generateDeeplink: (serverName, mcpUrl) => {
      const config = { type: "http", url: mcpUrl };
      const configBase64 = Buffer.from(JSON.stringify(config)).toString("base64");
      return `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(serverName)}&config=${encodeURIComponent(configBase64)}`;
    }
  },
  vscode: {
    name: "VS Code",
    generateDeeplink: (serverName, mcpUrl) => {
      const config = { name: serverName, type: "http", url: mcpUrl };
      return `vscode:mcp/install?${encodeURIComponent(JSON.stringify(config))}`;
    }
  }
};
function escapeHtmlAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeJs(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}
const _oLwha4 = defineEventHandler((event) => {
  const requestUrl = getRequestURL(event);
  const query = getQuery(event);
  const ide = query.ide || "cursor";
  const ideConfig = IDE_CONFIGS[ide];
  if (!ideConfig) {
    setHeader(event, "Location", "/");
    return new Response(null, { status: 302 });
  }
  const serverName = query.name || mcpConfig.name || "mcp-server";
  const mcpUrl = `${requestUrl.origin}${mcpConfig.route}`;
  const deeplink = ideConfig.generateDeeplink(serverName, mcpUrl);
  const htmlDeeplink = escapeHtmlAttr(deeplink);
  const jsDeeplink = escapeJs(deeplink);
  setHeader(event, "Content-Type", "text/html; charset=utf-8");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Opening ${ideConfig.name}...</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0a0a0a; color: #fff; }
    .container { text-align: center; padding: 2rem; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
  <div class="container">
    <p>Opening ${ideConfig.name}...</p>
    <p>If nothing happens, <a href="${htmlDeeplink}">click here to install</a>.</p>
  </div>
  <script>window.location.href = "${jsDeeplink}";<\/script>
</body>
</html>`;
});

const IDE_CONFIG = {
  cursor: {
    defaultLabel: "Install MCP in Cursor"
  },
  vscode: {
    defaultLabel: "Install MCP in VS Code"
  }
};
function CursorIcon() {
  return {
    type: "svg",
    props: {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      style: { filter: "invert(1)" },
      children: [
        {
          type: "path",
          props: {
            fill: "#666",
            d: "M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
          }
        },
        {
          type: "path",
          props: {
            fill: "#888",
            d: "M22.35 18V6L11.925 0v12l10.425 6z"
          }
        },
        {
          type: "path",
          props: {
            fill: "#777",
            d: "M11.925 0L1.5 6v12l10.425-6V0z"
          }
        },
        {
          type: "path",
          props: {
            fill: "#555",
            d: "M22.35 6L11.925 24V12L22.35 6z"
          }
        },
        {
          type: "path",
          props: {
            fill: "#333",
            d: "M22.35 6l-10.425 6L1.5 6h20.85z"
          }
        }
      ]
    }
  };
}
function VSCodeIconSimple() {
  return {
    type: "svg",
    props: {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      children: [
        {
          type: "path",
          props: {
            fill: "#007ACC",
            d: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63l-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12L.326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128l9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
          }
        }
      ]
    }
  };
}
function getIcon(ide) {
  return ide === "vscode" ? VSCodeIconSimple() : CursorIcon();
}
async function generateBadgeSVG(options) {
  const { label, color, textColor, borderColor, showIcon, ide } = options;
  const icon = getIcon(ide);
  const element = {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 8px",
        fontSize: "14px",
        fontWeight: 500,
        color: `#${textColor}`,
        backgroundColor: `#${color}`,
        border: `1px solid #${borderColor}`
      },
      children: showIcon ? [icon, { type: "span", props: { children: label } }] : [{ type: "span", props: { children: label } }]
    }
  };
  const iconWidth = showIcon ? 26 : 0;
  const textWidth = label.length * 8;
  const padding = 20;
  const width = Math.max(Math.ceil(iconWidth + textWidth + padding), 140);
  const height = 32;
  const svg = await satori(element, {
    width,
    height,
    fonts: [
      {
        name: "Inter",
        data: await loadFont(),
        weight: 500,
        style: "normal"
      }
    ]
  });
  return svg;
}
async function loadFont() {
  const response = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff"
  );
  if (!response.ok) {
    throw new Error(`Failed to load font: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}
const _daIUBm = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const ide = query.ide || "cursor";
  const ideConfig = IDE_CONFIG[ide] || IDE_CONFIG.cursor;
  const options = {
    ide,
    label: query.label || ideConfig.defaultLabel,
    color: query.color || "171717",
    textColor: query.textColor || "ffffff",
    borderColor: query.borderColor || "404040",
    showIcon: query.icon !== "false"
  };
  try {
    const svg = await generateBadgeSVG(options);
    setHeader(event, "Content-Type", "image/svg+xml");
    setHeader(event, "Cache-Control", "public, max-age=86400");
    return svg;
  } catch {
    setHeader(event, "Content-Type", "image/svg+xml");
    setHeader(event, "Cache-Control", "no-cache");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="32">
      <rect width="140" height="32" fill="#171717" stroke="#404040"/>
      <text x="70" y="20" fill="#fff" font-size="12" text-anchor="middle">${options.label}</text>
    </svg>`;
  }
});

const _Y1W9xU = eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms;
  const llms = JSON.parse(JSON.stringify(options));
  await useNitroApp().hooks.callHook("llms:generate", event, llms);
  await llmsHooks.callHook("generate", event, llms);
  const document = [
    `# ${llms.title || "Documentation"}`
  ];
  if (llms.description) {
    document.push(`> ${llms.description}`);
  }
  for (const section of llms.sections) {
    document.push(`## ${section.title}`);
    if (section.description) {
      document.push(section.description);
    }
    document.push(
      section.links?.map((link) => {
        return link.description ? `- [${link.title}](${link.href}): ${link.description}` : `- [${link.title}](${link.href})`;
      }).join("\n") || ""
    );
  }
  if (options.notes && options.notes.length) {
    document.push(
      "## Notes",
      (options.notes || []).map((note) => `- ${note}`).join("\n")
    );
  }
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return document.join("\n\n");
});

const _mhHnn5 = eventHandler(async (event) => {
  const options = useRuntimeConfig(event).llms;
  const contents = [];
  const llms = JSON.parse(JSON.stringify(options));
  await useNitroApp().hooks.callHook("llms:generate:full", event, llms, contents);
  await llmsHooks.callHook("generate:full", event, llms, contents);
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return contents.join("\n\n");
});

const collections = {
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _IzJ_NJ = defineCachedEventHandler(async (event) => {
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName && Object.hasOwn(collections, collectionName) ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
  if (!collectionName) return createError$1({ status: 400, message: "No collection specified" });
  if (!icons.length) return createError$1({ status: 400, message: "No icons specified" });
  if (collection) {
    const data = getIcons(
      collection,
      icons
    );
    consola.debug(`[Icon] serving ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
    return data;
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL(`./${collectionName}.json?icons=${icons.join(",")}`, apiEndPoint);
    consola.debug(`[Icon] fetching ${icons.map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(parseQuery(parsePath(event.path).search).icons || "").split(",");
    return `${collection}_${icons[0]}_${icons.length}_${hash$1(icons.join(","))}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const __vKxNc = eventHandler(async (event) => {
  const collection = getRouterParam(event, "collection") || event.path?.split("/")?.[2] || "";
  setHeader(event, "Content-Type", "text/plain");
  const data = await useStorage().getItem(`build:content:database.compressed.mjs`) || "";
  if (data) {
    const lineStart = `export const ${collection} = "`;
    const content = String(data).split("\n").find((line) => line.startsWith(lineStart));
    if (content) {
      return content.substring(lineStart.length, content.length - 1);
    }
  }
  return await import('../build/database.compressed.mjs').then((m) => m[collection]);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function injectHead() {
  if (hasInjectionContext()) {
    const instance = inject(headSymbol);
    if (instance) {
      return instance;
    }
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead(input, options = {}) {
  const head = options.head || /* @__PURE__ */ injectHead();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}
function useSeoMeta(input = {}, options = {}) {
  const head = options.head || /* @__PURE__ */ injectHead();
  head.use(FlatMetaPlugin);
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    _flatMeta: meta
  }, options);
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

const createHeadCore = createUnhead;

const NUXT_PAYLOAD_INLINE = false;
const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt","class":"isolate"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => import('../build/server.mjs').then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getPrecomputedDependencies = () => import('../build/client.precomputed.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = await getPrecomputedDependencies();
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: undefined,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = await getPrecomputedDependencies();
	// @ts-expect-error virtual file
	const spaTemplate = await import('../virtual/_virtual_spa-template.mjs').then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: undefined,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => import('../build/styles.mjs').then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;
async function getIslandContext(event) {
	let url = event.path || "";
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError$1({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError$1({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const context = event.method === "GET" ? getQuery(event) : await readBody(event);
	
	return {
		url: typeof context?.url === "string" ? context.url : "/",
		id: hashId,
		name: componentName,
		props: destr(context.props) || {},
		slots: {},
		components: {}
	};
}

async function decompressSQLDump(base64Str, compressionType = "gzip") {
  let binaryData;
  if (typeof Buffer !== "undefined") {
    const buffer = Buffer.from(base64Str, "base64");
    binaryData = Uint8Array.from(buffer);
  } else if (typeof atob !== "undefined") {
    binaryData = Uint8Array.from(atob(base64Str), (c) => c.charCodeAt(0));
  } else {
    throw new TypeError("No base64 decoding method available");
  }
  const response = new Response(new Blob([binaryData]));
  const decompressedStream = response.body?.pipeThrough(new DecompressionStream(compressionType));
  const text = await new Response(decompressedStream).text();
  return JSON.parse(text);
}

function refineContentFields(sql, doc) {
  const fields = findCollectionFields(sql);
  const item = { ...doc };
  for (const key in item) {
    if (fields[key] === "json" && item[key] && item[key] !== "undefined") {
      item[key] = JSON.parse(item[key]);
    }
    if (fields[key] === "boolean" && item[key] !== "undefined") {
      item[key] = Boolean(item[key]);
    }
  }
  for (const key in item) {
    if (item[key] === "NULL") {
      item[key] = void 0;
    }
  }
  return item;
}
function findCollectionFields(sql) {
  const table = sql.match(/FROM\s+(\w+)/);
  if (!table) {
    return {};
  }
  const info = contentManifest[getCollectionName(table[1])];
  return info?.fields || {};
}
function getCollectionName(table) {
  return table.replace(/^_content_/, "");
}

class BoundableStatement {
	_statement;
	constructor(rawStmt) {
		this._statement = rawStmt;
	}
	bind(...params) {
		return new BoundStatement(this, params);
	}
}
class BoundStatement {
	#statement;
	#params;
	constructor(statement, params) {
		this.#statement = statement;
		this.#params = params;
	}
	bind(...params) {
		return new BoundStatement(this.#statement, params);
	}
	all() {
		return this.#statement.all(...this.#params);
	}
	run() {
		return this.#statement.run(...this.#params);
	}
	get() {
		return this.#statement.get(...this.#params);
	}
}

function nodeSqlite3Connector(opts) {
	let _db;
	const getDB = () => {
		if (_db) {
			return _db;
		}
		const nodeSqlite = globalThis.process?.getBuiltinModule?.("node:sqlite");
		if (!nodeSqlite) {
			throw new Error("`node:sqlite` module is not available. Please ensure you are running in Node.js >= 22.5 or Deno >= 2.2.");
		}
		if (opts.name === ":memory:") {
			_db = new nodeSqlite.DatabaseSync(":memory:");
			return _db;
		}
		const filePath = resolve$1(opts.cwd || ".", opts.path || `.data/${opts.name || "db"}.sqlite`);
		mkdirSync(dirname$1(filePath), { recursive: true });
		_db = new nodeSqlite.DatabaseSync(filePath);
		return _db;
	};
	return {
		name: "node-sqlite",
		dialect: "sqlite",
		getInstance: () => getDB(),
		exec(sql) {
			getDB().exec(sql);
			return { success: true };
		},
		prepare: (sql) => new StatementWrapper(() => getDB().prepare(sql)),
		dispose: () => {
			_db?.close?.();
			_db = undefined;
		}
	};
}
class StatementWrapper extends BoundableStatement {
	async all(...params) {
		const raws = this._statement().all(...params);
		return raws;
	}
	async run(...params) {
		const res = this._statement().run(...params);
		return {
			success: true,
			...res
		};
	}
	async get(...params) {
		const raw = this._statement().get(...params);
		return raw;
	}
}

const originalEmit = process.emit;
process.emit = function(...args) {
  const name = args[0];
  const data = args[1];
  if (name === `warning` && typeof data === `object` && data.name === `ExperimentalWarning` && data.message.includes(`SQLite is an experimental feature`)) {
    return false;
  }
  return originalEmit.apply(process, args);
};

let db;
function loadDatabaseAdapter(config) {
  const { database, localDatabase } = config;
  if (!db) {
    if (["nitro-prerender", "nitro-dev"].includes("node-server")) {
      db = nodeSqlite3Connector(refineDatabaseConfig(localDatabase));
    } else {
      db = nodeSqlite3Connector(refineDatabaseConfig(database));
    }
  }
  return {
    all: async (sql, params = []) => {
      return db.prepare(sql).all(...params).then((result) => (result || []).map((item) => refineContentFields(sql, item)));
    },
    first: async (sql, params = []) => {
      return db.prepare(sql).get(...params).then((item) => item ? refineContentFields(sql, item) : item);
    },
    exec: async (sql, params = []) => {
      return db.prepare(sql).run(...params);
    }
  };
}
const checkDatabaseIntegrity = /* @__PURE__ */ new Map();
const integrityCheckPromise = /* @__PURE__ */ new Map();
async function checkAndImportDatabaseIntegrity(event, collection, config) {
  if (checkDatabaseIntegrity.get(collection) !== false) {
    checkDatabaseIntegrity.set(collection, false);
    if (!integrityCheckPromise.has(collection)) {
      const _integrityCheck = _checkAndImportDatabaseIntegrity(event, collection, checksums[collection], checksumsStructure[collection], config).then((isValid) => {
        checkDatabaseIntegrity.set(collection, !isValid);
      }).catch((error) => {
        console.error("Database integrity check failed", error);
        checkDatabaseIntegrity.set(collection, true);
        integrityCheckPromise.delete(collection);
      });
      integrityCheckPromise.set(collection, _integrityCheck);
    }
  }
  if (integrityCheckPromise.has(collection)) {
    await integrityCheckPromise.get(collection);
  }
}
async function _checkAndImportDatabaseIntegrity(event, collection, integrityVersion, structureIntegrityVersion, config) {
  const db2 = loadDatabaseAdapter(config);
  const before = await db2.first(`SELECT * FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => null);
  if (before?.version && !String(before.version)?.startsWith(`${config.databaseVersion}--`)) {
    await db2.exec(`DROP TABLE IF EXISTS ${tables.info}`);
    before.version = "";
  }
  const unchangedStructure = before?.structureVersion === structureIntegrityVersion;
  if (before?.version) {
    if (before.version === integrityVersion) {
      if (before.ready) {
        return true;
      }
      await waitUntilDatabaseIsReady(db2, collection);
      return true;
    }
    await db2.exec(`DELETE FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]);
    if (!unchangedStructure) {
      await db2.exec(`DROP TABLE IF EXISTS ${tables[collection]}`);
    }
  }
  const dump = await loadDatabaseDump(event, collection).then(decompressSQLDump);
  const dumpLinesHash = dump.map((row) => row.split(" -- ").pop());
  let hashesInDb = /* @__PURE__ */ new Set();
  if (unchangedStructure) {
    const hashListFromTheDump = new Set(dumpLinesHash);
    const hashesInDbRecords = await db2.all(`SELECT __hash__ FROM ${tables[collection]}`).catch(() => []);
    hashesInDb = new Set(hashesInDbRecords.map((r) => r.__hash__));
    const hashesToDelete = hashesInDb.difference(hashListFromTheDump);
    if (hashesToDelete.size) {
      await db2.exec(`DELETE FROM ${tables[collection]} WHERE __hash__ IN (${Array(hashesToDelete.size).fill("?").join(",")})`, Array.from(hashesToDelete));
    }
  }
  await dump.reduce(async (prev, sql, index) => {
    await prev;
    const hash = dumpLinesHash[index];
    const statement = sql.substring(0, sql.length - hash.length - 4);
    if (unchangedStructure) {
      if (hash === "structure") {
        return Promise.resolve();
      }
      if (hashesInDb.has(hash)) {
        return Promise.resolve();
      }
    }
    await db2.exec(statement).catch((err) => {
      const message = err.message || "Unknown error";
      console.error(`Failed to execute SQL ${sql}: ${message}`);
    });
  }, Promise.resolve());
  const after = await db2.first(`SELECT version FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => ({ version: "" }));
  return after?.version === integrityVersion;
}
const REQUEST_TIMEOUT = 90;
async function waitUntilDatabaseIsReady(db2, collection) {
  let iterationCount = 0;
  let interval;
  await new Promise((resolve, reject) => {
    interval = setInterval(async () => {
      const row = await db2.first(`SELECT ready FROM ${tables.info} WHERE id = ?`, [`checksum_${collection}`]).catch(() => ({ ready: true }));
      if (row?.ready) {
        clearInterval(interval);
        resolve(0);
      }
      if (iterationCount++ > REQUEST_TIMEOUT) {
        clearInterval(interval);
        reject(new Error("Waiting for another database initialization timed out"));
      }
    }, 1e3);
  }).catch((e) => {
    throw e;
  }).finally(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
}
async function loadDatabaseDump(event, collection) {
  return await fetchDatabase(event, collection).catch((e) => {
    console.error("Failed to fetch compressed dump", e);
    return "";
  });
}
function refineDatabaseConfig(config) {
  if (config.type === "d1") {
    return { ...config, bindingName: config.bindingName || config.binding };
  }
  if (config.type === "sqlite") {
    const _config = { ...config };
    if (config.filename === ":memory:") {
      return { name: ":memory:" };
    }
    if ("filename" in config) {
      const filename = isAbsolute(config?.filename || "") || config?.filename === ":memory:" ? config?.filename : new URL(config.filename, globalThis._importMeta_.url).pathname;
      _config.path = process.platform === "win32" && filename.startsWith("/") ? filename.slice(1) : filename;
    }
    return _config;
  }
  if (config.type === "pglite") {
    return {
      dataDir: config.dataDir,
      // Pass through any other PGlite-specific options
      ...config
    };
  }
  return config;
}

const SQL_COMMANDS = /SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|\$/i;
const SQL_COUNT_REGEX = /^COUNT\((DISTINCT )?([a-z_]\w+|\*)\) as count$/i;
const SQL_SELECT_REGEX = /^SELECT (.*) FROM (\w+)( WHERE .*)? ORDER BY (["\w,\s]+) (ASC|DESC)( LIMIT \d+)?( OFFSET \d+)?$/;
function assertSafeQuery(sql, collection) {
  if (!sql) {
    throw new Error("Invalid query: Query cannot be empty");
  }
  const cleanedupQuery = cleanupQuery(sql);
  if (cleanedupQuery !== sql) {
    throw new Error("Invalid query: SQL comments are not allowed");
  }
  const match = sql.match(SQL_SELECT_REGEX);
  if (!match) {
    throw new Error("Invalid query: Query must be a valid SELECT statement with proper syntax");
  }
  const [_, select, from, where, orderBy, order, limit, offset] = match;
  const columns = select?.trim().split(", ") || [];
  if (columns.length === 1) {
    if (columns[0] !== "*" && !columns[0]?.match(SQL_COUNT_REGEX) && !columns[0]?.match(/^"[a-z_]\w+"$/i)) {
      throw new Error(`Invalid query: Column '${columns[0]}' has invalid format. Expected *, COUNT(), or a quoted column name`);
    }
  } else if (!columns.every((column) => column.match(/^"[a-z_]\w+"$/i))) {
    throw new Error("Invalid query: Multiple columns must be properly quoted and alphanumeric");
  }
  if (from !== `_content_${collection}`) {
    const collection2 = String(from || "").replace(/^_content_/, "");
    throw new Error(`Invalid query: Collection '${collection2}' does not exist`);
  }
  if (where) {
    if (!where.startsWith(" WHERE (") || !where.endsWith(")")) {
      throw new Error("Invalid query: WHERE clause must be properly enclosed in parentheses");
    }
    const noString = cleanupQuery(where, { removeString: true });
    if (noString.match(SQL_COMMANDS)) {
      throw new Error("Invalid query: WHERE clause contains unsafe SQL commands");
    }
  }
  const _order = (orderBy + " " + order).split(", ");
  if (!_order.every((column) => column.match(/^("[a-zA-Z_]+"|[a-zA-Z_]+) (ASC|DESC)$/))) {
    throw new Error("Invalid query: ORDER BY clause must contain valid column names followed by ASC or DESC");
  }
  if (limit !== void 0 && !limit.match(/^ LIMIT \d+$/)) {
    throw new Error("Invalid query: LIMIT clause must be a positive number");
  }
  if (offset !== void 0 && !offset.match(/^ OFFSET \d+$/)) {
    throw new Error("Invalid query: OFFSET clause must be a positive number");
  }
  return true;
}
function cleanupQuery(query, options = { removeString: false }) {
  let inString = false;
  let stringFence = "";
  let result = "";
  for (let i = 0; i < query.length; i++) {
    const char = query[i];
    const prevChar = query[i - 1];
    const nextChar = query[i + 1];
    if (char === "'" || char === '"') {
      if (!options?.removeString) {
        result += char;
        continue;
      }
      if (inString) {
        if (char !== stringFence || nextChar === stringFence || prevChar === stringFence) {
          continue;
        }
        inString = false;
        stringFence = "";
        continue;
      } else {
        inString = true;
        stringFence = char;
        continue;
      }
    }
    if (!inString) {
      if (char === "-" && nextChar === "-") {
        return result;
      }
      if (char === "/" && nextChar === "*") {
        i += 2;
        while (i < query.length && !(query[i] === "*" && query[i + 1] === "/")) {
          i += 1;
        }
        i += 2;
        continue;
      }
      result += char;
    }
  }
  return result;
}

const _w08_3w = eventHandler(async (event) => {
  const { sql } = await readBody(event);
  const collection = getRouterParam(event, "collection") || event.path?.split("/")?.[2] || "";
  assertSafeQuery(sql, collection);
  const conf = useRuntimeConfig().content;
  if (conf.integrityCheck) {
    await checkAndImportDatabaseIntegrity(event, collection, conf);
  }
  return loadDatabaseAdapter(conf).all(sql);
});

const _I0AOfm = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_b5nR3p = () => import('../routes/sitemap.xml.mjs');
const _lazy_Z3QaPO = () => import('../routes/renderer.mjs');
const _lazy_da9a4i = () => import('../routes/__og-image__/font/font.mjs');
const _lazy_IgH3E8 = () => import('../routes/__og-image__/image/image.mjs');

const handlers = [
  { route: '', handler: _YxaNxH, lazy: false, middleware: true, method: undefined },
  { route: '/sitemap.xml', handler: _lazy_b5nR3p, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_Z3QaPO, lazy: true, middleware: false, method: undefined },
  { route: '/raw/**:slug.md', handler: _ClPXAn, lazy: false, middleware: false, method: "get" },
  { route: '', handler: _aWVlbX, lazy: false, middleware: true, method: undefined },
  { route: '/robots.txt', handler: _il2C9e, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _shdLcD, lazy: false, middleware: true, method: undefined },
  { route: '/mcp', handler: _7tMXoa, lazy: false, middleware: false, method: undefined },
  { route: '/mcp/deeplink', handler: _oLwha4, lazy: false, middleware: false, method: undefined },
  { route: '/mcp/badge.svg', handler: _daIUBm, lazy: false, middleware: false, method: undefined },
  { route: '/__og-image__/font/**', handler: _lazy_da9a4i, lazy: true, middleware: false, method: undefined },
  { route: '/__og-image__/image/**', handler: _lazy_IgH3E8, lazy: true, middleware: false, method: undefined },
  { route: '/__og-image__/static/**', handler: _lazy_IgH3E8, lazy: true, middleware: false, method: undefined },
  { route: '/llms.txt', handler: _Y1W9xU, lazy: false, middleware: false, method: "get" },
  { route: '/llms-full.txt', handler: _mhHnn5, lazy: false, middleware: false, method: "get" },
  { route: '/api/_nuxt_icon/:collection', handler: _IzJ_NJ, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/docs/sql_dump.txt', handler: __vKxNc, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/landing/sql_dump.txt', handler: __vKxNc, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/info/sql_dump.txt', handler: __vKxNc, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/docs/query', handler: _w08_3w, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/landing/query', handler: _w08_3w, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_content/info/query', handler: _w08_3w, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _I0AOfm, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_Z3QaPO, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks$1();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b$1(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C$1(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = new NullObject();
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { htmlDecodeQuotes as $, replaceIslandTeleports as A, useNitroApp as B, NUXT_PAYLOAD_INLINE as C, useOgImageRuntimeConfig as D, fetchIsland as E, createHeadCore as F, normaliseFontInput as G, theme as H, prefixStorage as I, withTrailingSlash as J, useStorage as K, handleCacheHeaders as L, setHeaders as M, NUXT_RUNTIME_PAYLOAD_EXTRACTION as N, setHeader as O, hash$1 as P, parseURL as Q, proxyRequest as R, sendRedirect as S, resolveContext as T, H3Error as U, hasProtocol as V, decodeHtml as W, logger as X, useNitroOrigin as Y, toBase64Image as Z, withBase as _, getCollectionsToQuery as a, defu as a0, sendError as a1, fontCache as a2, emojiCache as a3, serialize$1 as a4, withLeadingSlash as a5, useSeoMeta as a6, useHead as a7, withQuery as a8, klona as a9, kebabCase as aA, nodeServer as aB, isEqual as aa, headSymbol as ab, defuFn as ac, parseQuery as ad, getContext as ae, withoutTrailingSlash as af, encodePath as ag, decodePath as ah, isScriptProtocol as ai, sanitizeStatusCode as aj, $fetch$1 as ak, baseURL as al, resolveUnrefHeadInput as am, createHooks as an, getRequestHeaders as ao, pascalCase as ap, executeAsync as aq, encodeParam as ar, toRouteMatcher as as, createRouter$1 as at, withoutBase as au, parse as av, getRequestHeader as aw, setCookie as ax, getCookie as ay, deleteCookie as az, getResponseStatusText as b, getResponseStatus as c, defineEventHandler as d, appId as e, defineRenderHandler as f, getAvailableLocales as g, buildAssetsURL as h, inferSiteURL as i, appTeleportTag as j, appTeleportAttrs as k, getQuery as l, createError$1 as m, createSSRContext as n, appHead as o, publicAssetsURL as p, queryCollection$1 as q, destr as r, setResponseHeader as s, setSSRError as t, useRuntimeConfig as u, getRouteRules as v, joinURL as w, getRenderer as x, renderInlineStyles as y, relative as z };
//# sourceMappingURL=nitro.mjs.map
