import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import { UnknownSlotProps, useMergedRefs } from '@fluentui/react-utilities';

import { MotionOptions, MotionShorthand, useMotion } from '../hooks/useMotion';
import { MotionClassNames, useMotionClassNames } from '../hooks/useMotionClassNames';

type AnimatedOptions = {
  classNames: () => MotionClassNames;
  motionOptions?: MotionOptions;
  removeOnHidden?: boolean;
};

type AnimatedProps<Props extends UnknownSlotProps> = Props & {
  presence: MotionShorthand;
};

export function animated<Props extends UnknownSlotProps, Element extends HTMLElement>(
  Component: React.ComponentType<Props> | keyof JSX.IntrinsicElements,
  { motionOptions: options, classNames: useClassNames, removeOnHidden = true }: AnimatedOptions,
) {
  return React.forwardRef<Element, AnimatedProps<Props>>((props, innerRef) => {
    const { presence, className, ...filteredProps } = props;
    const motion = useMotion(presence, options);
    const { ref: motionRef, canRender } = motion;
    const motionClassNames = useMotionClassNames(motion, useClassNames());
    const ref = useMergedRefs(motionRef, innerRef);

    if (removeOnHidden && !canRender) {
      return null;
    }

    const forwardedProps = {
      ...filteredProps,
      ref,
      className: mergeClasses(className, motionClassNames),
    } as unknown as AnimatedProps<Props>;

    return <Component {...forwardedProps} />;
  });
}
