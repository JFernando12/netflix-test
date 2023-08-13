import { Request, Response } from 'express';
import { ReviewCases } from '../../../application/review/review-cases';
import response from '../../../shared/network/response';

export class ReviewController {
  constructor(private readonly reviewCases: ReviewCases) {}

  async getReviewsByMovieId(req: Request, res: Response) {
    try {
      const reviews = await this.reviewCases.getReviewsByMovieId(
        req.params.movieId
      );
      response.success(req, res, 200, reviews);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      const review = await this.reviewCases.createReview(req.body);
      response.success(req, res, 201, review);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }
}
