import { d as defineEventHandler, u as useRuntimeConfig, i as inferSiteURL, g as getAvailableLocales, a as getCollectionsToQuery, q as queryCollection, s as setResponseHeader } from '../nitro/nitro.mjs';
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
import 'vue';
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
import 'vue/server-renderer';
import 'ipx';

const sitemap_xml = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = inferSiteURL() || "";
  const availableLocales = getAvailableLocales(config.public);
  const collections = getCollectionsToQuery(void 0, availableLocales);
  if (availableLocales.length > 0) {
    for (const locale of availableLocales) {
      collections.push(`landing_${locale}`);
    }
  } else {
    collections.push("landing");
  }
  const urls = [];
  for (const collection of collections) {
    try {
      const pages = await queryCollection(event, collection).all();
      for (const page of pages) {
        const meta = page;
        const pagePath = page.path || "/";
        if (meta.sitemap === false) continue;
        if (pagePath.endsWith(".navigation") || pagePath.includes("/.navigation")) continue;
        const urlEntry = {
          loc: pagePath
        };
        if (meta.modifiedAt && typeof meta.modifiedAt === "string") {
          urlEntry.lastmod = meta.modifiedAt.split("T")[0];
        }
        urls.push(urlEntry);
      }
    } catch {
    }
  }
  const sitemap = generateSitemap(urls, siteUrl);
  setResponseHeader(event, "content-type", "application/xml");
  return sitemap;
});
function generateSitemap(urls, siteUrl) {
  const urlEntries = urls.map((url) => {
    const loc = siteUrl ? `${siteUrl}${url.loc}` : url.loc;
    let entry = `  <url>
    <loc>${escapeXml(loc)}</loc>`;
    if (url.lastmod) {
      entry += `
    <lastmod>${escapeXml(url.lastmod)}</lastmod>`;
    }
    entry += `
  </url>`;
    return entry;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}
function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
