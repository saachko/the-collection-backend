import express from 'express';

const authRouter = express.Router();
authRouter.post('/signup');
authRouter.post('/signin');

export default authRouter;
