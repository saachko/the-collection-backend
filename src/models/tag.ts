import mongoose from 'mongoose';

const { Schema } = mongoose;
const tagScheme = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        default: '',
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model('Tag', tagScheme);
