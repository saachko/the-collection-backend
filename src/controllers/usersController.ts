import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';

import User from '../models/user';

import { handleUserDelete } from '../utils/deletionHandlers';
import { handleUserUpdate } from '../utils/updateHandlers';

const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    response.json(users);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUserById = async (request: Request, response: Response) => {
  try {
    const userId = new ObjectId(request.params.id);
    const user = await User.findById(userId);
    response.json(user);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteUser = async (request: Request, response: Response) => {
  try {
    const userId = new ObjectId(request.params.id);
    await handleUserDelete(userId);
    const deletedUser = await User.findByIdAndDelete(userId);
    response.json(deletedUser);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateUser = async (request: Request, response: Response) => {
  try {
    const userId = new ObjectId(request.params.id);
    const updatedUser = await User.findByIdAndUpdate(userId, request.body, {
      new: true,
    });
    if (updatedUser) {
      await handleUserUpdate(userId, updatedUser.username);
    }
    response.json(updatedUser);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { getUsers, getUserById, deleteUser, updateUser };
