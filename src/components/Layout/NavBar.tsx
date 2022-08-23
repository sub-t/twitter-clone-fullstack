import {
  BellIcon,
  BookmarkIcon,
  CheckIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/solid';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { SiTwitter } from 'react-icons/si';
import { useComposeTweet } from '@/features/tweets/stores/composeTweet';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import {
  Avatar,
  Button,
  Card,
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
];

type Props = {
  user?: User;
};

export const NavBar = ({ user }: Props) => {
  const { open } = useComposeTweet();
  const xl2 = useBreakpoint('2xl');
  const sm = useBreakpoint('sm');

  return (
    <div className="overflow-y-auto flex flex-col justify-between items-center 2xl:items-start w-full h-screen sm:px-3">
      <div className="flex flex-col items-center 2xl:items-startw-full">
        <div className="flex justify-center items-center w-[56px] h-[56px]">
          <Link
            href="/home"
            className="flex justify-center items-center w-[52px] h-[52px] rounded-full anime hover:bg-sky-50"
          >
            <SiTwitter className="w-7 h-7 text-sky-500" />
          </Link>
        </div>
        {list
          .filter(
            ({ title }) => sm || !(title === 'Bookmarks' || title === 'Lists'),
          )
          .map(({ icon, title }) => (
            <Link
              key={title}
              href={`${title.toLowerCase()}`}
              className={clsx(
                'flex p-3 rounded-full anime hover:bg-slate-200',
                xl2 && 'w-full',
              )}
            >
              <Slot className="w-7 h-7">{icon}</Slot>
              {xl2 && (
                <span className="pl-5 pr-4 text-xl font-normal">{title}</span>
              )}
            </Link>
          ))}
        {/* TODO */}
        <Button variant="inverse" size="lg" className="w-full">
          <DotsCircleHorizontalIcon className="w-7 h-7" />
          {xl2 && <span className="pl-5 pr-4 text-xl font-normal">More</span>}
          <div className="flex-grow" />
        </Button>
        <Slot onClick={() => open()} className="my-1">
          {xl2 ? (
            <Button size="lg" className={xl2 && 'w-[90%]'}>
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
              <button className="w-full">
                <Card
                  className="rounded-full anime hover:bg-slate-100"
                  thumbnail={<Avatar src={user?.profileImageUrl} />}
                  header={
                    <>
                      <span className="h-5 text-slate-900 font-bold truncate">
                        {user?.name}
                      </span>
                      <span className="h-5 text-start font-normal text-slate-600 truncate">
                        @{user?.screenName}
                      </span>
                    </>
                  }
                  icon={
                    <DotsHorizontalIcon className="flex-shrink-0 w-5 h-5" />
                  }
                />
              </button>
            ) : (
              <button className="p-3 anime hover:bg-slate-100 rounded-full">
                <Avatar src={user?.profileImageUrl} />
              </button>
            )
          }
        >
          <DropdownMenuGroup className="w-[300px] py-3">
            <Card
              thumbnail={<Avatar src={user?.profileImageUrl} />}
              header={
                <>
                  <span className="h-5 text-slate-900 font-bold truncate">
                    {user?.name}
                  </span>
                  <span className="h-5 text-start font-normal text-slate-600 truncate">
                    @{user?.screenName}
                  </span>
                </>
              }
              icon={
                <CheckIcon className="flex-shrink-0 w-5 h-5 text-sky-500" />
              }
            />
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
