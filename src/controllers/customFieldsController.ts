import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

import CustomField from '../models/customField';

import { handleCustomFieldDelete } from '../utils/deletionHandlers';
import { handleCustomFieldUpdate } from '../utils/updateHandlers';
import { handleCustomFieldCreate } from '../utils/creationHandlers';

const getCustomFieldById = async (request: Request, response: Response) => {
  try {
    const customFieldId = new ObjectId(request.params.fieldId);
    const customField = await CustomField.findById(customFieldId);
    response.json(customField);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getCustomFieldsByCollectionId = async (request: Request, response: Response) => {
  try {
    const collectionId = new ObjectId(request.params.collectionId);
    const customFieldsInCollection = await CustomField.find({
      collectionId: {
        $all: collectionId,
      },
    }).sort({ createdAt: 1 });
    return response.json(customFieldsInCollection);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createCustomField = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({ message: 'Creation error', validationErrors });
    }
    const { collectionId, type, label } = request.body;
    const newCustomField = new CustomField({ collectionId, type, label });
    await handleCustomFieldCreate(newCustomField._id, collectionId, type, label);
    await newCustomField.save();
    return response.json(newCustomField);
  } catch (error) {
    response.status(400).json({ message: 'Unexpected creation error' });
    throw new Error(`${error}`);
  }
};

const deleteCustomField = async (request: Request, response: Response) => {
  try {
    const customFieldId = new ObjectId(request.params.fieldId);
    const collectionId = (await CustomField.findById(customFieldId))?.collectionId;
    await handleCustomFieldDelete(collectionId as ObjectId, customFieldId);
    const deletedCustomField = await CustomField.findByIdAndDelete(customFieldId);
    response.json(deletedCustomField);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateCustomField = async (request: Request, response: Response) => {
  try {
    const customFieldId = new ObjectId(request.params.fieldId);
    const collectionId = (await CustomField.findById(customFieldId))?.collectionId;
    const updatedCustomField = await CustomField.findByIdAndUpdate(
      customFieldId,
      request.body,
      { new: true }
    );
    if (updatedCustomField) {
      await handleCustomFieldUpdate(
        collectionId as ObjectId,
        customFieldId,
        updatedCustomField.label,
        updatedCustomField.type
      );
    }
    response.json(updatedCustomField);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  getCustomFieldById,
  getCustomFieldsByCollectionId,
  createCustomField,
  deleteCustomField,
  updateCustomField,
};
