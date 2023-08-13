import express, { Router } from 'express';
import { PlatformMongoRepository } from './platform-mongo-repository';
import { PlatformCases } from '../../../application/platform/platform-cases';
import { PlatformController } from './platform-controller';

const platformRepository = new PlatformMongoRepository();
const platformCases = new PlatformCases(platformRepository);
const platformController = new PlatformController(platformCases);

const router = Router();

router.get('/', platformController.getPlatforms.bind(platformController));

router.post('/', platformController.createPlatform.bind(platformController));

router.delete(
  '/:id',
  platformController.deletePlatform.bind(platformController)
);

export { router as platformRouter };
