import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY!;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!;
