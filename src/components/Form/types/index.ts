import type { FieldWrapperPassThroughProps } from '../FieldWrapper';
import type { WithChildren, WithClassName } from '@/types';
import type { UseFormRegisterReturn } from 'react-hook-form';

export type FieldProps = WithClassName &
  WithChildren &
  FieldWrapperPassThroughProps & {
    placeholder?: string;
    registration: Partial<UseFormRegisterReturn>;
  };
