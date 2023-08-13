import { ReviewCreateDto } from '../../domain/review';
import { ReviewRepository } from '../../domain/review/review-repository';

export class ReviewCases {
  constructor(private readonly reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async createReview(reviewCreateDto: ReviewCreateDto) {
    return await this.reviewRepository.createReview(reviewCreateDto);
  }
}
