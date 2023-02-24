import mongoose from 'mongoose';

const { Schema } = mongoose;
const userScheme = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    roles: [
      {
        type: String,
        ref: 'Role',
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('User', userScheme);
