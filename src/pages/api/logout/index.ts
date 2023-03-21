import cookie from 'cookie';
import dayjs from 'dayjs';

import handler from '../../../middleware/handler';

handler.get(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'We only support POST' });
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('bookstoreAuth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
      expires: dayjs().toDate()
    })
  );

  return res.status(200).end();
});

export default handler;
