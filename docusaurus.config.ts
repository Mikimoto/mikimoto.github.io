import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import presets from './config/presets';
import plugins from './config/plugins';
import themeConfig from './config/themeConfig';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Mikimoto 軟體開發筆記',
  tagline: '任何足夠先進的技術都等同於魔術',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mikimoto.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mikimoto', // Usually your GitHub org/user name.
  projectName: 'mikimoto.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets,
  plugins,
  themeConfig,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant', 'en'],
  },

  // * others
  // Enabling mermaid
  // reference: https://docusaurus.io/docs/markdown-features/diagrams
  themes: ["@docusaurus/theme-mermaid", "@docusaurus/theme-live-codeblock"],
  markdown: {
    mermaid: true,
  },

    // Enabling math equations
  // reference: https://docusaurus.io/docs/markdown-features/math-equations
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css",
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css",
    "https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css",
  ],

    // An array of tags that will be inserted in the HTML <head>
    headTags: [
      {
        tagName: "link",
        attributes: {
          rel: "shortcut icon",
          href: "img/favicon.ico",
          type: "image/x-icon",
        },
      },
    ],
};

export default config;
