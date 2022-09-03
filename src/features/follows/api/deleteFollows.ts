import { useMutationOnSuccess } from '@/hooks/useMutationOnSuccess';
import { apiClient } from '@/lib/axios';
import { DeleteFollowsDTO } from '../types';

export const deleteFollows = ({ friendId }: DeleteFollowsDTO) => {
  return apiClient.delete(`/users/follow/${friendId}`);
};

type UseDeleteFollowsOptions = {
  config?: Parameters<typeof useMutationOnSuccess>['0']['config'];
};

export const useDeleteFollows = ({ config }: UseDeleteFollowsOptions = {}) => {
  return useMutationOnSuccess({
    mutationKey: ['auth-user'],
    mutationFn: deleteFollows,
    config,
  });
};
