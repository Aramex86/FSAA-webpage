import type { MetadataRoute } from "next";
import { docsSitemapEntries } from "@/features/docs-urls";

export const dynamic = "force-static";

// Укажите точный адрес вашего сайта на GitHub Pages
const BASE_URL = "https://aramex86.github.io/fsaa";

export default function sitemap(): MetadataRoute.Sitemap {
  return docsSitemapEntries().map((e) => {
    // Если URL уже абсолютный, оставляем как есть. Иначе добавляем BASE_URL.
    const absoluteUrl = e.url.startsWith("http")
      ? e.url
      : `${BASE_URL}${e.url.startsWith("/") ? e.url : `/${e.url}`}`;

    return {
      url: absoluteUrl,
      lastModified: new Date(),
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    };
  });
}
