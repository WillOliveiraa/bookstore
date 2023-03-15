import dayjs from 'dayjs';

import { prisma } from '../../../lib/prisma';
import handler from '../../../middleware/handler';
import { validate } from '../../../middleware/validate';
import { CategorySchema } from '../../../models/category_model';

const categorySchema = CategorySchema(false);

handler.get(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const categoryList = await prisma.category.findMany();

  return res.json(categoryList);
});

handler.get('/get', async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Id is a required field.' });
  }

  const category = await prisma.category.findFirst({
    where: { id: String(id) }
  });

  return res.json(category);
});

handler.post(async (req, res) => {
  const { title, description, bookId } = req.body;

  const category = await prisma.category.create({
    data: {
      title,
      description,
      book_id: bookId
    }
  });

  return res.status(201).json(category);
});

handler.put(async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id } = req.query;
  const { title, description, bookId } = categorySchema.cast(req.body);

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
});

export default validate(categorySchema, handler);
