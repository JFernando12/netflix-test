import { Request, Response } from 'express';
import { PlatformCases } from '../../../application/platform/platform-cases';
import response from '../../../shared/network/response';

export class PlatformController {
  constructor(private readonly platformCases: PlatformCases) {}

  async getPlatforms(req: Request, res: Response) {
    try {
      const platforms = await this.platformCases.getPlatforms();
      response.success(req, res, 200, platforms);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async createPlatform(req: Request, res: Response) {
    try {
      const platform = await this.platformCases.createPlatform(req.body);
      response.success(req, res, 201, platform);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async deletePlatform(req: Request, res: Response) {
    try {
      const platform = await this.platformCases.deletePlatform(req.params.id);
      response.success(req, res, 200, platform);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }
}
