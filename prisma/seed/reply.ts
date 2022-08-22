import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { loop } from './utils/loop';
import { sample } from './utils/sample';

const prisma = new PrismaClient();

export const reply = async () => {
  const userIds = (await prisma.user.findMany())!.map((user) => user.id);
  const tweetIds = (await prisma.tweet.findMany())!.map((tweet) => tweet.id);

  await Promise.allSettled(
    loop().map(async () => {
      await Promise.allSettled(
        userIds.map(async (userId) => {
          const tweetId = sample(tweetIds) as string;

          const tweet = await prisma.tweet.create({
            data: {
              userId,
              text: faker.lorem.sentences(),
              tweetId,
              createdAt: faker.date.past(),
            },
          });

          tweetIds.push(tweet.id);
        }),
      );
    }),
  );
};
