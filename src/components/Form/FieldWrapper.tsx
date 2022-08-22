import * as React from 'react';
import clsx from 'clsx';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, children } = props;
  return (
    <div>
      <label
        className={clsx('block text-sm font-medium text-gray-700', className)}
      >
        {label}
        <div className="mt-1">{children}</div>
      </label>
    </div>
  );
};
