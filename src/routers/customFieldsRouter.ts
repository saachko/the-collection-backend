import express from 'express';
import { check } from 'express-validator';

import {
  getCustomFieldById,
  getCustomFieldsByCollectionId,
  createCustomField,
  deleteCustomField,
  updateCustomField,
} from '../controllers/customFieldsController';
import usersMiddleware from '../middlewares/usersMiddlewares';

const customFieldsRouter = express.Router();
customFieldsRouter.get('/:fieldId', getCustomFieldById);
customFieldsRouter.get('/collection/:collectionId', getCustomFieldsByCollectionId);
customFieldsRouter.post(
  '/',
  usersMiddleware,
  [check('label', "Label can't be empty").notEmpty()],
  createCustomField
);
customFieldsRouter.delete('/:fieldId', usersMiddleware, deleteCustomField);
customFieldsRouter.put('/:fieldId', usersMiddleware, updateCustomField);

export default customFieldsRouter;
