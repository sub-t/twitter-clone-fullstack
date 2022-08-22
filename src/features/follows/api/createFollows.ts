import { useMutationOnSuccess } from '@/hooks/useMutationOnSuccess';
import { apiClient } from '@/lib/axios';
import type { CreateFollowsDTO } from '../types';

export const createFollows = ({
  friendId,
}: CreateFollowsDTO) => {
  return apiClient.post(`/users/follow/${friendId}`);
};

type UseCreateFollowsOptions = {
  config?: Parameters<typeof useMutationOnSuccess>['0']['config'];
};

export const useCreateFollows = ({ config }: UseCreateFollowsOptions = {}) => {
  return useMutationOnSuccess({
    mutationKey: ['auth-user'],
    mutationFn: createFollows,
    config,
  });
};
