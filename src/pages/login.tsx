import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout, LoginForm } from '@/features/auth/components';

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => router.push('/home')} />
    </Layout>
  );
};

export default Page;
