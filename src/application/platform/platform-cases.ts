import { PlatformCreateDto, PlatformRepository } from '../../domain/platform';

export class PlatformCases {
  constructor(private readonly platformRepository: PlatformRepository) {
    this.platformRepository = platformRepository;
  }

  async getPlatforms() {
    return await this.platformRepository.getPlatforms();
  }

  async createPlatform(platformCreateDto: PlatformCreateDto) {
    return await this.platformRepository.createPlatform(platformCreateDto);
  }

  async deletePlatform(platformId: string) {
    return await this.platformRepository.deletePlatform(platformId);
  }
}
