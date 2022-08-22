import type { UserWithEntities } from '../types';
import type { User as FEUser } from '@/features/users';

export const getUserResponse = (
  user: UserWithEntities,
  authUserId = '',
): FEUser => {
  const { favorites, followers, friends, ...others } = user;

  return {
    ...others,
    favoritesCount: favorites?.length ?? 0,
    followersCount: followers?.length ?? 0,
    friendsCount: friends?.length ?? 0,
    followed: !!followers
      ?.map((follower) => follower.fromId)
      .includes(authUserId),
  };
};
