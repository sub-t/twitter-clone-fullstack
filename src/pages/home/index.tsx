import type { NextPage } from 'next';
import { Spacer } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { Loading } from '@/features/misc';
import { useTimeline } from '@/features/tweets/api/getTimeLine';
import { CreateTweet } from '@/features/tweets/components/CreateTweet';
import { Tweets } from '@/features/tweets/components/Tweets';

const Page: NextPage = () => {
  const { data } = useTimeline();

  return (
    <div className="space-y-3">
      <MainLayout home title="Home">
        <CreateTweet />
        <Spacer />
        {data ? <Tweets data={data} /> : <Loading />}
      </MainLayout>
    </div>
  );
};

export default Page;
