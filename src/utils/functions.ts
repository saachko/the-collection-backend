import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const generateToken = (id: string, roles: string[], isBlocked: boolean) => {
  return jwt.sign({ id, roles, isBlocked }, process.env.SECRET_KEY as string, {
    expiresIn: '12h',
  });
};

export { generateToken };
