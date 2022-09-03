import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/Elements';
import { User } from '@/features/users';
import { useCreateFollows } from '../api/createFollows';

type Props = {
  data: Pick<User, 'id' | 'screenName'>;
};

export const Follow = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const createFollowsMutation = useCreateFollows({
    config: {
      onSuccess: () =>
        queryClient.invalidateQueries(['users', data.screenName]),
    },
  });

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        await createFollowsMutation.mutateAsync({ friendId: data.id });
      }}
    >
      Follow
    </Button>
  );
};
