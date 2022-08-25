import clsx from 'clsx';
import { FallbackImage } from '../FallbackImage';
import type { WithClassName } from '@/types';

const sizes = {
  sm: 'w-10 h-10',
  lg: 'w-12 h-12',
  full: 'w-full',
};

type Props = WithClassName & {
  src: string | null | undefined;
  size?: keyof typeof sizes;
};

export const Avatar = ({ src, size = 'sm', className }: Props) => {
  return (
    <>
      <FallbackImage
        src={src}
        alt="avatar"
        className={clsx('overflow-hidden rounded-full', sizes[size], className)}
      />
    </>
  );
};
