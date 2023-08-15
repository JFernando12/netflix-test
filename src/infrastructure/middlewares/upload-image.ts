import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_KEY,
} from '../../shared/config/envs';

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET,
    contentType: function (
      _req: Request,
      _file: Express.Multer.File,
      cb: (error: Error | null, mime: string | undefined) => void
    ): void {
      cb(null, 'image/jpeg');
    },
    acl: 'public-read',
    metadata: function (
      _req: Request,
      _file: Express.Multer.File,
      cb: (error: Error | null, metadata: { fieldName: string }) => void
    ): void {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, key: string) => void
    ): void {
      cb(null, file.originalname);
    },
  }),
});

const uploadImage = (fieldName: string) => {
  return upload.single(fieldName);
};

export { uploadImage };
