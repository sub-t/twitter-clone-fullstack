import clsx from 'clsx';
import Image from 'next/image';
import type { WithClassName } from '@/types';

type Props = WithClassName & {
  src: string | null | undefined;
  alt: string;
};

export const FallbackImage = ({ src, alt, className }: Props) => {
  return (
    <div className={clsx('overflow-hidden relative bg-slate-200', className)}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      {src && <Image layout="fill" objectFit="cover" src={src} alt={alt} />}
    </div>
  );
};
