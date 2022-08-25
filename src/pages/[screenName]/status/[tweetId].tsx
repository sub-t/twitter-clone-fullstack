import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { Spacer } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { API_URL } from '@/config/app';
import { Loading } from '@/features/misc';
import { CreateTweet, useTweet } from '@/features/tweets';
import { TweetCard } from '@/features/tweets/components/TweetCard';
import type { UsersResponse } from '@/features/users';
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
  const usersResponse = (await fetch(`${API_URL}/api/users`).then((data) =>
    data.json(),
  )) as UsersResponse;

  const paths = usersResponse.flatMap(({ screenName, tweetIds }) =>
    tweetIds.map((tweetId) => ({ params: { screenName, tweetId } })),
  );
  return { paths, fallback: false };
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
