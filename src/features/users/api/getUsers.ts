import { apiClient } from '@/lib/axios';
import type { User } from '../types';

export const getUsers = (): Promise<User[]> => {
  return apiClient.get('/users');
};
