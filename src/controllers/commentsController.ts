import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

import Comment from '../models/comment';

const getCommentById = async (request: Request, response: Response) => {
  try {
    const commentId = new ObjectId(request.params.commentId);
    const comment = await Comment.findById(commentId);
    response.json(comment);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getCommentsByItemId = async (request: Request, response: Response) => {
  try {
    const itemId = new ObjectId(request.params.itemId);
    const commentsToItem = await Comment.find({
      itemId: {
        $all: itemId,
      },
    }).sort({ createdAt: 1 });
    return response.json(commentsToItem);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createComment = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({ message: 'Creation error', validationErrors });
    }
    const { itemId, authorId, authorName, text } = request.body;
    const newComment = new Comment({ itemId, authorId, authorName, text });
    await newComment.save();
    return response.json({
      comment: newComment,
      message: 'New comment is created',
    });
  } catch (error) {
    response.status(400).json({ message: 'Unexpected creation error' });
    throw new Error(`${error}`);
  }
};

const deleteComment = async (request: Request, response: Response) => {
  try {
    const commentId = new ObjectId(request.params.commentId);
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    response.json(deletedComment);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateComment = async (request: Request, response: Response) => {
  try {
    const commentId = new ObjectId(request.params.commentId);
    const updatedComment = await Comment.findByIdAndUpdate(commentId, request.body, {
      new: true,
    });
    response.json(updatedComment);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  getCommentById,
  getCommentsByItemId,
  createComment,
  deleteComment,
  updateComment,
};
