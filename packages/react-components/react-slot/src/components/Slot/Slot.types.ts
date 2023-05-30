import type { ComponentState } from '@fluentui/react-utilities';

/**
 * Slot Props
 */
export type SlotProps = {
  /**
   * The HTML slot name to render the Slot into.
   */
  name: string;
};

/**
 * State used in rendering Slot
 */
export type SlotState = ComponentState<{}>;
