import type { NextApiRequest, NextApiResponse } from 'next';
import { register } from '@/api';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.POST:
      return register(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.POST]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
