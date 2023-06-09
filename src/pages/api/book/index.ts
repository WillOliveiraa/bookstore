import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const bookList = await prisma.book.findMany({
    include: { authors: true, categories: true }
  });

  return res.json(bookList);
}
