import clsx from 'clsx';

type Props = {
  thin?: boolean;
};

export const Spacer = ({ thin = false }: Props) => {
  return (
    <div className={clsx('w-full h-[1px] bg-slate-200', thin || 'my-1')} />
  );
};
