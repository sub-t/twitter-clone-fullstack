import { Link } from '@/components/Elements';
import { FormDialog } from '@/components/Form/FormDialog';
import { useComposeTweet } from '../stores/composeTweet';
import { CreateTweet } from './CreateTweet';
import { TweetCard } from './TweetCard';

export const ComposeTweet = () => {
  const { isOpen, close, config } = useComposeTweet();
  const data = config?.data;

  return (
    <FormDialog isOpen={isOpen} close={close} className="sm:top-9">
      {data && (
        <>
          <TweetCard data={data} reply={!!data.id} />

          <div className="flex px-4">
            <div className="flex justify-center w-12 h-10 mr-3">
              <div className="w-[2px] h-full bg-slate-300" />
            </div>
            <div className="pt-1 pb-4 text-slate-500">
              Replying to{' '}
              <Link href={`/${data.user.id}`} className="text-sky-500">
                @{data.user.id}
              </Link>
            </div>
          </div>
        </>
      )}
      <CreateTweet tweetId={data?.id} />
    </FormDialog>
  );
};
