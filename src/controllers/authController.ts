import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import Role from '../models/role';

const signUp = async (request: Request, response: Response) => {
  try {
    const { username, email, password } = request.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = bcrypt.hashSync(password, 6);
    const userRole = await Role.findOne({ value: 'user' });
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      avatar: `https://source.boringavatars.com/beam/120/${username}%20${email}?colors=F97D58,CDDCEB,F9DBCF,33B99,5D70C5&square`,
      isBlocked: false,
      roles: [userRole?.value],
      collections: [],
    });
    await newUser.save();
    return response.json({ user: newUser, message: 'New user is created' });
  } catch (error) {
    response.status(400).json({ message: 'Registration error' });
    throw new Error(`${error}`);
  }
};

const signIn = async (request: Request, response: Response) => {
  try {
  } catch (error) {
    response.status(400).json({ message: 'Authorization error' });
    throw new Error(`${error}`);
  }
};

export { signUp, signIn };
