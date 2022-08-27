import { NextSeo } from 'next-seo';
import type { User } from '../types';

type Props = {
  data: Pick<User, 'name' | 'screenName'>;
};

export const UserSeo = ({ data }: Props) => {
  const title = data.name + ` (@${data.screenName})`;
  return <NextSeo title={title} />;
};
