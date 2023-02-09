import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

const checkAuth = (request: Request, response: Response, next: NextFunction) => {
  if (request.method === 'OPTIONS') {
    next();
  }
  const authHeader = request.header('Authorization');
  if (authHeader) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer' && jwt.verify(token, process.env.SECRET_KEY as string)) {
      return next();
    }
  }
  return response.status(403).json({ message: 'Invalid token' });
};

export default checkAuth;
