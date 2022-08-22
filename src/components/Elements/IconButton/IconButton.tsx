import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

const variants = {
  primary: 'hover:bg-sky-50 hover:text-sky-500',
  secondary: 'bg-sky-500 text-white',
  inverse: 'hover:bg-slate-100',
  outline: 'hover:bg-slate-100 border-[1px] border-slate-300',
  danger: 'hover:bg-pink-50 hover:text-pink-500',
  success: 'hover:bg-green-50 hover:text-green-500',
};

const sizes = {
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-[52px] h-[52px]',
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-7 h-7',
};


export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'sm',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex-shrink-0 flex justify-center items-center rounded-full outline-0 anime',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        <Slot className={clsx(iconSizes[size])}>{children}</Slot>
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
