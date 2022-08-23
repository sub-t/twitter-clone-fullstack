import {
  BellIcon,
  CalendarIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';
import { Avatar, FallbackImage, IconButton } from '@/components/Elements';
import { useAuth } from '@/features/auth';
import { Follow, Unfollow } from '@/features/follows';
import { formatDate } from '@/utils/formatDate';
import { EditProfile } from './EditProfile';
import type { User } from '../types';

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  const { user: authUser } = useAuth();
  const { id, name, screenName, description, createdAt, followed } = user;

  return (
    <div className="bg-white">
      <FallbackImage
        src={user.profileBannerUrl}
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
          {authUser?.id === id ? (
            <EditProfile />
          ) : (
            <div className="flex items-start gap-3">
              <IconButton variant="outline">
                <DotsHorizontalIcon />
              </IconButton>
              <IconButton variant="outline">
                <BellIcon />
              </IconButton>
              {followed ? (
                <Unfollow data={{ id, screenName }} />
              ) : (
                <Follow data={{ id, screenName }} />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-slate-800 dark:text-white text-xl font-extrabold break-words">
              {name}
            </div>
            <div className="text-slate-500">{`@${screenName}`}</div>
          </div>
          {description && <div className="text-slate-700">{description}</div>}
          <div className="flex items-center gap-1 text-slate-500">
            <CalendarIcon className="w-5 h-5" />
            <span>Joined {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
