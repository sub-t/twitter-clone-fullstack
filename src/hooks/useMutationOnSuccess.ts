import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationStore } from '@/stores/notifications';
import type {
  MutationKey,
  MutationFunction,
  UseMutationOptions,
} from '@tanstack/react-query';

export const useMutationOnSuccess = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>({
  mutationKey,
  mutationFn,
  config,
}: {
  mutationKey: MutationKey;
  mutationFn: MutationFunction<TData, TVariables>;
  config?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'onSuccess'
  > & {
    onSuccess?: () => void;
    successMessage?: string;
  };
}) => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(mutationKey);
      config?.successMessage &&
        addNotification({
          title: config.successMessage,
        });
      config?.onSuccess?.();
    },
    mutationFn,
  });
};
