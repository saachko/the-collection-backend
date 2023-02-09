import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

declare module 'jsonwebtoken' {
  export interface RolesJwtPayload extends jwt.JwtPayload {
    roles: string[];
  }
}

const checkAdmin = (roles: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.method === 'OPTIONS') {
      next();
    }
    const authHeader = request.header('Authorization');
    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      const { roles: userRoles } = <jwt.RolesJwtPayload>(
        jwt.verify(token, process.env.SECRET_KEY as string)
      );
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role) && type === 'Bearer') {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return response.status(403).json({ message: 'Access is denied' });
      }
      return next();
    }
  };
};

export default checkAdmin;
