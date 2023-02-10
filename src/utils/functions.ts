import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import Comment from '../models/comment';
import Tag from '../models/tag';
import Item from '../models/item';
import CustomField from '../models/customField';

const generateToken = (id: string, roles: string[], isBlocked: boolean) => {
  return jwt.sign({ id, roles, isBlocked }, process.env.SECRET_KEY as string, {
    expiresIn: '12h',
  });
};

const handleItemDelete = async (itemId: string) => {
  await Comment.deleteMany({ itemId: itemId });
  const updatedTags = await Tag.find({
    items: {
      $all: itemId,
    },
  });
  const newItemsList = updatedTags.map((tag) =>
    tag.items.filter((id) => id.toString() !== itemId)
  );
  await Tag.updateMany({ items: itemId }, { $set: { items: newItemsList.flat() } });
};

const handleCollectionDelete = async (collectionId: ObjectId) => {
  const itemsInCollection = await Item.find({ collectionId: collectionId });
  itemsInCollection.map(async (item) => await handleItemDelete(item._id.toString()));
  await CustomField.deleteMany({ collectionId: collectionId });
  await Item.deleteMany({ collectionId: collectionId });
};

export { generateToken, handleItemDelete, handleCollectionDelete };
