import {
  BellIcon,
  BookmarkIcon,
  CheckIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  KeyIcon,
  MailIcon,
  UserIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/solid';
import { Slot } from '@radix-ui/react-slot';
import Image from 'next/image';
import { useComposeTweet } from '@/features/tweets/stores/composeTweet';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import {
  Button,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  IconButton,
  Link,
  Spacer,
} from '../Elements';
import type { User } from '@/features/users';

const list = [
  { icon: <HomeIcon />, title: 'Home' },
  { icon: <HashtagIcon />, title: 'Explore' },
  { icon: <BellIcon />, title: 'Notifications' },
  { icon: <MailIcon />, title: 'Messages' },
  { icon: <BookmarkIcon />, title: 'Bookmarks' },
  { icon: <ViewListIcon />, title: 'Lists' },
  { icon: <UserIcon />, title: 'Profile' },
  { icon: <DotsCircleHorizontalIcon />, title: 'More' },
];

type Props = {
  user?: User;
};

export const NavBar = ({ user }: Props) => {
  const { open } = useComposeTweet();
  const xl2 = useBreakpoint('2xl');
  const sm = useBreakpoint('sm');

  return (
    <div className="overflow-y-auto flex flex-col justify-between items-center 2xl:items-start w-full h-screen px-2">
      <div className="flex flex-col items-center 2xl:items-start gap-2 ">
        <IconButton size="lg" variant="primary">
          <KeyIcon />
        </IconButton>
        {list
          .filter(
            ({ title }) => sm || !(title === 'Bookmarks' || title === 'Lists'),
          )
          .map(({ icon, title }) =>
            xl2 ? (
              <Button key={title} variant="inverse" size="lg" className="gap-4">
                <Slot className="w-7 h-7">{icon}</Slot> {title}
              </Button>
            ) : (
              <IconButton key={title} variant="inverse" size="md">
                {icon}
              </IconButton>
            ),
          )}
        <Slot onClick={() => open()}>
          {xl2 ? (
            <Button size="lg" className="w-[90%]">
              Tweet
            </Button>
          ) : (
            <IconButton size="lg" variant="secondary">
              <PencilIcon />
            </IconButton>
          )}
        </Slot>
      </div>
      <div className="flex justify-center w-full my-3">
        <DropdownMenu
          trigger={
            xl2 ? (
              <Button variant="inverse" size="lg" className="w-full">
                <div className="mr-3">
                  <div className="overflow-hidden relative w-10 h-10 rounded-full bg-slate-50">
                    {user?.profileImageUrl && (
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={user.profileImageUrl}
                        alt="avatar"
                      />
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex justify-between items-center w-full">
                  <div className="min-w-0 flex-shrink flex flex-col text-sm">
                    <span className="text-slate-900 font-bold truncate">
                      {user?.name}
                    </span>
                    <span className="text-start font-normal text-slate-600 truncate">
                      @{user?.screenName}
                    </span>
                  </div>

                  <div className="ml-3">
                    <DotsHorizontalIcon className="flex-shrink-0 w-5 h-5" />
                  </div>
                </div>
              </Button>
            ) : (
              <button className="p-3 anime hover:bg-slate-100 rounded-full">
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
              </button>
            )
          }
        >
          <DropdownMenuGroup className="w-[300px] py-3">
            <div className="flex items-center w-full h-[84px] p-4">
              <div className="mr-3">
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
              </div>
              <div className="min-w-0 flex justify-between w-full">
                <div className="min-w-0 flex-shrink flex flex-col text-sm">
                  <span className="text-slate-900 font-bold truncate">
                    {user?.name}
                  </span>
                  <span className="text-start font-normal text-slate-600 truncate">
                    @{user?.screenName}
                  </span>
                </div>

                <div className="ml-3">
                  <CheckIcon className="flex-shrink-0 w-5 h-5 text-sky-500" />
                </div>
              </div>
            </div>
            <Spacer thin />
            <DropdownMenuItem asChild>
              <Link href="/i/flow/login">
                <span className="block w-full h-[52px] p-4 text-slate-900 anime hover:bg-slate-100">
                  Add an existing account
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/logout">
                <span className="block w-full h-[52px] p-4 text-slate-900 anime hover:bg-slate-100 truncate">
                  Log out @{user?.screenName}
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </div>
    </div>
  );
};
