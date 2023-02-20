import { ObjectId } from 'mongodb';

import Collection from '../models/collection';

const handleItemCreation = async (collectionId: ObjectId) => {
  const updatedCollection = await Collection.findById(collectionId);
  if (updatedCollection) {
    await Collection.findByIdAndUpdate(updatedCollection._id, {
      itemsQuantity: updatedCollection.itemsQuantity + 1,
    });
  }
};

export { handleItemCreation };
