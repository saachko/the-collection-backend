import mongoose from 'mongoose';

const { Schema } = mongoose;
const roleScheme = new Schema(
  {
    value: {
      type: String,
      unique: true,
      default: 'user',
    },
  },
  { versionKey: false }
);

export default mongoose.model('Role', roleScheme);
