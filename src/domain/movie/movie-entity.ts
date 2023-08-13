import { Platform } from '../platform/platform-entity';
import { Review } from '../review/review-entity';

export class Movie {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly slug: string,
    readonly image: string,
    readonly director: string,
    readonly platforms: Platform[],
    readonly score: number,
    readonly reviews: Review['id'][] | { [platform: string]: Review[] },
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
