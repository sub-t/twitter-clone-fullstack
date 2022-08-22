import type { User } from '@/features/users';
import type { Tweet as BETweet } from '@prisma/client';

export type Tweet = Omit<BETweet, 'tweetId'> & {
  user: User;
  inReplyToStatusId: string | null;
  replyCount: number;
  favoriteCount: number;
};

export type GetTweetDTO = {
  tweetId: string;
};

export type GetTweetsDTO = {
  userId: string;
  withReplies?: boolean;
};

export type CreateTweetDTO = {
  data: Pick<Tweet, 'text' | 'inReplyToStatusId'>;
};

export type DeleteTweetDTO = {
  tweetId: string;
};
