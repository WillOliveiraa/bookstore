import dayjs from 'dayjs';

import { prisma } from '../../../lib/prisma';
import { authenticated } from '../../../middleware/authenticated';
import handler from '../../../middleware/handler';
import { validate } from '../../../middleware/validate';
import { CategorySchema } from '../../../models/category_model';

const categorySchema = CategorySchema(false);

handler.get(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    const categoryList = await prisma.category.findMany({
      where: { deleted_at: null }
    });

    return res.json(categoryList);
  }

  const category = await prisma.category.findFirst({
    where: { id: String(id), deleted_at: null }
  });

  return res.json(category ?? {});
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

handler.delete(async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { id } = req.query;

  console.log(id);

  const category = await prisma.category.update({
    where: {
      id: String(id)
    },
    data: {
      deleted_at: dayjs().toDate()
    }
  });

  return res.json(category);
});

export default authenticated(validate(categorySchema, handler));
