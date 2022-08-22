import clsx from 'clsx';
import { FieldWrapper } from './FieldWrapper';
import type { FieldProps } from './types';

type TextAreaFieldProps = FieldProps;

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { label, placeholder, className, registration } = props;
  return (
    <FieldWrapper label={label}>
      <textarea
        className={clsx(
          'appearance-none block w-full py-1 text-xl font-normal placeholder-slate-600 outline-0 resize-none',
          className,
        )}
        placeholder={placeholder}
        {...registration}
      />
    </FieldWrapper>
  );
};
