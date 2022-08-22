import { Spinner } from '@/components/Elements';

type Props = {
  message?: string;
};

export const Loading = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <Spinner />
      <span className="font-bold text-slate-600">{message}</span>
    </div>
  );
};
