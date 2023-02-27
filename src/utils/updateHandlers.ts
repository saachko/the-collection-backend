import { ObjectId } from 'mongodb';

import Comment from '../models/comment';
import Item from '../models/item';
import Collection from '../models/collection';

const handleUserUpdate = async (
  userId: ObjectId,
  userName: string,
  userAvatar: string
) => {
  await Collection.updateMany({ ownerId: userId }, { $set: { ownerName: userName } });
  await Item.updateMany({ ownerId: userId }, { $set: { ownerName: userName } });
  await Comment.updateMany(
    { authorId: userId },
    { $set: { authorName: userName, authorAvatar: userAvatar } }
  );
};

const handleCustomFieldUpdate = async (
  collectionId: ObjectId,
  fieldId: ObjectId,
  fieldLabel: string,
  fieldType: string
) => {
  const filter = { 'customFields.customFieldId': fieldId, collectionId: collectionId };
  const updatedFields = {
    $set: { 'customFields.$.label': fieldLabel, 'customFields.$.type': fieldType },
  };
  await Item.updateMany(filter, updatedFields, { multi: true });
};

const handleCollectionUpdate = async (
  collectionId: ObjectId,
  collectionName: string,
  collectionTheme: string
) => {
  await Item.updateMany({ collectionId }, { $set: { collectionName, collectionTheme } });
};

export { handleUserUpdate, handleCustomFieldUpdate, handleCollectionUpdate };
