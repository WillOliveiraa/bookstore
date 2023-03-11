import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Id no provided.' });
  }

  const { firstName, lastName, bookId } = req.body;

  const author = await prisma.author.update({
    where: {
      id: String(id)
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      book_id: bookId
    }
  });

  return res.json(author);
}
