import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import {
  Avatar,
  Card,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  IconButton,
  Link,
} from '@/components/Elements';
import { useAuth } from '@/features/auth';
import { formatDate } from '@/utils/formatDate';
import { useComposeTweet } from '../stores/composeTweet';
import { useDeleteTweetStore } from '../stores/deleteTweetStore';
import type { Tweet } from '../types';

type Props = {
  data: Tweet;
  reply?: boolean;
};

export const TweetCard = ({ data, reply = false }: Props) => {
  const user = data.user;
  const { user: authUser } = useAuth();
  const { open: openDeleteTweet } = useDeleteTweetStore();
  const { open: openComposeTweet } = useComposeTweet();

  return (
    <Card
      thumbnail={
        <>
          <Link href={`/${user.screenName}`}>
            <Avatar src={user?.profileImageUrl} size="lg" />
          </Link>
          {reply && <div className="w-[2px] h-full -mb-3 bg-slate-300" />}
        </>
      }
      header={
        <div className="min-w-0 flex gap-1">
          <span className="font-bold text-slate-900 truncate">
            <Link href={`/${user.screenName}`}>{user.name}</Link>
          </span>

          <div className="min-w-0 flex ml-1 text-slate-600">
            <span className="truncate">
              <Link href={`/${user.screenName}`}>{`@${user.screenName}`}</Link>
            </span>

            <span className="flex-shrink-0 mx-1">･</span>
            <time className="flex-shrink-0">{formatDate(data.createdAt)}</time>
          </div>
        </div>
      }
      icon={
        <DropdownMenu
          trigger={
            <IconButton className="-m-2 ml-3">
              <DotsHorizontalIcon />
            </IconButton>
          }
          animationType="slideIn"
        >
          <DropdownMenuGroup className="w-[300px]">
            {user.id === authUser?.id && (
              <DropdownMenuItem
                asChild
                className="flex items-center gap-3 w-full h-[52px] p-4 text-red-500"
              >
                <button onClick={() => openDeleteTweet({ tweetId: data.id })}>
                  <TrashIcon className="flex-shrink-0 w-5 h-5" />
                  Delete
                  <div className="flex-grow" />
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenu>
      }
      content={<div className="break-words text-slate-900">{data.text}</div>}
      buttons={
        <div className="min-w-0 flex justify-between max-w-md">
          <span className="flex items-center gap-1">
            <IconButton
              onClick={() => openComposeTweet({ data })}
              className="-m-2"
            >
              <ChatAltIcon />
            </IconButton>
            {data.replyCount}
          </span>
          <span className="flex items-center gap-1">
            <IconButton variant="success" className="-m-2">
              <SwitchHorizontalIcon />
            </IconButton>
            {/* retweetCount */}
          </span>
          <span className="flex items-center gap-1">
            <IconButton variant="danger" className="-m-2">
              <HeartIcon />
            </IconButton>
            {data.favoriteCount}
          </span>
          <span className="flex items-center gap-1">
            <IconButton className="-m-2">
              <UploadIcon />
            </IconButton>
          </span>
        </div>
      }
    />
  );
};
