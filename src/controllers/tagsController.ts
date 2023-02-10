import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

import Tag from '../models/tag';

const getAllTags = async (request: Request, response: Response) => {
  try {
    const tags = await Tag.find();
    response.json(tags);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getTagById = async (request: Request, response: Response) => {
  try {
    const tagId = new ObjectId(request.params.tagId);
    const tag = await Tag.findById(tagId);
    response.json(tag);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getTagsByItemId = async (request: Request, response: Response) => {
  try {
    const itemId = new ObjectId(request.params.itemId);
    const tagsInItem = await Tag.find({
      items: {
        $all: itemId,
      },
    }).sort({ createdAt: 1 });
    return response.json(tagsInItem);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createTag = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      response.status(400).json({ message: 'Creation error', validationErrors });
    }
    const { label, items } = request.body;
    const newTag = new Tag({ label, items });
    await newTag.save();
    return response.json({ tag: newTag, message: 'New tag is created' });
  } catch (error) {
    response.status(400).json({ message: 'Unexpected creation error' });
    throw new Error(`${error}`);
  }
};

const updateTag = async (request: Request, response: Response) => {
  try {
    const tagId = new ObjectId(request.params.tagId);
    const updatedTag = await Tag.findByIdAndUpdate(tagId, request.body, {
      new: true,
    });
    response.json(updatedTag);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { getAllTags, getTagById, getTagsByItemId, createTag, updateTag };
