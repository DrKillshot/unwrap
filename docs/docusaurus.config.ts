import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Unwrap',
  tagline: 'Functional programming containers for all',
  favicon: 'favicon.ico',

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/unwrap',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Unnullable', // Usually your GitHub org/user name.
  projectName: 'Unwrap', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DrKillshot/unwrap',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DrKillshot/unwrap',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'unwrap.png',
    navbar: {
      title: "Unwrap",
      logo: {
        alt: 'Unwrap logo',
        src: 'unwrap.png',
      },
      items: [
        {to: '/unwrap/docs/library/getting-started', label: 'Getting started', position: 'left'},
        {to: '/unwrap/docs/monads/maybe' ,position: 'left', label: 'API'},
        {
          href: 'https://github.com/DrKillshot/unwrap',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Github',
          items: [
            {
              label: 'Pull Requests',
              to: 'https://github.com/DrKillshot/unwrap/pulls',
            },
            {
              label: 'Issues',
              to: 'https://github.com/DrKillshot/unwrap/issues'
            },
          ],
        },
        {
          title: 'Contacts',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DrKillshot/unwrap',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Unwrap.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
