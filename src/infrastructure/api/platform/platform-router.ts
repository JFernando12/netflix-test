import { Router } from 'express';
import { PlatformMongoRepository } from './platform-mongo-repository';
import { PlatformCases } from '../../../application/platform/platform-cases';
import { PlatformController } from './platform-controller';
import { uploadImage } from '../../middlewares';

const platformRepository = new PlatformMongoRepository();
const platformCases = new PlatformCases(platformRepository);
const platformController = new PlatformController(platformCases);

const router = Router();

// Get all platforms
router.get('/', platformController.getPlatforms.bind(platformController));

// Get platform by id
router.post(
  '/',
  uploadImage('icon'),
  platformController.createPlatform.bind(platformController)
);

// Create platform
router.delete(
  '/:id',
  platformController.deletePlatform.bind(platformController)
);

export { router as platformRouter };
