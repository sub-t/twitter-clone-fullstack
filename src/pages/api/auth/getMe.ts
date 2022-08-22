import type { NextApiRequest, NextApiResponse } from 'next';
import { getMe } from '@/api';
import { HttpMethod } from '@/types';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.GET:
      return getMe(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
