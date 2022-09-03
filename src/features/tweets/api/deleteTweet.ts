import { useMutationOnSuccess } from '@/hooks/useMutationOnSuccess';
import { apiClient } from '@/lib/axios';
import { DeleteTweetDTO } from '../types';

export const deleteTweet = ({ tweetId }: DeleteTweetDTO) => {
  return apiClient.delete(`/tweets/${tweetId}`);
};

type UseDeleteTweetOptions = {
  config?: Parameters<typeof useMutationOnSuccess>['0']['config'];
};

export const useDeleteTweet = ({ config }: UseDeleteTweetOptions = {}) => {
  return useMutationOnSuccess({
    mutationKey: ['timeline'],
    mutationFn: deleteTweet,
    config,
  });
};
