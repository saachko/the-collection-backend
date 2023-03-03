import express from 'express';
import { check } from 'express-validator';

import {
  getAllItems,
  getItemById,
  getItemsByCollectionId,
  createItem,
  deleteItem,
  updateItem,
} from '../controllers/itemsController';
import usersMiddleware from '../middlewares/usersMiddlewares';

const itemsRouter = express.Router();
itemsRouter.get('/', getAllItems);
itemsRouter.get('/:itemId', getItemById);
itemsRouter.get('/collection/:collectionId', getItemsByCollectionId);
itemsRouter.post(
  '/',
  usersMiddleware,
  [check('itemName', "Item name can't be empty").notEmpty()],
  createItem
);
itemsRouter.delete('/:itemId', usersMiddleware, deleteItem);
itemsRouter.put('/:itemId', usersMiddleware, updateItem);

export default itemsRouter;
