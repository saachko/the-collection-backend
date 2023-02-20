import { ObjectId } from 'mongodb';

import Comment from '../models/comment';
import Tag from '../models/tag';
import Item from '../models/item';
import CustomField from '../models/customField';
import Collection from '../models/collection';

const handleItemDelete = async (itemId: string, collectionId: ObjectId) => {
  await Comment.deleteMany({ itemId: itemId });
  const updatedTags = await Tag.find({
    items: {
      $all: itemId,
    },
  });
  updatedTags.map(async (tag) => {
    await Tag.findByIdAndUpdate(
      tag._id,
      { items: tag.items.filter((id) => id.toString() !== itemId) },
      { new: true }
    );
  });
  const updatedCollection = await Collection.findById(collectionId);
  if (updatedCollection) {
    await Collection.findByIdAndUpdate(
      updatedCollection._id,
      { itemsQuantity: updatedCollection.itemsQuantity - 1 },
      { new: true }
    );
  }
};

const handleCollectionDelete = async (collectionId: ObjectId) => {
  const itemsInCollection = await Item.find({ collectionId: collectionId });
  itemsInCollection.map(
    async (item) => await handleItemDelete(item._id.toString(), collectionId)
  );
  await CustomField.deleteMany({ collectionId: collectionId });
  await Item.deleteMany({ collectionId: collectionId });
};

const handleUserDelete = async (userId: ObjectId) => {
  const collectionsByUser = await Collection.find({ ownerId: userId });
  collectionsByUser.map(
    async (collection) => await handleCollectionDelete(collection._id)
  );
  const likedItemsByUser = await Item.find({ likes: userId });
  likedItemsByUser.map(async (item) => {
    await Item.findByIdAndUpdate(
      item._id,
      { likes: item.likes.filter((id) => id.toString() !== userId.toString()) },
      { new: true }
    );
  });
  await Collection.deleteMany({ ownerId: userId });
};

const handleCustomFieldDelete = async (collectionId: ObjectId, fieldId: string) => {
  const allItems = await Item.find({ collectionId });
  allItems.map(async (item) => {
    await Item.findByIdAndUpdate(
      item._id,
      {
        customFields: item.customFields.filter(
          (field) => field.customFieldId.toString() !== fieldId
        ),
      },
      { new: true }
    );
  });
};

export {
  handleItemDelete,
  handleCollectionDelete,
  handleUserDelete,
  handleCustomFieldDelete,
};
