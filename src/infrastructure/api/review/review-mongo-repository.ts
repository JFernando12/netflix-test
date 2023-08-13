import {
  Review,
  ReviewCreateDto,
  ReviewRepository,
} from '../../../domain/review';
import { MovieMongo } from '../movie/movie-mongo-model';
import { ReviewMongo } from './review-mongo-model';

export class ReviewMongoRepository implements ReviewRepository {
  async createReview(reviewCreateDto: ReviewCreateDto): Promise<Review | null> {
    const movie = await MovieMongo.findById(reviewCreateDto.movie);
    if (!movie) {
      return null;
    }

    const platform = movie.platforms.find(
      (platform) => platform.toString() === reviewCreateDto.platform
    );
    if (!platform) {
      return null;
    }

    const newReview = ReviewMongo.build(reviewCreateDto);
    await newReview.save();

    movie.reviews.push(newReview._id);
    await movie.save();

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
