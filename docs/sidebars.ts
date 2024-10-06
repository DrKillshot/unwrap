import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
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
      label: 'Monads',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
          'monads/maybe',
          'monads/either',
          'monads/io'
      ]
    }
    ]
};
export default sidebars;