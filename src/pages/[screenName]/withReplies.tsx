import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { prisma } from '@/api/lib/prisma';
import { MainLayout } from '@/components/Layout';
import { Loading } from '@/features/misc';
import { Tweets, useTweets } from '@/features/tweets';
import { useUser, Profile, Tabs } from '@/features/users';
import { UserSeo } from '@/features/users/components/UserSeo';
import type { ParsedUrlQuery } from 'querystring';

type Props = {
  screenName: string;
};

type Params = ParsedUrlQuery & {
  screenName: string;
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  screenName,
}) => {
  const { data: user } = useUser({ screenName });
  const { data: tweets } = useTweets({
    data: { screenName, withReplies: true },
  });

  if (!user || !tweets) {
    return <Loading />;
  }

  return (
    <>
      <UserSeo data={user} />
      <div className="space-y-3">
        {user && (
          <MainLayout title={user.name}>
            <Profile data={user} />
            <Tabs data={user} />
            <Tweets data={tweets} />
          </MainLayout>
        )}
      </div>
    </>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const users = await prisma.user.findMany();

  return {
    paths: users.map((user) => ({
      params: { screenName: user.screenName },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { screenName } = params as Params;

  return {
    props: {
      screenName,
    },
  };
};
