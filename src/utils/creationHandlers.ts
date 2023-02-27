import { ObjectId } from 'mongodb';

import Collection from '../models/collection';
import Item from '../models/item';

const handleItemCreation = async (collectionId: ObjectId) => {
  const updatedCollection = await Collection.findById(collectionId);
  if (updatedCollection) {
    await Collection.findByIdAndUpdate(
      updatedCollection._id,
      { itemsQuantity: updatedCollection.itemsQuantity + 1 },
      { new: true }
    );
  }
};

const handleCustomFieldCreate = async (
  customFieldId: ObjectId,
  collectionId: ObjectId,
  type: string,
  label: string
) => {
  const newField = { customFieldId, label, type, value: '⎯' };
  await Item.updateMany({ collectionId }, { $push: { customFields: newField } });
};

export { handleItemCreation, handleCustomFieldCreate };
