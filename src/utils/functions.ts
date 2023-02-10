import jwt from 'jsonwebtoken';

import Comment from '../models/comment';
import Tag from '../models/tag';

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

export { generateToken, handleItemDelete };
