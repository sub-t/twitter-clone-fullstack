import { PrismaClient } from '@prisma/client';
import { loop } from './utils/loop';
import { sample } from './utils/sample';

const prisma = new PrismaClient();

export const follows = async () => {
  const userIds = (await prisma.user.findMany())!.map((user) => user.id);

  await Promise.allSettled(
    loop().map(async () => {
      await Promise.allSettled(
        userIds.map(async (followerId) => {
          const friendId = sample(userIds) as string;

          const follows = await prisma.follows.findFirst({
            where: {
              fromId: followerId,
              toId: friendId,
            },
          });

          if (follows || followerId === friendId) {
            return;
          }

          await prisma.follows.create({
            data: {
              fromId: followerId,
              toId: friendId,
            },
          });
        }),
      );
    }),
  );
};
