import mongoose from 'mongoose';
import { PlatformDoc } from '../platform/platform-mongo-model';
import { ReviewDoc } from '../review/review-mongo-model';

export interface MovieAttrs {
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: PlatformDoc['id'][] | PlatformDoc[];
  reviews: ReviewDoc['id'][] | ReviewDoc[];
}

export interface MovieDoc extends mongoose.Document {
  title: string;
  slug: string;
  image: string;
  director: string;
  platforms: PlatformDoc['id'][] | PlatformDoc[];
  score: number;
  reviews: ReviewDoc['id'][] | ReviewDoc[];
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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    score: {
      type: Number,
      default: 0,
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

movieSchema.pre<MovieDoc>('save', async function (next) {
  const reviewScores: number[] = (
    (await this.populate('reviews')).reviews as ReviewDoc[]
  ).map((review) => review.score);

  if (reviewScores.length === 0) {
    this.score = 0;
  } else {
    const totalScore = reviewScores.reduce((acc, score) => acc + score, 0);
    this.score = parseFloat((totalScore / reviewScores.length).toFixed(1));
  }

  next();
});

movieSchema.statics.build = (attrs: MovieAttrs) => {
  return new Movie(attrs);
};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);

export { Movie as MovieMongo };
