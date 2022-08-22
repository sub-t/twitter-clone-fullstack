import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import zod from 'zod';
import { Link, Button } from '@/components/Elements';
import { Form, TextAreaField } from '@/components/Form';
import { useAuth } from '@/features/auth';
import { useCreateTweet } from '../api/createTweet';
import { useComposeTweet } from '../stores/composeTweet';
import type { CreateTweetDTO } from '../types';

const schema = zod.object({
  text: zod.string().min(1, 'Required'),
});

type Props = {
  tweetId?: string;
};

export const CreateTweet = ({ tweetId }: Props) => {
  const { close } = useComposeTweet();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const createTweetMutation = useCreateTweet({
    config: {
      onSettled: close,
      onSuccess: () => {
        queryClient.invalidateQueries(['users', user?.screenName, 'tweets']);
        queryClient.invalidateQueries([
          'users',
          user?.screenName,
          'tweets',
          'withReplies',
        ]);
      },
    },
  });

  return (
    <div className={clsx('px-4 py-3')}>
      <div className="flex gap-3">
        <div className="flex items-start w-12">
          <Link href={`/${user?.screenName}`}>
            <div className="overflow-hidden relative w-12 h-12 rounded-full bg-slate-50">
              {user?.profileImageUrl && (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={user.profileImageUrl}
                  alt="avatar"
                />
              )}
            </div>
          </Link>
        </div>

        <div className="w-full">
          <Form<CreateTweetDTO['data']>
            id="create-tweet"
            onSubmit={async (values) => {
              await createTweetMutation.mutateAsync({
                data: { ...values, inReplyToStatusId: tweetId ?? null },
              });
            }}
            schema={schema}
            options={{ mode: 'onChange' }}
            className="flex flex-col gap-3"
          >
            {({ register, formState }) => (
              <>
                <TextAreaField
                  placeholder={
                    tweetId ? 'Tweet your reply' : "What's happening?"
                  }
                  registration={register('text')}
                />
                <div className="flex justify-between">
                  <div></div>
                  <Button type="submit" disabled={!formState.isValid}>
                    Tweet
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
