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

const handleCustomFieldUpdate = async (
  collectionId: ObjectId,
  fieldId: string,
  fieldLabel: string
) => {
  const allItems = await Item.find({ collectionId });
  allItems.map(async (item) => {
    await Item.findByIdAndUpdate(
      item._id,
      {
        collectionId: item.collectionId,
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        itemName: item.itemName,
        likes: item.likes,
        customFields: item.customFields.map((field) =>
          field.customFieldId.toString() === fieldId
            ? {
                customFieldId: field.customFieldId,
                label: fieldLabel,
                value: field.value,
              }
            : field
        ),
      },
      { new: true }
    );
  });
};

export { handleUserUpdate, handleCustomFieldUpdate };
