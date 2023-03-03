import { ObjectId } from 'mongodb';

import Comment from '../models/comment';
import Tag from '../models/tag';
import Item from '../models/item';
import CustomField from '../models/customField';
import Collection from '../models/collection';

const handleItemDelete = async (itemId: ObjectId, collectionId: ObjectId) => {
  await Comment.deleteMany({ itemId: itemId });
  await Tag.updateMany(
    { items: { $all: itemId } },
    { $pull: { items: itemId } },
    { multi: true }
  );
  await Collection.findByIdAndUpdate(
    collectionId,
    { $inc: { itemsQuantity: -1 } },
    { new: true }
  );
};

const handleCollectionDelete = async (collectionId: ObjectId) => {
  const itemsInCollection = await Item.find({ collectionId: collectionId });
  itemsInCollection.map(async (item) => await handleItemDelete(item._id, collectionId));
  await CustomField.deleteMany({ collectionId: collectionId });
  await Item.deleteMany({ collectionId: collectionId });
};

const handleUserDelete = async (userId: ObjectId) => {
  const collectionsByUser = await Collection.find({ ownerId: userId });
  collectionsByUser.map(
    async (collection) => await handleCollectionDelete(collection._id)
  );
  await Item.updateMany(
    { likes: { $all: userId } },
    { $pull: { likes: userId } },
    { multi: true }
  );
  await Comment.deleteMany({ authorId: userId });
  await Collection.deleteMany({ ownerId: userId });
};

const handleCustomFieldDelete = async (
  collectionId: ObjectId,
  customFieldId: ObjectId
) => {
  await Item.updateMany(
    { collectionId },
    { $pull: { customFields: { customFieldId } } },
    { multi: true }
  );
};

export {
  handleItemDelete,
  handleCollectionDelete,
  handleUserDelete,
  handleCustomFieldDelete,
};
