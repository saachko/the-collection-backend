import express from 'express';
import { check } from 'express-validator';

import {
  getAllTags,
  getTagById,
  getTagsByItemId,
  createTag,
  updateTag,
} from '../controllers/tagsController';
import usersMiddleware from '../middlewares/usersMiddlewares';

const tagsRouter = express.Router();
tagsRouter.get('/', getAllTags);
tagsRouter.get('/:tagId', getTagById);
tagsRouter.get('/item/:itemId', getTagsByItemId);
tagsRouter.post(
  '/',
  usersMiddleware,
  [check('label', "Label can't be empty").notEmpty()],
  createTag
);
tagsRouter.put('/:tagId', usersMiddleware, updateTag);

export default tagsRouter;
