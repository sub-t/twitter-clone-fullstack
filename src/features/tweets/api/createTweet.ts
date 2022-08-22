import { useMutationOnSuccess } from '@/hooks/useMutationOnSuccess';
import { apiClient } from '@/lib/axios';
import type { CreateTweetDTO, Tweet } from '../types';

export const createTweet = ({ data }: CreateTweetDTO): Promise<Tweet> => {
  return apiClient.post('/tweets', data);
};

type UseCreateTweetOptions = {
  config?: Parameters<typeof useMutationOnSuccess>['0']['config'];
};

export const useCreateTweet = ({ config }: UseCreateTweetOptions = {}) => {
  return useMutationOnSuccess({
    mutationKey: ['timeline'],
    mutationFn: createTweet,
    config,
  });
};
