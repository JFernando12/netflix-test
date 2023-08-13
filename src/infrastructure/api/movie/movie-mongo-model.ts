import mongoose from 'mongoose';
import { PlatformDoc } from '../platform/platform-mongo-model';
import { ReviewDoc } from '../review/review-mongo-model';

export interface MovieAttrs {
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: PlatformDoc[];
  score: number;
  reviews: ReviewDoc[];
}

export interface MovieDoc extends mongoose.Document {
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: PlatformDoc[];
  score: number;
  reviews: ReviewDoc[];
  createdAt: Date;
  updatedAt: Date;
}

interface MovieModel extends mongoose.Model<MovieDoc> {
  build(attrs: MovieAttrs): MovieDoc;
}

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    director: {
      type: String,
    },
    platforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
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

movieSchema.statics.build = (attrs: MovieAttrs) => {
  return new Movie(attrs);
};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);

export { Movie as MovieMongo };
