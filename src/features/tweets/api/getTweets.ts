import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { GetTweetsDTO, Tweet } from '../types';

export const getTweets = ({
  screenName,
  withReplies,
}: GetTweetsDTO): Promise<Tweet[]> => {
  if (withReplies) {
    return apiClient.get(`/users/${screenName}/tweets/withReplies`);
  }
  return apiClient.get(`/users/${screenName}/tweets`);
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
      data.screenName,
      'tweets',
      ...(data?.withReplies ? ['withReplies'] : []),
    ],
    queryFn: () => getTweets(data),
  });
};
