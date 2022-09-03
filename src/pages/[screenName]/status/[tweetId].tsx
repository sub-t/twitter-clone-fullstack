import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Link, Spacer } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { CreateTweet, Tweets, useTweet } from '@/features/tweets';
import { TweetCard } from '@/features/tweets/components/TweetCard';
import { useNotificationStore } from '@/stores/notifications';

const Page: NextPage = () => {
  const router = useRouter();
  const { addNotification } = useNotificationStore();

  const tweetId = router.query.tweetId as string;
  const { data, isError } = useTweet({
    data: { tweetId },
    config: {
      enabled: !!tweetId,
      onError: () =>
        addNotification({
          title: 'Sorry, that Tweet has been deleted.',
        }),
    },
  });

  return isError ? (
    <MainLayout title={'Tweet'}>
      <NextSeo title="Tweet / Twitter" />

      <div className="px-3 py-10">
        <div className="flex flex-col items-center px-3 py-5 mt-10">
          <span className="mb-7 text-slate-500">
            Hmm...this page doesn’t exist. Try searching for something else.
          </span>
          <Link
            href="/search"
            className="px-4 py-2 rounded-full font-bold outline-0 bg-sky-500 text-white hover:no-underline"
          >
            Search
          </Link>
        </div>
      </div>
    </MainLayout>
  ) : (
    <MainLayout title="Tweet">
      {data && (
        <>
          <NextSeo
            title={`${data.tweet.user.name} on Twitter: "${data.tweet.text}"`}
          />

          <TweetCard data={data.tweet} thread />
          <CreateTweet tweetId={data.tweet.id} />
          <Spacer />
          <Tweets data={data.replies} />
        </>
      )}
    </MainLayout>
  );
};

export default Page;
