import mongoose from 'mongoose';

export interface ReviewAttrs {
  movie: string;
  platform: string;
  author: string;
  body: string;
  score: number;
}

export interface ReviewDoc extends mongoose.Document {
  id: string;
  movie: string;
  platform: string;
  author: string;
  body: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewModel extends mongoose.Model<ReviewDoc> {
  build(attrs: ReviewAttrs): ReviewDoc;
}

const reviewSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

reviewSchema.statics.build = (attrs: ReviewAttrs) => {
  return new Review(attrs);
};

const Review = mongoose.model<ReviewDoc, ReviewModel>('Review', reviewSchema);

export { Review as ReviewMongo };
