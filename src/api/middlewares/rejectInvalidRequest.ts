import type { NextApiRequest, NextApiResponse } from 'next';

export const rejectInvalidRequest = (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400);
  }

  const id = req.session.user?.id;
  if (!id) {
    return res.status(401);
  }
};
