import { UseFormRegisterReturn } from 'react-hook-form';
import { WithChildren, WithClassName } from '@/types';
import { FieldWrapperPassThroughProps } from '../FieldWrapper';

export type FieldProps = WithClassName &
  WithChildren &
  FieldWrapperPassThroughProps & {
    placeholder?: string;
    registration: Partial<UseFormRegisterReturn>;
  };
