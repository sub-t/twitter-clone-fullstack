import { PrismaClient } from '@prisma/client';
import { loop } from './utils/loop';
import { sample } from './utils/sample';

const prisma = new PrismaClient();

export const favorite = async () => {
  const userIds = (await prisma.user.findMany())!.map((user) => user.id);
  const tweetIds = (await prisma.tweet.findMany())!.map((tweet) => tweet.id);

  await Promise.allSettled(
    loop().map(async () => {
      await Promise.allSettled(
        userIds.map(async (userId) => {
          const tweetId = sample(tweetIds) as string;

          const favorite = await prisma.favorite.findFirst({
            where: {
              userId,
              tweetId,
            },
          });

          if (favorite) {
            return;
          }

          await prisma.favorite.create({
            data: {
              userId,
              tweetId,
            },
          });
        }),
      );
    }),
  );
};
