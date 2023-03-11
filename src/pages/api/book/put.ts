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

  const { title, price, numPages, publishDate, imageUrl, authorId, categoryId } = req.body;

  const book = await prisma.book.update({
    where: {
      id: String(id)
    },
    data: {
      title,
      price,
      num_pages: numPages,
      publish_date: publishDate,
      image_url: imageUrl,
      author: authorId,
      categories: categoryId
    }
  });

  return res.json(book);
}
