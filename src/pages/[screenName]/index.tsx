import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { MainLayout } from '@/components/Layout';
import { API_URL } from '@/config/app';
import { Loading } from '@/features/misc';
import { Tweets, useTweets } from '@/features/tweets';
import { useUser, Profile, Tabs } from '@/features/users';
import { UserSeo } from '@/features/users/components/UserSeo';
import type { User } from '@/features/users';
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
  const { data: tweets } = useTweets({ data: { screenName } });

  return (
    <div className="space-y-3">
      {user && (
        <MainLayout title={user.name}>
          <UserSeo user={user} />
          <Profile user={user} />
          <Tabs screenName={user.screenName} />
          {tweets ? <Tweets data={tweets} /> : <Loading />}
        </MainLayout>
      )}
    </div>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const users = (await fetch(`${API_URL}/api/users`).then((data) =>
    data.json(),
  )) as User[];
  const paths = users.map((user) => ({
    params: { screenName: user.screenName },
  }));

  return { paths, fallback: false };
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
