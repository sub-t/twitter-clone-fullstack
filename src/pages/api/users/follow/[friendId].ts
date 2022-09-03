import { NextApiRequest, NextApiResponse } from 'next';
import { createFollows, deleteFollows } from '@/api';
import { HttpMethod } from '@/types';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.POST:
      return createFollows(req, res);
    case HttpMethod.DELETE:
      return deleteFollows(req, res);
    default:
      res.setHeader('Allow', [HttpMethod.POST, HttpMethod.DELETE]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
