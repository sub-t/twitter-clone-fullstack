import {
  BellIcon,
  CalendarIcon,
  DotsHorizontalIcon,
  LinkIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import { Avatar, FallbackImage, IconButton, Link } from '@/components/Elements';
import { useAuth } from '@/features/auth';
import { Follow, Unfollow } from '@/features/follows';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { EditProfile } from './EditProfile';
import type { User } from '../types';

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  const { user: authUser } = useAuth();

  return (
    <div className="bg-white">
      <FallbackImage
        src={user.profileBannerUrl}
        alt="profile banner"
        className="relative w-full pb-[33.3333%]"
      />

      <div className="px-4 pt-3 mb-4">
        <div className="flex justify-between h-20">
          <div className="w-1/4 min-w-[48px] -mt-[15%] mb-12">
            <Avatar
              src={user.profileImageUrl}
              size="full"
              className="box-content pb-[100%] border-4 border-white"
            />
          </div>
          {authUser?.id === user.id ? (
            <EditProfile />
          ) : (
            <div className="flex items-start gap-3">
              <IconButton variant="outline">
                <DotsHorizontalIcon />
              </IconButton>
              <IconButton variant="outline">
                <BellIcon />
              </IconButton>
              {user.followed ? (
                <Unfollow data={{ id: user.id, screenName: user.screenName }} />
              ) : (
                <Follow data={{ id: user.id, screenName: user.screenName }} />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-slate-800 dark:text-white text-xl font-extrabold break-words">
              {user.name}
            </div>
            <div className="text-slate-500">{`@${user.screenName}`}</div>
          </div>
          {user.description && (
            <div className="text-slate-700">{user.description}</div>
          )}
          <div className="flex flex-wrap items-center gap-3 text-slate-500">
            {user.location && (
              <span className="flex gap-1">
                <LocationMarkerIcon className="w-5 h-5" />
                <span>{user.location}</span>
              </span>
            )}
            {user.url && (
              <span className="flex gap-1">
                <LinkIcon className="w-5 h-5" />
                <a href={user.url} className="text-sky-500">
                  {new URL(user.url).hostname}
                </a>
              </span>
            )}
            <span className="flex gap-1">
              <CalendarIcon className="w-5 h-5" />
              <span>Joined {formatDate(user.createdAt)}</span>
            </span>
          </div>
          <div className="flex gap-3 text-slate-500">
            {/* TODO */}
            <Link href={`/${user.screenName}/following`} className="flex">
              <span className="text-slate-900 font-bold">
                {formatNumber(user.friendsCount)}
              </span>
              <span>Following</span>
            </Link>
            <Link href={`/${user.screenName}/followers`} className="flex">
              <span className=" text-slate-900 font-bold">
                {formatNumber(user.followersCount)}
              </span>
              <span>Followers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
