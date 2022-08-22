import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteTweet } from '@/api';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.DELETE:
      return deleteTweet(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.DELETE]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
