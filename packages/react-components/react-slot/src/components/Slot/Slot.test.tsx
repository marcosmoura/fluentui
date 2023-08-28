import * as React from 'react';
import { render } from '@testing-library/react';
import { Slot } from './Slot';
import { isConformant } from '../../testing/isConformant';

describe('Slot', () => {
  isConformant({
    Component: Slot,
    displayName: 'Slot',
  });

  it('renders a default state', () => {
    const result = render(<Slot name="test">Default Slot</Slot>);
    expect(result.container).toMatchSnapshot();
  });
});
