import React from 'react';
import clsx from 'clsx';
import { WithClassName } from '@/types';

type Props = WithClassName & {
  thumbnail: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
  thread?: boolean;
};

export const Card = ({
  thumbnail,
  header,
  icon,
  content,
  buttons,
  className,
  thread = false,
}: Props) => {
  return (
    <div className={clsx('w-full px-4 py-3 bg-white', className)}>
      <div className="min-w-0 flex">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 w-12 mr-3">
          {thumbnail}
        </div>

        <div className="min-w-0 w-full">
          {header && (
            <div className="min-w-0 flex justify-between">
              <div className="min-w-0 flex-shrink flex flex-col">{header}</div>
              <div className="flex items-center ml-3">{icon}</div>
            </div>
          )}
          {thread || (
            <>
              {content}
              {buttons}
            </>
          )}
        </div>
      </div>
      {thread && (
        <>
          {content}
          {buttons}
        </>
      )}
    </div>
  );
};
