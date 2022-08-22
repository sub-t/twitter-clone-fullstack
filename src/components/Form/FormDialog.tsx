import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import {
  Close,
  Content,
  DialogPortal,
  Overlay,
  Root,
} from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { IconButton } from '../Elements';
import { Header } from '../Header';
import type { DialogContentProps } from '@radix-ui/react-alert-dialog';

type Props = Omit<DialogContentProps, 'title'> & {
  title?: string;
  action?: React.ReactNode;
  isOpen?: boolean;
  close?: () => void;
};

export const FormDialog = React.forwardRef<
  React.ElementRef<typeof Content>,
  Props
>(({ children, title, action, isOpen, close, ...props }, ref) => {
  return (
    <Root open={isOpen}>
      <DialogPortal>
        <div className="z-50 fixed inset-0">
          <Overlay onClick={close} className="fixed inset-0 bg-black/50" />

          <Slot {...props}>
            <Content
              ref={ref}
              className="overflow-hidden fixed left-1/2 -translate-x-1/2 w-screen sm:w-[600px] h-screen sm:h-auto sm:rounded-2xl bg-white"
            >
              <div className="overflow-y-auto h-full">
                <Header
                  undo={
                    <Close onClick={close} asChild>
                      <IconButton variant="inverse" aria-label="Close">
                        <XIcon />
                      </IconButton>
                    </Close>
                  }
                  title={title}
                  action={action}
                />

                {children}
              </div>
            </Content>
          </Slot>
        </div>
      </DialogPortal>
    </Root>
  );
});

FormDialog.displayName = 'FormDialog';
