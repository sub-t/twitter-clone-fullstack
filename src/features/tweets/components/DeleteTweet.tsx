import { useQueryClient } from '@tanstack/react-query';
import { AlertDialog } from '@/components/Elements';
import { useAuth } from '@/features/auth';
import { useDeleteTweet } from '../api/deleteTweet';
import { useDeleteTweetStore } from '../stores/deleteTweetStore';

export const DeleteTweet = () => {
  const { isOpen, close, config } = useDeleteTweetStore();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const deleteTweetMutation = useDeleteTweet({
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
    <AlertDialog
      isOpen={isOpen}
      close={close}
      action={() =>
        deleteTweetMutation.mutateAsync({ tweetId: config!.tweetId })
      }
      actionText="Delete"
      actionVariant="danger"
      title="Delete Tweet?"
      body="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results."
      className="w-80"
    />
  );
};
