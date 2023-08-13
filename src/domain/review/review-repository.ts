import { ReviewCreateDto } from './review-dto';
import { Review } from './review-entity';

export interface ReviewRepository {
  getReviewsByMovieId(movieId: string): Promise<Review[] | null>;
  createReview(review: ReviewCreateDto): Promise<Review | null>;
}
