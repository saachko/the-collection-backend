import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://naztya12323:${process.env.DB_PASSWORD}@cluster0.ov8yi38.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log('server started'));
  } catch (error) {
    throw new Error(`${error}`);
  }
};

start();
