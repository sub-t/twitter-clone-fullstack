import { AnimatePresence, motion } from 'framer-motion';
import { Spacer } from '@/components/Elements';
import { Tweet } from '../types';
import { TweetCard } from './TweetCard';

type Props = {
  data: Tweet[];
};

export const Tweets = ({ data }: Props) => {
  return (
    <AnimatePresence initial={false}>
      {data &&
        data.map((tweet, index) => (
          <motion.div
            key={tweet.id || index}
            layout
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <TweetCard data={tweet} />
            <Spacer thin />
          </motion.div>
        ))}
    </AnimatePresence>
  );
};
