import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout, RegisterForm } from '@/features/auth/components';

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="Register your account">
      <RegisterForm onSuccess={() => router.push('/home')} />
    </Layout>
  );
};

export default Page;
