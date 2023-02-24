import { ObjectId } from 'mongodb';

import Comment from '../models/comment';
import Item from '../models/item';
import Collection from '../models/collection';

const handleUserUpdate = async (userId: ObjectId, userName: string) => {
  await Collection.updateMany({ ownerId: userId }, { $set: { ownerName: userName } });
  await Item.updateMany({ ownerId: userId }, { $set: { ownerName: userName } });
  await Comment.updateMany({ authorId: userId }, { $set: { authorName: userName } });
};

const handleCustomFieldUpdate = async (
  collectionId: ObjectId,
  fieldId: string,
  fieldLabel: string,
  fieldType: string
) => {
  const allItems = await Item.find({ collectionId });
  allItems.map(async (item) => {
    await Item.findByIdAndUpdate(
      item._id,
      {
        customFields: item.customFields.map((field) =>
          field.customFieldId.toString() === fieldId
            ? {
                customFieldId: field.customFieldId,
                label: fieldLabel,
                type: fieldType,
                value: field.value,
              }
            : field
        ),
      },
      { new: true }
    );
  });
};

const handleCollectionUpdate = async (
  collectionId: ObjectId,
  collectionName: string,
  collectionTheme: string
) => {
  await Item.updateMany({ collectionId }, { $set: { collectionName, collectionTheme } });
};

export { handleUserUpdate, handleCustomFieldUpdate, handleCollectionUpdate };
