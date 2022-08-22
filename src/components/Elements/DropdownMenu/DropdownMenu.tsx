import React, { useState } from 'react';
import {
  Root,
  Content,
  Trigger,
  DropdownMenuArrow,
  Group,
  Item,
  Portal,
} from '@radix-ui/react-dropdown-menu';
import { Slot } from '@radix-ui/react-slot';
import { AnimatePresence } from 'framer-motion';
import { Motion } from '../Motion';
import type { AnimationConfig } from '../Motion';
import type { DialogContentProps } from '@radix-ui/react-alert-dialog';

const normal: AnimationConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { delay: 0.26, duration: 0.2 },
};

const slideIn: AnimationConfig = {
  initial: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1 },
  transition: { delay: 0.26, duration: 0.1 },
  style: { transformOrigin: 'top' },
};

const animations = {
  slideIn,
  normal,
};

type AnimationType = keyof typeof animations;

type Props = DialogContentProps & {
  trigger?: React.ReactNode;
  animationType?: AnimationType;
};

export const DropdownMenu = React.forwardRef<
  React.ElementRef<typeof Content>,
  Props
>(({ children, trigger, animationType = 'normal', ...props }, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <Root onOpenChange={(open) => setOpen(open)}>
      <Trigger asChild>{trigger}</Trigger>

      <AnimatePresence>
        {open && (
          <Portal>
            <Motion {...animations[animationType]}>
              <Slot {...props}>
                <Content
                  ref={ref}
                  sideOffset={animationType === 'normal' ? 0 : -52}
                  collisionPadding={32}
                  forceMount
                  className="rounded-xl bg-white shadow-lg"
                >
                  {animationType === 'normal' && (
                    <DropdownMenuArrow className="fill-white" />
                  )}
                  {children}
                </Content>
              </Slot>
            </Motion>
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export const DropdownMenuGroup = Group;
export const DropdownMenuItem = Item;
