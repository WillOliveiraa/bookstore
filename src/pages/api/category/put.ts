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

  const { title, description, bookId } = req.body;

  const category = await prisma.category.update({
    where: {
      id: String(id)
    },
    data: {
      title: title,
      description: description,
      book_id: bookId
    }
  });

  return res.json(category);
}
