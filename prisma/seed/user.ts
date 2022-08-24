import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { loop } from './utils/loop';
import { hashPassword } from './utils/password';

const prisma = new PrismaClient();

export const user = async () => {
  const password = await hashPassword('password');

  await Promise.all(
    loop(20).map(
      async () =>
        await prisma.user.create({
          data: {
            email: faker.internet.email(),
            name: faker.name.fullName(),
            screenName: faker.internet.userName(),
            location: faker.address.country(),
            url: faker.internet.url(),
            password,
            description: faker.lorem.paragraph(),
            profileBannerUrl: faker.image.imageUrl(
              undefined,
              undefined,
              undefined,
              true,
            ),
            profileImageUrl: faker.image.avatar(),
            createdAt: faker.date.past(),
            tweets: {
              create: loop().map(() => ({
                text: faker.lorem.sentences(),
                createdAt: faker.date.past(),
              })),
            },
          },
        }),
    ),
  );
};
