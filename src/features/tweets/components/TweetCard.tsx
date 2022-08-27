import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  Avatar,
  Card,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  IconButton,
  Link,
  Spacer,
} from '@/components/Elements';
import { useAuth } from '@/features/auth';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { useComposeTweet } from '../stores/composeTweet';
import { useDeleteTweetStore } from '../stores/deleteTweetStore';
import type { Tweet } from '../types';

type Props = {
  data: Tweet;
  reply?: boolean;
  thread?: boolean;
};

export const TweetCard = ({ data, reply = false, thread = false }: Props) => {
  const user = data.user;
  const router = useRouter();
  const { user: authUser } = useAuth();
  const { open: openDeleteTweet } = useDeleteTweetStore();
  const { open: openComposeTweet } = useComposeTweet();

  return (
    <article
      {...(!thread && {
        className: 'anime hover:bg-slate-100 cursor-pointer',
        // TODO
        onClick: () => router.push(`/${user.screenName}/status/${data.id}`),
      })}
    >
      <Card
        className={clsx(thread && 'pb-0')}
        thread={thread}
        thumbnail={
          <>
            <Link href={`/${user.screenName}`}>
              <Avatar src={user?.profileImageUrl} size="lg" />
            </Link>
            {reply && <div className="w-[2px] h-full -mb-3 bg-slate-300" />}
          </>
        }
        header={
          <div className={clsx('min-w-0 flex gap-x-1', thread && 'flex-col')}>
            <span className="font-bold text-slate-900 truncate">
              <Link href={`/${user.screenName}`}>{user.name}</Link>
            </span>

            <div className="min-w-0 flex text-slate-600">
              <span className="truncate">
                <Link
                  href={`/${user.screenName}`}
                >{`@${user.screenName}`}</Link>
              </span>

              {thread || (
                <>
                  <span className="flex-shrink-0 mx-1">･</span>
                  <time className="flex-shrink-0">
                    {formatDate(data.createdAt)}
                  </time>
                </>
              )}
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
        content={
          <>
            <div
              className={clsx(
                'break-words text-slate-900',
                thread && 'mt-3 text-[23px] leading-8',
              )}
            >
              {data.text}
            </div>
            {thread && (
              <div className="my-4">
                <time className="text-slate-600">
                  {formatDate(data.createdAt, true)}
                </time>
              </div>
            )}
          </>
        }
        buttons={
          <>
            {thread && !!data.favoriteCount && (
              <>
                <Spacer thin />
                <div className="px-1 py-4">
                  <Link href={`/${user.screenName}/status/${data.id}/likes`}>
                    <span className=" text-slate-900 font-bold">
                      {formatNumber(data.favoriteCount)}
                    </span>{' '}
                    <span>Likes</span>
                  </Link>
                </div>
              </>
            )}
            <Spacer thin />
            <div
              className={clsx(
                'min-w-0 flex',
                thread
                  ? 'justify-around h-12'
                  : 'justify-between max-w-md mt-3',
              )}
            >
              <span className="flex items-center gap-1">
                <IconButton
                  onClick={() => openComposeTweet({ data })}
                  className="-m-2"
                >
                  <ChatAltIcon />
                </IconButton>
                {thread || data.replyCount}
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
                {thread || data.favoriteCount}
              </span>
              <span className="flex items-center gap-1">
                <IconButton className="-m-2">
                  <UploadIcon />
                </IconButton>
              </span>
            </div>
            {thread && <Spacer thin />}
          </>
        }
      />
    </article>
  );
};
