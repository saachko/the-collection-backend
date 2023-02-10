import mongoose from 'mongoose';

const { Schema } = mongoose;
const itemScheme = new Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      ref: ['User'],
    },
    customFields: [
      {
        customFieldId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CustomField',
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Item', itemScheme);