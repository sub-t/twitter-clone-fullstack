import React from 'react';
import {
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogPortal,
  Cancel,
  Content,
  Overlay,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { Button } from '../Button';
import type { DialogContentProps } from '@radix-ui/react-alert-dialog';

type Props = Omit<DialogContentProps, 'title' | 'children'> & {
  title: string;
  body?: string;
  action: () => void;
  actionText: string;
  actionVariant?: React.ComponentProps<typeof Button>['variant'];
  trigger?: React.ReactNode;
  isOpen?: boolean;
  close?: () => void;
};

export const AlertDialog = React.forwardRef<
  React.ElementRef<typeof Content>,
  Props
>(
  (
    {
      title,
      body = '',
      action,
      actionText,
      actionVariant = 'danger',
      trigger,
      isOpen,
      close,
      ...props
    },
    ref,
  ) => {
    return (
      <Root open={isOpen}>
        {trigger && <Trigger asChild>{trigger}</Trigger>}
        <AlertDialogPortal>
          <div className="absolute inset-0">
            <Overlay
              className="fixed z-50 inset-0 bg-black/50"
              onClick={close}
            />

            <Slot {...props}>
              <Content
                className={clsx(
                  'fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'overflow-y-auto flex flex-col',
                  'max-w-[600px] max-h-full p-8',
                  'bg-white rounded-2xl',
                )}
                ref={ref}
              >
                <Title asChild>
                  <h1 className="mb-2 text-xl font-bold text-slate-900">
                    {title}
                  </h1>
                </Title>
                <AlertDialogDescription className="text-sm text-slate-600">
                  {body}
                </AlertDialogDescription>

                <div className="flex flex-col mt-6">
                  <AlertDialogAction asChild>
                    <Button
                      variant={actionVariant}
                      size="lg"
                      onClick={action}
                      className="mb-3"
                    >
                      {actionText}
                    </Button>
                  </AlertDialogAction>
                  <Cancel asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={close}
                      className="mb-3"
                    >
                      Cancel
                    </Button>
                  </Cancel>
                </div>
              </Content>
            </Slot>
          </div>
        </AlertDialogPortal>
      </Root>
    );
  },
);

AlertDialog.displayName = 'AlertDialog';
