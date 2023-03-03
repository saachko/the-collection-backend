import { Response, Request, NextFunction } from 'express';

const corsResolver = (request: Request, response: Response, next: NextFunction) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

export default corsResolver;
