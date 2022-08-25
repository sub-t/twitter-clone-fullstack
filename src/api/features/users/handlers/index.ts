import type { NextApiHandler } from 'next';
import { prisma } from '@/api/lib/prisma';
import { withSessionRoute } from '@/api/lib/session';
import { getUserResponse } from '../utils/getUserResponse';

const getUsersFn: NextApiHandler = async (req, res) => {
  try {
    const authUserId = req.session.user?.id;
    const screenName = req.query.screenName as string;

    if (screenName) {
      const user = await prisma.user.findUnique({
        where: {
          screenName,
        },
        include: {
          followers: true,
          friends: true,
          favorites: true,
        },
      });

      if (!user) {
        throw Error("This user doesn't exits");
      }

      const userResponse = getUserResponse(user, authUserId);

      return res.status(200).json(userResponse);
    }

    const users = await prisma.user.findMany({
      include: {
        tweets: true,
      },
    });

    const usersResponse = users.map((user) => ({
      screenName: user.screenName,
      tweetIds: user.tweets.map((tweet) => tweet.id),
    }));

    return res.status(200).json(usersResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserFn: NextApiHandler = async (req, res) => {
  const id = req.session.user?.id as string;
  const data = req.body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      include: {
        followers: true,
        friends: true,
        favorites: true,
      },
    });

    const userResponse = getUserResponse(user);

    return res.status(200).json(userResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getUsers = withSessionRoute(getUsersFn);
export const updateUser = withSessionRoute(updateUserFn);
