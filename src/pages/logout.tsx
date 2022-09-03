import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AlertDialog } from '@/components/Elements';
import { useAuth } from '@/features/auth';
import { Loading } from '@/features/misc';

const Page: NextPage = () => {
  const router = useRouter();
  const { logout, user } = useAuth();

  if (!user) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading message="Logging out" />
      </div>
    );
  }

  return (
    <AlertDialog
      isOpen={true}
      close={router.back}
      action={logout}
      actionText="Log out"
      actionVariant="secondary"
      title="Log out of Twitter?"
      body="You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. "
    />
  );
};

export default Page;
