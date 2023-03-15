import type { NextApiRequest, NextApiResponse } from 'next';

import dayjs from 'dayjs';

import { prisma } from '../../../lib/prisma';
import { createCategoryFormSchema } from '../../../models/category_model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Id no provided.' });
  }

  const { title, description, bookId } = createCategoryFormSchema.cast(req.body);
  // try {
  // const { title, description, bookId } = await createCategoryFormSchema.validate(
  //     createCategoryFormSchema
  //   );
  //   console.log(title);
  //   // const { title, description, bookId } = createCategoryFormSchema.cast(req.body);
  // } catch (error) {
  //   return res.status(400).json({ type: error.name, message: error.message });
  // }

  const category = await prisma.category.update({
    where: {
      id: String(id)
    },
    data: {
      title: title,
      description: description,
      book_id: bookId,
      updated_at: dayjs().toDate()
    }
  });

  return res.json(category);
}
