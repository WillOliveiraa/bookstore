import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../lib/prisma';
import handler from '../../../middleware/handler';
import { validate } from '../../../middleware/validate';
import { LoginSchema } from '../../../schemas/login_schema';

const loginSchema = LoginSchema(false);

handler.post(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'We only support POST' });
  }

  const { email, password } = loginSchema.cast(req.body);

  const user = await prisma.user.findFirst({
    where: { email: email }
  });

  const errorMessage = 'Ups, email or password is invalid';

  if (!!user) {
    const match = await compare(password, user.password);

    if (match) {
      const claims = { sub: user.id, myUserEmail: user.email, myUsername: user.name };

      const jwt = sign(claims, process.env.NEXTAUTH_SECRET as string, { expiresIn: '1h' });

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        })
      );

      return res.json({ message: 'Welcome back to the app!' });
    }

    return res.json({ message: 'Welcome back to the app!' });
  }

  return res.status(400).json({ message: errorMessage });
});

export default validate(loginSchema, handler);
