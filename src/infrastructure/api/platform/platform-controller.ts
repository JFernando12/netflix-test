import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { PlatformCases } from '../../../application/platform/platform-cases';
import response from '../../network/response';
import { PlatformCreateDto } from '../../../domain/platform';

export class PlatformController {
  constructor(private readonly platformCases: PlatformCases) {}

  async getPlatforms(req: Request, res: Response) {
    const platforms = await this.platformCases.getPlatforms();
    response.success(req, res, 200, platforms, 'Successfully processed');
  }

  async createPlatform(req: Request, res: Response) {
    const body = req.body;
    const file = req.file as Express.MulterS3.File;
    const icon = file?.location;

    if (!icon) {
      return response.error(req, res, 400, 'Icon is required');
    }

    if (!body.title) {
      return response.error(req, res, 400, 'Name is required');
    }

    const data: PlatformCreateDto = {
      title: body.title,
      icon,
    };

    const platform = await this.platformCases.createPlatform(data);
    response.success(req, res, 201, platform, 'Successfully created');
  }

  async deletePlatform(req: Request, res: Response) {
    const platformId = req.params.id;

    if (!platformId || !mongoose.Types.ObjectId.isValid(platformId)) {
      return response.error(req, res, 400, 'Platform ID is required');
    }

    const platform = await this.platformCases.deletePlatform(req.params.id);
    response.success(req, res, 200, platform, 'Successfully deleted');
  }
}
