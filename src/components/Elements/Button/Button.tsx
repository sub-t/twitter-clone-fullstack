import * as React from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-sky-500 text-white',
  secondary: 'bg-black text-white',
  inverse: 'hover:bg-slate-100',
  outline: 'hover:bg-slate-100 border-[1px] border-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
};

const sizes = {
  sm: 'h-[34px] px-4 text-md',
  lg: 'h-[50.25px] px-3 text-md',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
          'flex-shrink-0 flex justify-center items-center disabled:opacity-70 rounded-full font-bold outline-0 focus:outline-slate-400 anime',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
