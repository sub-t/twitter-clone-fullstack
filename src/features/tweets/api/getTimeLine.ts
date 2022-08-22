import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import type { Tweet } from '../types';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getTimeline = (): Promise<Tweet[]> => {
  return apiClient.get('/timeline');
};

type QueryFnType = typeof getTimeline;

type UseTimelineOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTimeline = ({ config }: UseTimelineOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['timeline'],
    queryFn: () => getTimeline(),
  });
};
