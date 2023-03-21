import dayjs from 'dayjs';

import { prisma } from '../../../lib/prisma';
import { authenticated } from '../../../middleware/authenticated';
import handler from '../../../middleware/handler';

// import { validate } from '../../../middleware/validate';

// const userSchema = userSchema(false);

// GET
handler.get(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id) {
    const userList = await prisma.user.findMany({
      select: { id: true, name: true, email: true, avatar_url: true },
      where: { deleted_at: null }
    });

    return res.json(userList);
  }

  const user = await prisma.user.findFirst({
    select: { id: true, name: true, email: true, avatar_url: true },
    where: { id: String(id), deleted_at: null }
  });

  return res.json(user ?? {});
});

// PUT
// handler.put(async (req, res) => {
//   if (req.method !== 'PUT') {
//     return res.status(405).end();
//   }

//   const { id } = req.query;
//   const { firstName, lastName, bookId } = userSchema.cast(req.body);

//   const user = await prisma.user.update({
//     where: {
//       id: String(id)
//     },
//     data: {
//       first_name: firstName,
//       last_name: lastName,
//       book_id: bookId,
//       updated_at: dayjs().toDate()
//     }
//   });

//   return res.json(user);
// });

// DELETE
handler.delete(async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { id } = req.query;

  const user = await prisma.user.update({
    where: {
      id: String(id)
    },
    data: {
      deleted_at: dayjs().toDate()
    }
  });

  return res.json(user);
});

export default authenticated(handler);
