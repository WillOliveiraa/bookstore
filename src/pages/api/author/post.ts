import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstName, lastName, bookId } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First name or last name not specified.' });
  }

  const author = await prisma.author.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      book_id: bookId
    }
  });

  return res.status(201).json(author);
}
