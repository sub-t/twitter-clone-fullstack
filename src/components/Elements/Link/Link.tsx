import React from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import type { WithChildren, WithClassName } from '@/types';
import type { LinkProps } from 'next/link';

type Props = LinkProps & WithChildren & WithClassName;

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <NextLink
        className={clsx('text-sky-400, cursor-pointer', className)}
        {...props}
        passHref
      >
        <a ref={ref}>{children}</a>
      </NextLink>
    );
  },
);

Link.displayName = 'Link';
