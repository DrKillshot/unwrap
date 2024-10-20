import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Unwrap",
  description: "Unwrap library documentation",
  base: '/unwrap/',
  head: [
    ['link', { rel: 'icon', href: '/public/favicon.ico' }]
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
        text: 'API', link: '/containers/maybe',
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
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DrKillshot/unwrap' }
    ]
  }
})
