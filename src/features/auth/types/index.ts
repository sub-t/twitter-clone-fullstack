import { User } from '@/features/users';

export type LoginCredentialsDTO = Pick<User, 'email'> & {
  password: string;
};

export type RegisterCredentialsDTO = Pick<
  User,
  'email' | 'name' | 'screenName'
> & {
  password: string;
};
