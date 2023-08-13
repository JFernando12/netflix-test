import mongoose from 'mongoose';
import { app } from './infrastructure/api/server';
import { config } from 'dotenv';
config();

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
