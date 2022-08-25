import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '@/api/features/users';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.GET:
      return getUsers(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
