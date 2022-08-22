import { useRouter } from 'next/router';
import { Button } from '@/components/Elements';
import { useAuth } from '@/features/auth';

export const Landing = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          <span className="block">Twitter Clone App</span>
          <span className="block text-2xl sm:text-3xl">with</span>
          <span className="block">Next.js &amp; Tailwind CSS</span>
        </h2>

        <div className="mt-8 flex justify-center">
          <Button size="lg" variant="secondary" onClick={handleStart} className="w-3/5">
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};
