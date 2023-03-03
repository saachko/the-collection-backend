import express from 'express';
import { check } from 'express-validator';

import {
  getAllCollections,
  getCollectionById,
  getCollectionsByUserId,
  createCollection,
  deleteCollection,
  updateCollection,
} from '../controllers/collectionsController';
import usersMiddleware from '../middlewares/usersMiddlewares';

const collectionsRouter = express.Router();
collectionsRouter.get('/', getAllCollections);
collectionsRouter.get('/:collectionId', getCollectionById);
collectionsRouter.get('/user/:userId', usersMiddleware, getCollectionsByUserId);
collectionsRouter.post(
  '/',
  usersMiddleware,
  [check('title', "Title can't be empty").notEmpty()],
  createCollection
);
collectionsRouter.delete('/:collectionId', usersMiddleware, deleteCollection);
collectionsRouter.put('/:collectionId', usersMiddleware, updateCollection);

export default collectionsRouter;
