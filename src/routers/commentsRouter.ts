import express from 'express';
import { check } from 'express-validator';

import {
  getCommentById,
  getCommentsByItemId,
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/commentsController';
import usersMiddleware from '../middlewares/usersMiddlewares';

const commentsRouter = express.Router();
commentsRouter.get('/:commentId', getCommentById);
commentsRouter.get('/item/:itemId', getCommentsByItemId);
commentsRouter.post(
  '/',
  usersMiddleware,
  [check('text', 'Comment should contain any text').notEmpty()],
  createComment
);
commentsRouter.delete('/:commentId', usersMiddleware, deleteComment);
commentsRouter.put('/:commentId', usersMiddleware, updateComment);

export default commentsRouter;
