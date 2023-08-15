import { Platform, PlatformRepository } from '../../../domain/platform';
import { ElementNotFoundError } from '../../errors';
import { PlatformMongo } from './platform-mongo-model';

export class PlatformMongoRepository implements PlatformRepository {
  async getPlatforms(): Promise<Platform[]> {
    const platforms = await PlatformMongo.find();

    const platformsList = platforms.map((platform) => {
      return {
        id: platform.id,
        icon: platform.icon,
        title: platform.title,
        createdAt: platform.createdAt,
        updatedAt: platform.updatedAt,
      };
    });

    return platformsList;
  }

  async createPlatform(platform: Platform): Promise<Platform> {
    const newPlatform = PlatformMongo.build(platform);
    await newPlatform.save();

    return {
      id: newPlatform.id,
      icon: newPlatform.icon,
      title: newPlatform.title,
      createdAt: newPlatform.createdAt,
      updatedAt: newPlatform.updatedAt,
    };
  }

  async deletePlatform(id: string): Promise<Platform> {
    const platform = await PlatformMongo.findByIdAndDelete(id);

    if (!platform) {
      throw new ElementNotFoundError('Platform not found');
    }

    return {
      id: platform.id,
      icon: platform.icon,
      title: platform.title,
      createdAt: platform.createdAt,
      updatedAt: platform.updatedAt,
    };
  }
}
