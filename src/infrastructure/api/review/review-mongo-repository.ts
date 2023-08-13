import {
  Review,
  ReviewCreateDto,
  ReviewRepository,
} from '../../../domain/review';
import { ReviewMongo } from './review-mongo-model';

export class ReviewMongoRepository implements ReviewRepository {
  async getReviewsByMovieId(movieId: string): Promise<Review[] | null> {
    const reviews = await ReviewMongo.find({ movie: movieId });

    return reviews.map((review) => ({
      id: review.id,
      movie: review.movie,
      platform: review.platform,
      author: review.author,
      body: review.body,
      score: review.score,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));
  }

  async createReview(reviewCreateDto: ReviewCreateDto): Promise<Review | null> {
    const newReview = ReviewMongo.build(reviewCreateDto);
    await newReview.save();

    return {
      id: newReview.id,
      movie: newReview.movie,
      platform: newReview.platform,
      author: newReview.author,
      body: newReview.body,
      score: newReview.score,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt,
    };
  }
}
