import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';
import { GetUserDTO, User } from '../types';

export const getUser = ({ screenName }: GetUserDTO): Promise<User> => {
  return apiClient.get(`/users/${screenName}`);
};

type QueryFnType = typeof getUser;

type UseUsersOptions = {
  screenName: string;
  config?: QueryConfig<QueryFnType>;
};

export const useUser = ({ screenName, config }: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users', screenName],
    queryFn: () => getUser({ screenName }),
  });
};
