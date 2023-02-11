import { ObjectId } from 'mongodb';

import Comment from '../models/comment';
import Item from '../models/item';
import CustomField from '../models/customField';
import Collection from '../models/collection';

const handleUserUpdate = async (userId: ObjectId, userName: string) => {
  await Collection.updateMany({ ownerId: userId }, { $set: { ownerName: userName } });
  await Item.updateMany({ ownerId: userId }, { $set: { ownerName: userName } });
  await Comment.updateMany({ authorId: userId }, { $set: { authorName: userName } });
};

export { handleUserUpdate };
