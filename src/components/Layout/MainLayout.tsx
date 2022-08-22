import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useAuth } from '@/features/auth';
import { ComposeTweet } from '@/features/tweets/components/ComposeTweet';
import { DeleteTweet } from '@/features/tweets/components/DeleteTweet';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import { IconButton } from '../Elements';
import { Header } from '../Header';
import { NavBar } from './NavBar';
import type { WithChildren } from '@/types';

type Props = {
  title: string;
  home?: boolean;
} & WithChildren;

export const MainLayout = ({ children, title, home = false }: Props) => {
  const lg = useBreakpoint('lg');
  const router = useRouter();
  const { user } = useAuth();

  if (home && !user) {
    router.replace('/');
  }

  return (
    <>
      <DeleteTweet />
      <ComposeTweet />

      <div className="flex">
        <div className="md:flex-grow" />
        {/* side navigation */}
        <header
          role="banner"
          className="flex-shrink-0 md:w-[88px] 2xl:w-[275px]"
        >
          <div className="top-0 bottom-0 sticky">
            <NavBar user={user} />
          </div>
        </header>
        <main
          role="main"
          className="min-w-0 flex-grow flex justify-between lg:max-w-[920px] xl:max-w-[990px]"
        >
          <div className="w-full md:w-[600px] border-x-[1px] border-slate-200">
            <Header
              undo={
                !home && (
                  <IconButton variant="inverse" onClick={router.back}>
                    <ArrowLeftIcon />
                  </IconButton>
                )
              }
              title={title}
              action={
                home && (
                  <IconButton variant="inverse" className="-mr-2">
                    <SparklesIcon />
                  </IconButton>
                )
              }
            />
            <div className="w-full">{children}</div>
          </div>
          {lg && (
            <div className="w-[290px] xl:w-[350px] h-full mr-[10px] bg-slate-100"></div>
          )}
        </main>
        <div className="md:flex-grow" />
      </div>
    </>
  );
};
