import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { prisma } from '@/api/lib/prisma';
import { Spacer } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { Loading } from '@/features/misc';
import { CreateTweet, useTweet } from '@/features/tweets';
import { TweetCard } from '@/features/tweets/components/TweetCard';
import type { ParsedUrlQuery } from 'querystring';

type Props = {
  tweetId: string;
};

type Params = ParsedUrlQuery & {
  tweetId: string;
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  tweetId,
}) => {
  const { data } = useTweet({ data: { tweetId } });

  if (!data) {
    return <Loading />;
  }

  return (
    <MainLayout title="Thread">
      <TweetCard data={data} thread />
      <CreateTweet tweetId={data.id} />
      <Spacer />
    </MainLayout>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const users = await prisma.user.findMany({
    include: {
      tweets: true,
    },
  });

  return {
    paths: users.flatMap(({ screenName, tweets }) =>
      tweets.map((tweet) => ({ params: { screenName, tweetId: tweet.id } })),
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { tweetId } = params as Params;

  return {
    props: {
      tweetId,
    },
  };
};
