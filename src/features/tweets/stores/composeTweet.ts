import create from 'zustand';
import { Tweet } from '../types';

type Config = {
  data: Tweet;
};

type ComposeTweetStore = {
  isOpen: boolean;
  config?: Config;
  open: (config?: Config) => void;
  close: () => void;
};

export const useComposeTweet = create<ComposeTweetStore>((set) => ({
  isOpen: false,
  open: (config) => {
    set(() => ({ config, isOpen: true }));
  },
  close: () => {
    set(() => ({ config: undefined, isOpen: false }));
  },
}));
