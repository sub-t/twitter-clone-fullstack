import { useMutationOnSuccess } from '@/hooks/useMutationOnSuccess';
import { apiClient } from '@/lib/axios';
import { UpdateProfileDTO, User } from '../types';

export const updateProfile = ({ data }: UpdateProfileDTO): Promise<User> => {
  return apiClient.patch('/users', data);
};

type UseUpdateProfileOptions = {
  config?: Parameters<typeof useMutationOnSuccess>['0']['config'];
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  return useMutationOnSuccess({
    mutationKey: ['auth-user'],
    mutationFn: updateProfile,
    config,
  });
};
