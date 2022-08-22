import { NextSeo } from 'next-seo';
import type { User } from '../types';

type Props = {
  user: User;
};

export const UserSeo = ({ user }: Props) => {
  const { name, id } = user;
  const title = name + ` (@${id})`;
  return <NextSeo title={title} />;
};
