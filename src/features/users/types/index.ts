import type { User as BEUser } from '@prisma/client';

export type User = Omit<BEUser, 'password'> & {
  followersCount: number;
  friendsCount: number;
  favoritesCount: number;
  followed: boolean;
};

export type GetUserDTO = {
  screenName: string;
};

export type UpdateProfileDTO = {
  data: Pick<User, 'name' | 'description' | 'location' | 'url'>;
};
