import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ReviewCases } from '../../../application/review/review-cases';
import response from '../../network/response';
import { ReviewCreateDto } from '../../../domain/review';

export class ReviewController {
  constructor(private readonly reviewCases: ReviewCases) {}

  async createReview(req: Request, res: Response) {
    const body: ReviewCreateDto = req.body;

    if (!body.movie || !mongoose.Types.ObjectId.isValid(body.movie)) {
      return response.error(req, res, 400, 'Movie is required');
    }

    if (!body.platform || !mongoose.Types.ObjectId.isValid(body.platform)) {
      return response.error(req, res, 400, 'Platform is required');
    }

    if (!body.author) {
      return response.error(req, res, 400, 'Author is required');
    }

    if (!body.body) {
      return response.error(req, res, 400, 'Body is required');
    }

    if (body.score < 0 || body.score > 5) {
      return response.error(req, res, 400, 'Score must be between 0 and 5');
    }

    const review = await this.reviewCases.createReview(req.body);
    response.success(req, res, 201, review, 'Successfully created');
  }
}
