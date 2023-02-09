import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

import Collection from '../models/collection';

const getAllCollections = async (request: Request, response: Response) => {
  try {
    const collections = await Collection.find().sort({ updatedAt: -1 });
    response.json(collections);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getCollectionById = async (request: Request, response: Response) => {
  try {
    const collectionId = new ObjectId(request.params.collectionId);
    const collection = await Collection.findById(collectionId);
    response.json(collection);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getCollectionsByUserId = async (request: Request, response: Response) => {
  try {
    const ownerId = new ObjectId(request.params.userId);
    const collectionsByUser = await Collection.find({
      ownerId: {
        $all: ownerId,
      },
    }).sort({ updatedAt: -1 });
    return response.json(collectionsByUser);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createCollection = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      response.status(400).json({ message: 'Creation error', validationErrors });
    }
    const { title, description, theme, image, ownerId, ownerName } = request.body;
    const newCollection = new Collection({
      title,
      description,
      theme,
      image:
        image ||
        `https://source.boringavatars.com/marble/120/${title}%20${ownerId}?colors=F97D58,CDDCEB,F9DBCF,33B99,5D70C5&square`,
      ownerId,
      ownerName,
    });
    await newCollection.save();
    return response.json({ user: newCollection, message: 'New collection is created' });
  } catch (error) {
    response.status(400).json({ message: 'Unexpected creation error' });
    throw new Error(`${error}`);
  }
};

const deleteCollection = async (request: Request, response: Response) => {
  try {
    const collectionId = new ObjectId(request.params.collectionId);
    const deletedCollection = await Collection.findByIdAndDelete(collectionId);
    response.json(deletedCollection);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateCollection = async (request: Request, response: Response) => {
  try {
    const collectionId = new ObjectId(request.params.collectionId);
    const updatedCollection = await Collection.findByIdAndUpdate(
      collectionId,
      request.body,
      {
        new: true,
      }
    );
    response.json(updatedCollection);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  getAllCollections,
  getCollectionById,
  getCollectionsByUserId,
  createCollection,
  deleteCollection,
  updateCollection,
};
