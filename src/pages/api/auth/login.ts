import type { NextApiRequest, NextApiResponse } from 'next';
import { login } from '@/api';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.POST:
      return login(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.POST]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
