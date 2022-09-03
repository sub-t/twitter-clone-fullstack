import { NextApiHandler } from 'next';
import { prisma } from '@/api/lib/prisma';
import { withSessionRoute } from '@/api/lib/session';
import { rejectInvalidRequest } from '@/api/middlewares/rejectInvalidRequest';
import { getUserResponse } from '../../users';
import { comparePasswords, hashPassword } from '../utils/password';

const loginFn: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw Error('Invalid email or password');
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      throw Error('Invalid email or password');
    }

    req.session.user = { id: user.id };
    await req.session.save();

    const userResponse = getUserResponse(user);

    return res.status(200).json(userResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const registerFn: NextApiHandler = async (req, res) => {
  try {
    const { email, name, screenName, password } = req.body;

    let existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('Email has already been taken.');
    }

    existingUser = await prisma.user.findFirst({
      where: {
        screenName,
      },
    });

    if (existingUser) {
      throw new Error('Username has already been taken.');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        screenName,
        password: hashedPassword,
      },
    });

    req.session.user = { id: user.id };
    await req.session.save();

    const userResponse = getUserResponse(user);

    return res.status(200).json(userResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

const logoutFn: NextApiHandler = async (req, res) => {
  rejectInvalidRequest(req, res);

  req.session.destroy();

  return res.status(204).end();
};

const getMeFn: NextApiHandler = async (req, res) => {
  try {
    const id = req.session?.user?.id;

    if (!id) {
      return res.status(204).end();
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        followers: true,
        friends: true,
        favorites: true,
      },
    });

    if (!user) {
      throw Error('Invalid cookie value');
    }

    const userResponse = getUserResponse(user);

    return res.status(200).json(userResponse);
  } catch (error: any) {
    if (error?.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const login = withSessionRoute(loginFn);
export const register = withSessionRoute(registerFn);
export const logout = withSessionRoute(logoutFn);
export const getMe = withSessionRoute(getMeFn);
