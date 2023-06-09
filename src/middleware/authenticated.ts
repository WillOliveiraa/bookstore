import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { verify } from 'jsonwebtoken';

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.bookstoreAuth!,
      process.env.NEXTAUTH_SECRET as string,
      async (err, decoded) => {
        if (!err && decoded) {
          return await fn(req, res);
        }

        res.status(401).json({ message: 'Sorry you are not authenticated' });
      }
    );
  };
