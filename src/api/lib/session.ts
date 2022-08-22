import type { NextApiHandler } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { cookieName } from '../config';
import type { IronSessionOptions } from 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: { id: string };
  }
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
