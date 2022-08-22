import type { NextApiHandler } from 'next';
import { prisma } from '@/api/lib/prisma';
import { withSessionRoute } from '@/api/lib/session';
import { rejectInvalidRequest } from '@/api/middlewares/rejectInvalidRequest';

const createFollowsFn: NextApiHandler = async (req, res) => {
  rejectInvalidRequest(req, res);

  try {
    const authUserId = req.session.user!.id;
    const friendId = req.query.friendId as string;

    await prisma.follows.create({
      data: {
        fromId: authUserId,
        toId: friendId,
      },
    });

    return res.status(204).end();
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const deleteFollowsFn: NextApiHandler = async (req, res) => {
  rejectInvalidRequest(req, res);

  try {
    const authUserId = req.session.user!.id;
    const friendId = req.query.friendId as string;

    await prisma.follows.delete({
      where: {
        fromId_toId: {
          fromId: authUserId,
          toId: friendId,
        },
      },
    });

    return res.status(204).end();
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const createFollows = withSessionRoute(createFollowsFn);
export const deleteFollows = withSessionRoute(deleteFollowsFn);
