import mongoose from 'mongoose';

const { Schema } = mongoose;

const customFieldScheme = new Schema({
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
});

const itemScheme = new Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    collectionTheme: {
      type: String,
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: '',
      },
    ],
    customFields: [customFieldScheme],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Item', itemScheme);
