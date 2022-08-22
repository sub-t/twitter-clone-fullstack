import type { User } from '@prisma/client';

export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};
