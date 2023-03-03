import express from 'express';
import { check } from 'express-validator';

import { signUp, signIn } from '../controllers/authController';

const authRouter = express.Router();
authRouter.post(
  '/signup',
  [
    check('username', "Username can't be empty").notEmpty(),
    check('email', "E-mail can't be empty").notEmpty(),
    check('password', "Password can't be empty").notEmpty(),
  ],
  signUp
);
authRouter.post('/signin', signIn);

export default authRouter;
