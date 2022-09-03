import { User } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const list = [
  { title: 'Tweets', path: '' },
  { title: 'Tweets & replies', path: 'withReplies' },
  { title: 'Media', path: 'media' },
  { title: 'Favorites', path: 'favorites' },
];

type Props = {
  data: Pick<User, 'screenName'>;
};

export const Tabs = ({ data }: Props) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div role="tablist" className="w-full flex">
      {list.map(({ title, path }) => {
        const link = `/${data.screenName}/${path}`;

        return (
          <button
            onClick={() => router.replace(link)}
            key={path}
            className={clsx(
              'flex-grow relative h-[53px] font-bold anime hover:bg-slate-200',
              isMatch(pathname, path) ? 'text-slate-800' : 'text-slate-500',
            )}
          >
            {title}
            {isMatch(pathname, path) && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-sky-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

const isMatch = (pathname: string, path: string) => {
  const currentPath = pathname.slice().split('/').pop();
  return (
    currentPath === path || (currentPath === '[screenName]' && path === '')
  );
};
