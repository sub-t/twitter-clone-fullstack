import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import type { GetUserDTO, User } from '../types';
import type { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';

export const getUser = ({ userId }: GetUserDTO): Promise<User> => {
  return apiClient.get(`/users/${userId}`);
};

type QueryFnType = typeof getUser;

type UseUsersOptions = {
  userId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useUser = ({ userId, config }: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users', userId],
    queryFn: () => getUser({ userId }),
  });
};
