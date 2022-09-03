import clsx from 'clsx';
import { FieldWrapper } from './FieldWrapper';
import { FieldProps } from './types';

type InputFieldProps = FieldProps & {
  type?: 'text' | 'email' | 'password';
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, placeholder, className, registration } = props;
  return (
    <FieldWrapper label={label}>
      <input
        type={type}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className,
        )}
        placeholder={placeholder}
        {...registration}
      />
    </FieldWrapper>
  );
};
