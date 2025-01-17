import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const themeConfig = {
  // * Common
  image: "img/docusaurus-social-card.jpg", // used for social card, in particular og:image and twitter:image.
  //   announcementBar: {
//     id: "announcement",
//     content:
//       '如果我的筆記對你有幫助，歡迎到我的 <a target="_blank" rel="noopener noreferrer" href="https://github.com/Bosh-Kuo/docusaurus-dev-notes">Github</a> 給我一顆星星 ⭐️',
//     textColor: "#091E42",
//     isCloseable: true,
//   },
  // * Navbar
  navbar: {
    title: 'Mikimoto 軟體開發筆記',
    logo: {
      alt: 'My Site Logo',
      src: 'img/logo.svg',
    },
    // hideOnScroll: true,
    items: [
      {
        type: 'docSidebar',
        sidebarId: 'tutorialSidebar',
        position: 'left',
        label: '筆記',
      },
//       {
//         type: "doc",
//         docId: "index",
//         position: "left",
//         label: "筆記",
//       },
      {to: '/blog', label: '部落格', position: 'left'},
      // {
      //   href: 'https://github.com/mikimoto/mikimoto.github.io',
      //   label: 'GitHub',
      //   position: 'right',
      // },
    ],
  },
  // * CodeBlock
  prism: {
    theme: prismThemes.github,
    darkTheme: prismThemes.dracula,
  },
  // * Footer
  footer: {
    style: 'dark',
    links: [
      {
        title: "This Website",
        items: [
          {
            label: "筆記",
            to: "/docs",
          },
          {
            label: "部落格",
            to: "/blog",
          },
          // {
          //   label: "近期專案",
          //   to: "/projects",
          // },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'X',
            href: 'https://x.com/mikimoto',
          },
          {
            label: "Github",
            href: "https://github.com/mikimoto",
          },
          {
            label: "Linkedin",
            href: "https://www.linkedin.com/in/mikimotochuang/",
          },
          // {
          //   label: "CakeResume",
          //   href: "https://www.cakeresume.com/s--IPijnOZLMFNIJ6ofjbn6Dg--/bosh-kuo",
          // },
        ],
      },
      {
        title: 'More',
        items: [
          {
            label: 'Stack Overflow',
            href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          },
          // {
          //   label: "Portfolio",
          //   href: "https://boshkuo.com/",
          // },
          {
            label: "MOPCON Youtube Channel",
            href: "https://www.youtube.com/@MopconOrg/playlists",
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} Mikimoto. Built with Docusaurus.`,
  },
  // * Sidebar
  docs: {
    sidebar: {
      hideable: true,
      autoCollapseCategories: true,
    },
  },
  // * Algolia DocSearch
  // https://docusaurus.io/docs/search#using-algolia-docsearch
  algolia: {
    // The application ID provided by Algolia
    appId: "62V3DAJBGW",
    // Public API key: it is safe to commit it
    apiKey: "36a77a3cc012183aa155b09bee973f1f",
    indexName: "mikimotoio",
    // Optional: see doc section below
    contextualSearch: true,
    // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
    // externalUrlRegex: "external\\.com|domain\\.com",

    // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
    replaceSearchResultPathname: {
      from: "/docs/", // or as RegExp: /\/docs\//
      to: "/",
    },

    // Optional: Algolia search parameters
    searchParameters: {},
    // Optional: path for search page that enabled by default (`false` to disable it)
    searchPagePath: "search",
    insights: false,
    //... other Algolia params
  },
  // * theme-live-codeblock
  liveCodeBlock: {
    playgroundPosition: "bottom", // "top" | "bottom"
  },
  // * docusaurus-plugin-image-zoom
  zoom: {
    selector: ".markdown :not(em) > img",
    background: {
      light: "rgb(255, 255, 255)",
      dark: "rgb(50, 50, 50)",
    },
  },
} satisfies Preset.ThemeConfig;

export default themeConfig;