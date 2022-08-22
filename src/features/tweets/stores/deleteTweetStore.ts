import create from 'zustand';

type Config = {
  tweetId: string;
};

type DeleteTweetStore = {
  isOpen: boolean;
  config?: Config;
  open: (config?: Config) => void;
  close: () => void;
};

export const useDeleteTweetStore = create<DeleteTweetStore>((set) => ({
  isOpen: false,
  open: (config) => {
    set(() => ({ config, isOpen: true }));
  },
  close: () => {
    set(() => ({ config: undefined, isOpen: false }));
  },
}));
