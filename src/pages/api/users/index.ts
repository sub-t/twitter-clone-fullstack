import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '@/api/features/users';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.PATCH:
      return updateUser(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.PATCH]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
