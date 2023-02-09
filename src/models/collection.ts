import mongoose from 'mongoose';

const { Schema } = mongoose;
const collectionScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    theme: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Collection', collectionScheme);
