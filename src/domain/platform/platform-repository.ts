import { PlatformCreateDto } from './platform-dto';
import { Platform } from './platform-entity';

export interface PlatformRepository {
  getPlatforms(): Promise<Platform[]>;
  createPlatform(platform: PlatformCreateDto): Promise<Platform>;
  deletePlatform(id: string): Promise<Platform>;
}
