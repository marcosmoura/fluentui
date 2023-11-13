import * as React from 'react';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer } from '@fluentui/react-drawer';
import { animated } from '@fluentui/react-motion-preview';

const visibleKeyframe = {
  opacity: 1,
  transform: 'translate3D(0, 0, 0)',
};

const hiddenKeyframe = {
  opacity: 0,
  transform: 'translate3D(-100%, 0, 0)',
};

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),
    display: 'flex',
    height: '480px',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#fff',
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    boxSizing: 'border-box',
    overflowY: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
});

const drawerWidth = '360px';

const useDrawerMotionStyles = makeStyles({
  default: {
    width: drawerWidth,
    willChange: 'opacity, transform',
  },

  enter: {
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: hiddenKeyframe,
      to: visibleKeyframe,
    },
  },

  exit: {
    transitionDuration: tokens.durationSlower,
    animationTimingFunction: tokens.curveAccelerateMin,
    animationName: {
      from: visibleKeyframe,
      to: hiddenKeyframe,
    },
  },
});

const useContentMotionStyles = makeStyles({
  default: {
    transitionProperty: 'transform, background-color',
    willChange: 'transform, background-color',
  },

  enter: {
    transitionDuration: tokens.durationSlower,
    transitionTimingFunction: tokens.curveDecelerateMid,
    transform: `translate3D(${drawerWidth}, 0, 0)`,
    backgroundColor: tokens.colorNeutralBackground4,
  },

  exit: {
    transitionDuration: tokens.durationGentle,
    transitionTimingFunction: tokens.curveAccelerateMin,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  idle: {
    width: `calc(100% - ${drawerWidth})`,
  },
});

const AnimatedDrawer = animated(InlineDrawer, {
  classNames: useDrawerMotionStyles,
});

const AnimatedContent = animated('div', {
  classNames: useContentMotionStyles,
  removeOnHidden: false,
});

export const MotionCustom = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.root}>
      <AnimatedDrawer presence={open} separator open={open}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Left Inline Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </AnimatedDrawer>

      <AnimatedContent presence={open} className={mergeClasses(styles.content)}>
        <Button appearance="primary" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'}
        </Button>

        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque a doloribus perspiciatis voluptas magni modi
            atque, eligendi voluptate provident similique quod libero cum veniam, delectus nemo reprehenderit officia
            quisquam! Corrupti?
          </p>
        ))}
      </AnimatedContent>
    </div>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story: [
        'Drawer components have motion built-in. However, you can customize the animation by using the `useMotion` hook.',
        'The hook returns properties that can be used to determine the state of the animation, and can be passed to the `open` prop of the drawer.',
        'With this, you can create your own custom CSS animation/transition and apply it to the drawer.',
      ].join('\n'),
    },
  },
};
