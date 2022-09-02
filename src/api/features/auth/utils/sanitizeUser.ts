import type { User } from '@prisma/client';

export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};
