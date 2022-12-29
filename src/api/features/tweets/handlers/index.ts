import { NextApiHandler } from 'next';
import { prisma } from '@/api/lib/prisma';
import { withSessionRoute } from '@/api/lib/session';
import { rejectInvalidRequest } from '@/api/middlewares/rejectInvalidRequest';
import { getTWeetResponse } from '../utils/getTweetResponse';
import { sortByCreatedAt } from '../utils/sortByCreatedAt';

const getTweetFn: NextApiHandler = async (req, res) => {
  try {
    const authUserId = req.session.user?.id;
    const id = req.query.id as string;

    const tweet = await prisma.tweet.findUnique({
      where: { id },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
            replies: true,
            favorites: true,
          },
        },
        favorites: true,
      },
    });

    if (!tweet) {
      return res.status(404).json({ message: "This tweet doesn't exist" });
    }

    const tweetResponse = getTWeetResponse(tweet, authUserId);
    const replies = tweet.replies.map((reply) =>
      getTWeetResponse(reply, authUserId),
    );

    return res.status(200).json({ tweet: tweetResponse, replies });
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getTweetsByUserFn: NextApiHandler = async (req, res) => {
  try {
    const authUserId = req.session.user?.id;
    const screenName = req.query.screenName as string;

    const user = await prisma.user.findUnique({
      where: { screenName },
      include: {
        tweets: {
          where: {
            tweetId: null,
          },
          include: {
            user: true,
            replies: true,
            favorites: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw Error("This user doesn't exist");
    }

    const tweets = user.tweets.map((tweet) =>
      getTWeetResponse(tweet, authUserId),
    );
    return res.status(200).json(tweets);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getTweetsByUserWithRepliesFn: NextApiHandler = async (req, res) => {
  try {
    const authUserId = req.session.user?.id;
    const screenName = req.query.screenName as string;

    const user = await prisma.user.findUnique({
      where: { screenName },
      include: {
        tweets: {
          include: {
            user: true,
            replies: true,
            favorites: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw Error("This user doesn't exist");
    }

    const tweetsResponse = user.tweets.map((tweet) =>
      getTWeetResponse(tweet, authUserId),
    );
    return res.status(200).json(tweetsResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getTimelineFn: NextApiHandler = async (req, res) => {
  rejectInvalidRequest(req, res);

  try {
    const authUserId = req.session.user!.id;

    const tweets = await prisma.tweet.findMany({
      where: {
        OR: [
          { userId: authUserId },
          {
            user: {
              followers: {
                some: {
                  fromId: authUserId,
                },
              },
            },
          },
        ],
      },
      include: {
        user: true,
        favorites: true,
        tweet: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const tweetsResponse = tweets.map((tweet) =>
      getTWeetResponse(tweet, authUserId),
    );
    return res.status(200).json(tweetsResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const createTweetFn: NextApiHandler = async (req, res) => {
  rejectInvalidRequest(req, res);

  try {
    const authUserId = req.session.user!.id;
    const { text, inReplyToStatusId } = req.body;

    const tweet = await prisma.tweet.create({
      data: {
        text,
        tweetId: inReplyToStatusId,
        userId: authUserId,
      },
      include: {
        user: true,
      },
    });

    const tweetResponse = getTWeetResponse(tweet, authUserId);

    return res.status(201).json(tweetResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const deleteTweetFn: NextApiHandler = async (req, res) => {
  rejectInvalidRequest(req, res);

  try {
    const authUserId = req.session.user!.id;
    const id = req.query.id as string;

    const tweet = await prisma.tweet.delete({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    const tweetResponse = getTWeetResponse(tweet, authUserId);

    return res.status(201).json(tweetResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getTweet = withSessionRoute(getTweetFn);
export const getTweetsByUser = withSessionRoute(getTweetsByUserFn);
export const getTweetsByUserWithReplies = withSessionRoute(
  getTweetsByUserWithRepliesFn,
);
export const getTimeline = withSessionRoute(getTimelineFn);
export const createTweet = withSessionRoute(createTweetFn);
export const deleteTweet = withSessionRoute(deleteTweetFn);
