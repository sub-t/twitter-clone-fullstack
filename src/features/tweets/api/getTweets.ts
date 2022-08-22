import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import type { GetTweetsDTO, Tweet } from '../types';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getTweets = ({
  userId,
  withReplies,
}: GetTweetsDTO): Promise<Tweet[]> => {
  if (withReplies) {
    return apiClient.get(`/users/${userId}/tweets/withReplies`);
  }
  return apiClient.get(`/users/${userId}/tweets`);
};

type QueryFnType = typeof getTweets;

type UseTweetsOptions = {
  data: GetTweetsDTO;
  config?: QueryConfig<QueryFnType>;
};

export const useTweets = ({ data, config }: UseTweetsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      'users',
      data.userId,
      'tweets',
      ...(data?.withReplies ? ['withReplies'] : []),
    ],
    queryFn: () => getTweets(data),
  });
};
