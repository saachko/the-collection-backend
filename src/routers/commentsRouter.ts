import express from 'express';
import { check } from 'express-validator';

import {
  getAllComments,
  getCommentById,
  getCommentsByItemId,
  createComment,
  deleteComment,
  updateComment,
  getChangedComment,
} from '../controllers/commentsController';
import usersMiddleware from '../middlewares/usersMiddlewares';

const commentsRouter = express.Router();
commentsRouter.get('/all', getAllComments);
commentsRouter.get('/:commentId', getCommentById);
commentsRouter.get('/item/:itemId', getCommentsByItemId);
commentsRouter.get('/', getChangedComment);
commentsRouter.post(
  '/',
  usersMiddleware,
  [check('text', 'Comment should contain any text').notEmpty()],
  createComment
);
commentsRouter.delete('/:commentId', usersMiddleware, deleteComment);
commentsRouter.put('/:commentId', usersMiddleware, updateComment);

export default commentsRouter;
