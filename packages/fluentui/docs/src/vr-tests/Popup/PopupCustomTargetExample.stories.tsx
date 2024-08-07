import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Popup, buttonClassName } from '@fluentui/react-northstar';
import PopupCustomTargetExample from '../../examples/components/Popup/Types/PopupCustomTargetExample.shorthand';

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows popup').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Popup>;

export { PopupCustomTargetExample };
