import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Unwrap",
  description: "Unwrap library documentation",
  base: '/unwrap/',
  head: [
    ['link', { rel: 'icon', href: '/unwrap/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/unwrap.png',
    outline: "deep",
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/learn/getting-started' },
      { 
        text: 'API',
        items: [
          { text: "Containers", link: '/containers/maybe' },
          { text: "Pattern matching", link: '/pattern-matching/data' }
        ]
      }
    ],

    sidebar: [
      {
        text: "Learn",
        items: [
          { text: "Getting started", link: '/learn/getting-started' }
        ]
      },
      {
        text: "Containers",
        items: [
          { text: "Maybe&lt;Value&gt;", link: '/containers/maybe' },
          { text: "Either&lt;Ok, Error&gt;", link: '/containers/either' },
          { text: "IO&lt;Operation&gt;", link: '/containers/io' }
        ]
      },
      {
        text: "Pattern Matching",
        items: [
          { text: "Data type", link: '/pattern-matching/data' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DrKillshot/unwrap' }
    ]
  }
})
