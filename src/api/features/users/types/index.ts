import { Favorite, Follows, User } from '@prisma/client';

export type UserWithEntities = User & {
  favorites?: Favorite[];
  followers?: Follows[];
  friends?: Follows[];
};
