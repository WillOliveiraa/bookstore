import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { title, description, bookId } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title or description not specified.' });
  }

  const category = await prisma.category.create({
    data: {
      title,
      description,
      book_id: bookId
    }
  });

  return res.status(201).json(category);
}
