import { Movie } from '../movie/movie-entity';
import { Platform } from '../platform/platform-entity';

export class Review {
  constructor(
    readonly id: string,
    readonly movie: Movie['id'],
    readonly platform: Platform['id'],
    readonly author: string,
    readonly body: string,
    readonly score: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
