import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import events from 'events';

import Comment from '../models/comment';

const emitter = new events.EventEmitter();

const getAllComments = async (request: Request, response: Response) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    response.json(comments);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

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
    const { itemId, authorId, authorName, authorAvatar, text } = request.body;
    const newComment = new Comment({ itemId, authorId, authorName, authorAvatar, text });
    emitter.emit('changedComment', { comment: newComment, type: 'newComment' });
    await newComment.save();
    return response.json(newComment);
  } catch (error) {
    response.status(400).json({ message: 'Unexpected creation error' });
    throw new Error(`${error}`);
  }
};

const deleteComment = async (request: Request, response: Response) => {
  try {
    const commentId = new ObjectId(request.params.commentId);
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    emitter.emit('changedComment', { comment: deletedComment, type: 'deletedComment' });
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

const getChangedComment = async (request: Request, response: Response) => {
  emitter.once('changedComment', (comment) => {
    return response.json(comment);
  });
};

export {
  getAllComments,
  getCommentById,
  getCommentsByItemId,
  createComment,
  deleteComment,
  updateComment,
  getChangedComment,
};
