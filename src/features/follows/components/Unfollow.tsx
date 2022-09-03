import { useQueryClient } from '@tanstack/react-query';
import { AlertDialog, Button } from '@/components/Elements';
import { User } from '@/features/users';
import { useDeleteFollows } from '../api/deleteFollows';

type Props = {
  data: Pick<User, 'id' | 'screenName'>;
};

export const Unfollow = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const deleteFollowsMutation = useDeleteFollows({
    config: {
      onSuccess: () =>
        queryClient.invalidateQueries(['users', data.screenName]),
    },
  });

  return (
    <AlertDialog
      trigger={<Button variant="outline">Unfollow</Button>}
      action={() => deleteFollowsMutation.mutateAsync({ friendId: data.id })}
      actionText={`Unfollow`}
      actionVariant="secondary"
      title={`Unfollow @${data.screenName}?`}
      body="Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected."
      className="w-80"
    />
  );
};
