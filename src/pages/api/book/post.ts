import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // const { title, price, numPages, publishDate, imageUrl, authorId, categoryId } = createBookBody.cast(req.body);
  const { title, price, numPages, publishDate, imageUrl, authorId, categoryId } = req.body;

  if (!title || !price || !numPages || !publishDate || !imageUrl) {
    return res.status(400).json({ message: 'Fields not specified.' });
  }

  const book = await prisma.book.create({
    data: {
      title,
      price,
      num_pages: numPages,
      publish_date: publishDate,
      image_url: imageUrl,
      authors: { connect: { id: authorId } },
      categories: { connect: { id: categoryId } }
    }
  });

  return res.status(201).json(book);
}
