import { Router } from 'express';
import { ReviewController } from './review-controller';
import { ReviewCases } from '../../../application/review/review-cases';
import { ReviewMongoRepository } from './review-mongo-repository';

const reviewRepository = new ReviewMongoRepository();
const reviewCases = new ReviewCases(reviewRepository);
const reviewController = new ReviewController(reviewCases);

const router = Router();

router.get(
  '/:movieId',
  reviewController.getReviewsByMovieId.bind(reviewController)
);

router.post('/', reviewController.createReview.bind(reviewController));

export { router as reviewRouter };
