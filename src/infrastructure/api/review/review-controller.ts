import { Request, Response } from 'express';
import { ReviewCases } from '../../../application/review/review-cases';
import response from '../../../shared/network/response';

export class ReviewController {
  constructor(private readonly reviewCases: ReviewCases) {}

  async createReview(req: Request, res: Response) {
    try {
      const review = await this.reviewCases.createReview(req.body);
      response.success(req, res, 201, review);
    } catch (error) {
      console.log(error);
      response.error(req, res, 500, 'Internal server error');
    }
  }
}
