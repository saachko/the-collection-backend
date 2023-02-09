import express from 'express';

import {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/usersController';

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', updateUser);

export default usersRouter;
