import { Favorite, Tweet } from '@prisma/client';
import { Tweet as FETweet } from '@/features/tweets';
import { UserWithEntities } from '../../users';
import { getUserResponse } from '../../users/utils/getUserResponse';

export const getTWeetResponse = (
  tweet: Tweet & {
    user: UserWithEntities;
    favorites?: Favorite[];
    replies?: Tweet[];
  },
  authUserId = '',
): FETweet => {
  const { favorites, replies, tweetId, user, ...others } = tweet;

  return {
    ...others,
    user: getUserResponse(user, authUserId),
    inReplyToStatusId: tweetId,
    favoriteCount: favorites?.length ?? 0,
    replyCount: replies?.length ?? 0,
  };
};
