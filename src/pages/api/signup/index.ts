import { hash } from 'bcrypt';

import { prisma } from '../../../lib/prisma';
import handler from '../../../middleware/handler';
import { validate } from '../../../middleware/validate';
import { SignUpSchema } from '../../../schemas/sign_up_schema';

const signUpSchema = SignUpSchema(false);

handler.post(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'We only support POST' });
  }

  const { name, email, password } = req.body;

  const checkUserEmail = await prisma.user.findFirst({
    select: { email: true },
    where: { email }
  });

  if (!!checkUserEmail) {
    return res.status(400).json({ message: 'Email alredy exists' });
  }

  hash(password, 10, async (_, hash) => {
    const user = await prisma.user.create({
      data: { name, email, password: hash }
    });

    res.status(201).json(user);
  });
});

export default validate(signUpSchema, handler);
