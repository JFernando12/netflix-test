import {
  MovieCreateDto,
  MovieRepository,
  Movie,
  MovieUpdateDto,
} from '../../../domain/movie';
import { Review } from '../../../domain/review';
import { PlatformMongo } from '../platform/platform-mongo-model';
import { ReviewMongo } from '../review/review-mongo-model';
import { MovieMongo } from './movie-mongo-model';

export class MovieMongoRepository implements MovieRepository {
  async getMovies(): Promise<Movie[] | null> {
    const movies = await MovieMongo.find();

    const moviesList = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        image: movie.image,
        director: movie.director,
        platforms: movie.platforms.map((platform) => {
          return {
            id: platform.id,
            icon: platform.icon,
            title: platform.title,
            createdAt: platform.createdAt,
            updatedAt: platform.updatedAt,
          };
        }),
        score: movie.score,
        reviews: movie.reviews.map((review) => {
          return review.id;
        }),
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      };
    });

    return moviesList;
  }

  async getMovieById(id: string): Promise<Movie | null> {
    const movie = await MovieMongo.findById(id);

    if (!movie) {
      return null;
    }

    const reviewsByPlatform: { [platform: string]: Review[] } = {};

    for (const platform of movie.platforms) {
      const reviews = await ReviewMongo.find({ id: movie.id, platform });
      reviewsByPlatform[platform.title] = reviews.map((review) => {
        return {
          id: review.id,
          movie: review.movie,
          platform: review.platform,
          author: review.author,
          body: review.body,
          score: review.score,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        };
      });
    }

    return {
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms.map((platform) => {
        return {
          id: platform.id,
          icon: platform.icon,
          title: platform.title,
          createdAt: platform.createdAt,
          updatedAt: platform.updatedAt,
        };
      }),
      score: movie.score,
      reviews: reviewsByPlatform,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async createMovie(movieCreateDto: MovieCreateDto): Promise<Movie | null> {
    const platforms = await PlatformMongo.find({
      id: { $in: movieCreateDto.platforms },
    });

    const data = {
      title: movieCreateDto.title,
      slug: movieCreateDto.slug,
      image: movieCreateDto.image,
      director: movieCreateDto.director,
      platforms: platforms,
      score: movieCreateDto.score,
      reviews: [],
    };

    const newMovie = MovieMongo.build(data);
    await newMovie.save();

    return {
      id: newMovie.id,
      title: newMovie.title,
      slug: newMovie.slug,
      image: newMovie.image,
      director: newMovie.director,
      platforms: newMovie.platforms.map((platform) => {
        return {
          id: platform.id,
          icon: platform.icon,
          title: platform.title,
          createdAt: platform.createdAt,
          updatedAt: platform.updatedAt,
        };
      }),
      score: newMovie.score,
      reviews: {},
      createdAt: newMovie.createdAt,
      updatedAt: newMovie.updatedAt,
    };
  }

  async updateMovie(
    id: string,
    movieUpdateDto: MovieUpdateDto
  ): Promise<Movie | null> {
    const movie = await MovieMongo.findById(id);

    if (!movie) {
      return null;
    }

    const platforms = await PlatformMongo.find({
      id: { $in: movieUpdateDto.platforms },
    });

    movie.set({
      title: movieUpdateDto.title,
      slug: movieUpdateDto.slug,
      image: movieUpdateDto.image,
      director: movieUpdateDto.director,
      platforms: platforms,
      score: movieUpdateDto.score,
    });

    await movie.save();

    return {
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms.map((platform) => {
        return {
          id: platform.id,
          icon: platform.icon,
          title: platform.title,
          createdAt: platform.createdAt,
          updatedAt: platform.updatedAt,
        };
      }),
      score: movie.score,
      reviews: movie.reviews.map((review) => {
        return review.id;
      }),
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async deleteMovie(id: string): Promise<Movie | null> {
    const movie = await MovieMongo.findByIdAndDelete(id);

    if (!movie) {
      return null;
    }

    return {
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms.map((platform) => {
        return {
          id: platform.id,
          icon: platform.icon,
          title: platform.title,
          createdAt: platform.createdAt,
          updatedAt: platform.updatedAt,
        };
      }),
      score: movie.score,
      reviews: movie.reviews.map((review) => {
        return review.id;
      }),
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async cloneMovie(id: string): Promise<Movie | null> {
    const movie = await MovieMongo.findById(id);

    if (!movie) {
      return null;
    }

    const data = {
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms,
      score: movie.score,
      reviews: movie.reviews,
    };

    const newMovie = MovieMongo.build(data);
    await newMovie.save();

    return {
      id: newMovie.id,
      title: newMovie.title,
      slug: newMovie.slug,
      image: newMovie.image,
      director: newMovie.director,
      platforms: newMovie.platforms.map((platform) => {
        return {
          id: platform.id,
          icon: platform.icon,
          title: platform.title,
          createdAt: platform.createdAt,
          updatedAt: platform.updatedAt,
        };
      }),
      score: newMovie.score,
      reviews: newMovie.reviews.map((review) => {
        return review.id;
      }),
      createdAt: newMovie.createdAt,
      updatedAt: newMovie.updatedAt,
    };
  }
}
