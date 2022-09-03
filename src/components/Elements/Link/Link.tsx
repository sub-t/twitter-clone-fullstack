import React from 'react';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import { WithChildren, WithClassName } from '@/types';

type Props = LinkProps & WithChildren & WithClassName;

// TODO underline
export const Link = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <NextLink {...props} passHref>
        <a ref={ref} className={clsx('cursor-pointer', className)}>
          {children}
        </a>
      </NextLink>
    );
  },
);

Link.displayName = 'Link';
