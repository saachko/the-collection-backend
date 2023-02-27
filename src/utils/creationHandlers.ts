import { ObjectId } from 'mongodb';

import Collection from '../models/collection';
import Item from '../models/item';
import CustomField from '../models/customField';

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
  const itemsInCollection = await Item.find({ collectionId });
  if (itemsInCollection.length > 0) {
    const newField = { customFieldId, label, type, value: '⎯' };
    await Promise.all(
      itemsInCollection.map(async (item) => {
        const newCustomFields = [...item.customFields, newField];
        const updatedItem = await Item.findByIdAndUpdate(
          item._id,
          { customFields: newCustomFields },
          { new: true }
        );
        return updatedItem;
      })
    );
  }
};

export { handleItemCreation, handleCustomFieldCreate };
