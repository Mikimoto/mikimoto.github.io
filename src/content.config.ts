import { defineCollection } from 'astro:content'
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'
import { blogSchema } from 'starlight-blog/schema'

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: (context) => blogSchema(context) }) }),
  // starlight-blog 沒有內建 zh-TW 翻譯，補在 src/content/i18n/zh-TW.json
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
}
