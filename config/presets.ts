import type * as Preset from "@docusaurus/preset-classic";

import { PresetConfig } from "@docusaurus/types";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const presets: PresetConfig[] = [
  [
    // 正式寫法： "@docusaurus/preset-classic"
    "classic",
    {
      // * theme-classic
      theme: {
        customCss: "./src/css/custom.css",
      },
      // * plugin-content-docs
      docs: {
        sidebarPath: "./sidebars.ts",
        showLastUpdateTime: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
      // * plugin-content-blog
      blog: {
        path: "blog",
        routeBasePath: "blog",
        blogSidebarCount: 10,
        blogSidebarTitle: "最新文章",
        blogDescription: "部落格，分享我對各種技術議題的觀點與開發實作紀錄",
        postsPerPage: 10,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showReadingTime: true,
        showLastUpdateTime: false,
        feedOptions: {
          type: ['rss', 'atom'],
          copyright: `Copyright © ${new Date().getFullYear()} Mikimoto.`,
          xslt: true,
          createFeedItems: async (params) => {
            const {blogPosts, defaultCreateFeedItems, ...rest} = params;
            return defaultCreateFeedItems({
              // keep only the 10 most recent blog posts in the feed
              blogPosts: blogPosts.filter((item, index) => index < 10),
              ...rest,
            });
          },
        },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
      },
      // * plugin-google-gtag
    //   gtag: {
    //     trackingID: "G-HF9KVZT5MF",
    //     anonymizeIP: true,
    //   },
    } satisfies Preset.Options,
  ],
];

export default presets;