import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import Image from 'next/image';
import {
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

export const Card = ({ data, reply = false }: Props) => {
  const user = data.user;
  const { user: authUser } = useAuth();
  const { open: openDeleteTweet } = useDeleteTweetStore();
  const { open: openComposeTweet } = useComposeTweet();

  return (
    <article
      className={clsx(
        'px-4 py-3 cursor-pointer bg-white anime hover:bg-slate-50',
      )}
    >
      <div className="min-w-0 flex">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 w-12 mr-3">
          <Link href={`/${user.screenName}`}>
            <div className="overflow-hidden relative w-12 h-12 rounded-full bg-slate-50">
              {user?.profileImageUrl && (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={user.profileImageUrl}
                  alt="avatar"
                />
              )}
            </div>
          </Link>
          {reply && <div className="w-[2px] h-full -mb-3 bg-slate-300" />}
        </div>

        <div className="min-w-0 w-full space-y-3">
          <div className="min-w-0 flex justify-between">
            <div className="min-w-0 flex gap-1">
              <span className="font-bold text-slate-900 truncate">
                <Link href={`/${user.screenName}`}>{user.name}</Link>
              </span>

              <div className="min-w-0 flex ml-1 text-slate-600">
                <span className="truncate">
                  <Link
                    href={`/${user.screenName}`}
                  >{`@${user.screenName}`}</Link>
                </span>

                <span className="flex-shrink-0 mx-1">･</span>
                <time className="flex-shrink-0">
                  {formatDate(data.createdAt)}
                </time>
              </div>
            </div>

            <div>
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
                      <button
                        onClick={() => openDeleteTweet({ tweetId: data.id })}
                      >
                        <TrashIcon className="flex-shrink-0 w-5 h-5" />
                        Delete
                        <div className="flex-grow" />
                      </button>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenu>
            </div>
          </div>

          <div className="break-words text-slate-900">{data.text}</div>

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
        </div>
      </div>
    </article>
  );
};
