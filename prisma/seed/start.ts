import { PrismaClient } from '@prisma/client';
import { favorite } from './favorite';
import { follows } from './follows';
import { reply } from './reply';
import { user } from './user';

export const prisma = new PrismaClient();

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.tweet.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.user.deleteMany();

  await user();
  await reply();
  await favorite();
  await follows();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
