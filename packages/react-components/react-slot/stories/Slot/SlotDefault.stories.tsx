import * as React from 'react';
import { Slot, SlotsProvider } from '@fluentui/react-slot';
import { useSlots_unstable as useSlots } from '../../src/contexts/slotContext';

const SampleComponentBase = ({ children }: React.PropsWithChildren<{}>) => {
  const slots = useSlots();

  return (
    <div>
      <header>{slots.header}</header>
      <main>{children}</main>
      <footer>{slots.footer}</footer>
    </div>
  );
};

const SampleComponent = ({ children }: React.PropsWithChildren<{}>) => (
  <SlotsProvider>
    <SampleComponentBase>{children}</SampleComponentBase>
  </SlotsProvider>
);

export const Default = () => (
  <SampleComponent>
    <p>Test</p>

    <Slot name="header">
      <p>Header</p>
    </Slot>

    <Slot name="footer">
      <p>Footer</p>
    </Slot>
  </SampleComponent>
);
