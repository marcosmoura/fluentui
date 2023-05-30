import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import * as React from 'react';

export type SlotContextValue = {
  slots: Record<string, React.ReactNode>;
  setSlot: (name: string, children: React.ReactNode) => void;
};

const defaultContextValue: SlotContextValue = {
  slots: {},
  setSlot() {
    throw new Error('setSlot called outside of a slot');
  },
};

// Contexts should default to undefined
export const SlotContext: Context<SlotContextValue | undefined> = createContext<SlotContextValue | undefined>(
  undefined,
);

export const SlotsProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [slots, setSlots] = React.useState<Record<string, React.ReactNode>>({});

  const setSlot = React.useCallback((name: string, slotChildren: React.ReactNode) => {
    setSlots(prevSlots => {
      if (prevSlots[name] === slotChildren) {
        return prevSlots;
      }

      return {
        ...prevSlots,
        [name]: slotChildren,
      };
    });
  }, []);

  return <SlotContext.Provider value={{ setSlot, slots }}>{children}</SlotContext.Provider>;
};

export const useSlotContext_unstable = <T,>(selector: ContextSelector<SlotContextValue, T>): T =>
  useContextSelector(SlotContext, (ctx = defaultContextValue) => selector(ctx));

export const useSlots_unstable = () => {
  const slots = useSlotContext_unstable(ctx => ctx.slots);

  return slots;
};
