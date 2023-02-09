import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import User from '../models/user';
import Role from '../models/role';

import { generateToken } from '../utils/functions';

const signUp = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      response.status(400).json({ message: 'Registration error', validationErrors });
    }

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
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "User doesn't exist" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return response.status(400).json({ message: 'Incorrect password!' });
    }
    if (user.isBlocked) {
      return response.status(403).json({ message: 'User is blocked!' });
    }
    const token = generateToken(user._id.toString(), user.roles, user.isBlocked);
    return response.json({ user, token });
  } catch (error) {
    response.status(400).json({ message: 'Authorization error' });
    throw new Error(`${error}`);
  }
};

export { signUp, signIn };
