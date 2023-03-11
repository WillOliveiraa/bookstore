import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Id no provided.' });
  }

  const category = await prisma.category.findFirst({
    where: { id: String(id) }
  });

  return res.json(category);
}
