import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';

import CustomField from '../models/customField';

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
    }).sort({ updatedAt: -1 });
    return response.json(customFieldsInCollection);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createCustomField = async (request: Request, response: Response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      response.status(400).json({ message: 'Creation error', validationErrors });
    }
    const { collectionId, type, label } = request.body;
    const newCustomField = new CustomField({ collectionId, type, label });
    await newCustomField.save();
    return response.json({
      customField: newCustomField,
      message: 'New custom field is created',
    });
  } catch (error) {
    response.status(400).json({ message: 'Unexpected creation error' });
    throw new Error(`${error}`);
  }
};

const deleteCustomField = async (request: Request, response: Response) => {
  try {
    const customFieldId = new ObjectId(request.params.fieldId);
    const deletedCustomField = await CustomField.findByIdAndDelete(customFieldId);
    response.json(deletedCustomField);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateCustomField = async (request: Request, response: Response) => {
  try {
    const customFieldId = new ObjectId(request.params.fieldId);
    const updatedCustomField = await CustomField.findByIdAndUpdate(
      customFieldId,
      request.body,
      {
        new: true,
      }
    );
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
