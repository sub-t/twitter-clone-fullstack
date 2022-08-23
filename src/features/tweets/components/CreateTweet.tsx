import { useQueryClient } from '@tanstack/react-query';
import zod from 'zod';
import { Link, Button, Avatar, Card } from '@/components/Elements';
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
    <Card
      thumbnail={
        <Link href={`/${user?.screenName}`}>
          <Avatar src={user?.profileImageUrl} size="lg" />
        </Link>
      }
      content={
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
                placeholder={tweetId ? 'Tweet your reply' : "What's happening?"}
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
      }
    />
  );
};
