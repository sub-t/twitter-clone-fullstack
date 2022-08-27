import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '@/components/Layout';
import { Loading } from '@/features/misc';
import { Tweets, useTweets } from '@/features/tweets';
import { useUser, Profile, Tabs } from '@/features/users';
import { UserSeo } from '@/features/users/components/UserSeo';

const Page: NextPage = () => {
  const router = useRouter();

  const screenName = router.query.screenName as string;
  const { data: user } = useUser({ screenName });
  const { data: tweets } = useTweets({
    data: { screenName, withReplies: true },
  });

  return (
    <>
      {user && (
        <MainLayout title={user.name}>
          <UserSeo data={user} />
          <Profile data={user} />
          <Tabs data={user} />
          {tweets ? <Tweets data={tweets} /> : <Loading />}
        </MainLayout>
      )}
    </>
  );
};

export default Page;
