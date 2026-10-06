// @ts-check
import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import starlight from '@astrojs/starlight'
import starlightBlog from 'starlight-blog'
import mermaid from 'astro-mermaid'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  site: 'https://mikimoto.github.io',
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
  // 保留 Docusaurus 時期的舊網址
  redirects: {
    '/': '/blog/',
    '/search': '/blog/',
    '/blog/page/2': '/blog/2/',
    '/blog/authors': '/blog/',
    '/blog/archive': '/archive/',
    '/blog/tags': '/blog/',
    '/blog/authors/mikimoto/page/2': '/blog/2/',
    '/blog/tags/cplusplus': '/blog/tags/c/',
  },
  integrations: [
    mermaid(), // 必須放在 starlight 前面
    starlight({
      title: 'Mikimoto 軟體開發筆記',
      description: '部落格，分享我對各種技術議題的觀點與開發實作紀錄',
      logo: { src: './public/img/logo.svg' },
      favicon: '/img/favicon.ico',
      defaultLocale: 'root',
      locales: { root: { label: '繁體中文', lang: 'zh-TW' } },
      lastUpdated: true,
      customCss: ['katex/dist/katex.min.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/mikimoto' },
        { icon: 'x.com', label: 'X', href: 'https://x.com/mikimoto' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikimotochuang/' },
      ],
      sidebar: [{ label: '筆記', items: [{ autogenerate: { directory: 'docs' } }] }],
      components: { Footer: './src/components/Footer.astro' },
      plugins: [
        starlightBlog({
          title: '部落格',
          postCount: 10,
          recentPostCount: 10,
          metrics: { readingTime: true },
          authors: {
            mikimoto: {
              name: 'Mikimoto',
              url: 'https://mikimoto.github.io',
              picture: 'https://avatars.githubusercontent.com/u/143029?s=400&v=4',
            },
          },
        }),
      ],
    }),
  ],
})
