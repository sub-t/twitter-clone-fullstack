import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Spacer } from '@/components/Elements';
import { TweetCard } from './TweetCard';
import type { Tweet } from '../types';

type Props = {
  data: Tweet[];
};

export const Tweets = ({ data }: Props) => {
  const router = useRouter();

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
            <div
              className="anime hover:bg-slate-100 cursor-pointer"
              onClick={() =>
                router.push(`/${tweet.user.screenName}/status/${tweet.id}`)
              }
            >
              <TweetCard data={tweet} />
            </div>
            <Spacer thin />
          </motion.div>
        ))}
    </AnimatePresence>
  );
};
