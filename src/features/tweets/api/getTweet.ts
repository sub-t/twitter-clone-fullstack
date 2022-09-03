import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { GetTweetDTO, Tweet } from '../types';

export const getTweet = ({
  tweetId,
}: GetTweetDTO): Promise<{ tweet: Tweet; replies: Tweet[] }> => {
  return apiClient.get(`/tweets/${tweetId}`);
};

type QueryFnType = typeof getTweet;

type UseTweetsOptions = {
  data: GetTweetDTO;
  config?: QueryConfig<QueryFnType>;
};

export const useTweet = ({ data, config }: UseTweetsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tweets', data.tweetId],
    queryFn: () => getTweet(data),
  });
};
