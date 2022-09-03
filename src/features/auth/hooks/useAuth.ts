import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { User } from '@/features/users';
import { useMutationOnSuccess } from '@/hooks/useMutationOnSuccess';
import { apiClient } from '@/lib/axios';
import { LoginCredentialsDTO, RegisterCredentialsDTO } from '../types';

const getMe = async (): Promise<User | any> => {
  try {
    return (await apiClient.get('/auth/getMe')) as User;
  } catch (error) {
    await logout();
  }
};

const login = async (data: LoginCredentialsDTO): Promise<User> => {
  return await apiClient.post('/auth/login', data);
};

const logout = async () => {
  await apiClient.post('/auth/logout', {});
  window.location.assign(window.location.origin as unknown as string);
};

const register = async (data: RegisterCredentialsDTO): Promise<User> => {
  return await apiClient.post('/auth/register', data);
};

const key = ['auth-user'];

export const useAuth = () => {
  const router = useRouter();
  const {
    data: user,
    error,
    refetch,
    isLoading,
    isError,
  } = useQuery<User, Error>({
    queryKey: key,
    queryFn: getMe,
    onError: () => router.replace('/'),
  });

  const loginMutation = useMutationOnSuccess({
    mutationKey: key,
    mutationFn: login,
  });

  const registerMutation = useMutationOnSuccess({
    mutationKey: key,
    mutationFn: register,
  });

  const logoutMutation = useMutationOnSuccess({
    mutationKey: key,
    mutationFn: logout,
  });

  const value = React.useMemo(
    () => ({
      user,
      error,
      refetchUser: refetch,
      login: loginMutation.mutateAsync,
      isLoggingIn: loginMutation.isLoading,
      logout: logoutMutation.mutateAsync,
      isLoggingOut: logoutMutation.isLoading,
      register: registerMutation.mutateAsync,
      isRegistering: registerMutation.isLoading,
      isLoading,
      isError,
    }),
    [
      user,
      error,
      refetch,
      loginMutation.mutateAsync,
      loginMutation.isLoading,
      logoutMutation.mutateAsync,
      logoutMutation.isLoading,
      registerMutation.mutateAsync,
      registerMutation.isLoading,
      isLoading,
      isError,
    ],
  );

  return value;
};
