import * as React from 'react';
import type { SlotProps } from './Slot.types';
import { useSlotContext_unstable } from '../../contexts/slotContext';

/**
 * Slot component - TODO: add more docs
 */
export const Slot: React.FC<SlotProps> = React.memo(({ name, children }) => {
  const setSlot = useSlotContext_unstable(ctx => ctx.setSlot);

  React.useEffect(() => setSlot(name, children), [children, name, setSlot]);

  return null;
});

Slot.displayName = 'Slot';
