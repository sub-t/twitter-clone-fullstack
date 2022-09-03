import { Tweet as BETweet } from '@prisma/client';
import { User } from '@/features/users';

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
  screenName: string;
  withReplies?: boolean;
};

export type CreateTweetDTO = {
  data: Pick<Tweet, 'text' | 'inReplyToStatusId'>;
};

export type DeleteTweetDTO = {
  tweetId: string;
};
