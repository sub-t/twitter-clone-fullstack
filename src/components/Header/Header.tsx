type Props = {
  undo?: React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
};

export const Header = ({ undo, title, action }: Props) => {
  return (
    <div className="z-10 top-0 sticky flex items-center w-full h-[53px] px-4 bg-white/90 backdrop-blur-md">
      {undo && (
        <div className="flex items-center h-14 w-14">
          <span className="-ml-2">{undo}</span>
        </div>
      )}
      {title && (
        <h2 className="min-w-0 flex-shrink flex-grow text-xl font-bold text-slate-900 truncate">{title}</h2>
      )}
      {action && (
        <div className="flex justify-end items-center h-14 w-14">{action}</div>
      )}
    </div>
  );
};
