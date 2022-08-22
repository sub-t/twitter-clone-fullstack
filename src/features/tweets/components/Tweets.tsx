import { AnimatePresence, motion } from 'framer-motion';
import { Spacer } from '@/components/Elements';
import { Card } from './Card';
import type { Tweet } from '../types';

type Props = {
  data: Tweet[];
};

export const Tweets = ({ data }: Props) => {
  return (
    <AnimatePresence>
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
            <Card data={tweet} />
            <Spacer thin />
          </motion.div>
        ))}
    </AnimatePresence>
  );
};
