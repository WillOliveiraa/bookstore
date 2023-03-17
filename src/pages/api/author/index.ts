import dayjs from 'dayjs';

import { prisma } from '../../../lib/prisma';
import { authenticated } from '../../../middleware/authenticated';
import handler from '../../../middleware/handler';
import { validate } from '../../../middleware/validate';
import { AuthorSchema } from '../../../schemas/author_schema';

const authorSchema = AuthorSchema(false);

handler.get(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    const authorList = await prisma.author.findMany({
      where: { deleted_at: null }
    });

    return res.json(authorList);
  }

  const author = await prisma.author.findFirst({
    where: { id: String(id), deleted_at: null }
  });

  return res.json(author ?? {});
});

handler.post(async (req, res) => {
  const { firstName, lastName, bookId } = authorSchema.cast(req.body);

  const author = await prisma.author.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      book_id: bookId
    }
  });

  return res.status(201).json(author);
});

handler.put(async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id } = req.query;
  const { firstName, lastName, bookId } = authorSchema.cast(req.body);

  const author = await prisma.author.update({
    where: {
      id: String(id)
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      book_id: bookId,
      updated_at: dayjs().toDate()
    }
  });

  return res.json(author);
});

handler.delete(async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { id } = req.query;

  const author = await prisma.author.update({
    where: {
      id: String(id)
    },
    data: {
      deleted_at: dayjs().toDate()
    }
  });

  return res.json(author);
});

export default authenticated(validate(authorSchema, handler));
