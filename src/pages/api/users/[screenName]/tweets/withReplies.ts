import { NextApiRequest, NextApiResponse } from 'next';
import { getTweetsByUserWithReplies } from '@/api';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.GET:
      return getTweetsByUserWithReplies(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
