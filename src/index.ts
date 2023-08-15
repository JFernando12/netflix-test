import mongoose from 'mongoose';
import { app } from './infrastructure/api/server';
import { MONGO_URI, PORT } from './shared/config/envs';

const start = async () => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log('Listening on port 3000');
  });
};

start();
