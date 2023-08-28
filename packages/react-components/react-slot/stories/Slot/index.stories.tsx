import { Slot } from '@fluentui/react-slot';

import descriptionMd from './SlotDescription.md';

export { Default } from './SlotDefault.stories';

export default {
  title: 'Preview Components/Slot',
  component: Slot,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
