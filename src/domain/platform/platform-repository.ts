import { PlatformCreateDto } from './platform-dto';
import { Platform } from './platform-entity';

export interface PlatformRepository {
  getPlatforms(): Promise<Platform[] | null>;
  createPlatform(platform: PlatformCreateDto): Promise<Platform | null>;
  deletePlatform(id: string): Promise<Platform | null>;
}
