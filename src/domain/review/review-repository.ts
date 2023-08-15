import { ReviewCreateDto } from './review-dto';
import { Review } from './review-entity';

export interface ReviewRepository {
  createReview(review: ReviewCreateDto): Promise<Review>;
}
