import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Learn',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
          'library/getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Containers',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
          'containers/maybe',
          'containers/either',
          'containers/io'
      ]
    }
    ]
};
export default sidebars;