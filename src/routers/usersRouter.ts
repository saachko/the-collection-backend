import express from 'express';

import {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/usersController';
import usersMiddleware from '../middlewares/usersMiddlewares';
import roleMiddleware from '../middlewares/roleMiddleware';

const usersRouter = express.Router();
usersRouter.get('/', roleMiddleware(['admin']), getUsers);
usersRouter.get('/:id', usersMiddleware, getUserById);
usersRouter.delete('/:id', usersMiddleware, deleteUser);
usersRouter.put('/:id', usersMiddleware, updateUser);

export default usersRouter;
