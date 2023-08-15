import {
  MovieCreateDto,
  MovieRepository,
  Movie,
  MovieUpdateDto,
} from '../../../domain/movie';
import { Review } from '../../../domain/review';
import { ElementNotFoundError } from '../../errors';
import { PlatformMongo } from '../platform/platform-mongo-model';
import { ReviewDoc } from '../review/review-mongo-model';
import { MovieMongo } from './movie-mongo-model';

export class MovieMongoRepository implements MovieRepository {
  async getMovies(params: { offset: number; limit: number }): Promise<Movie[]> {
    const movies = await MovieMongo.find()
      .skip(params.offset)
      .limit(params.limit);

    const moviesList = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        image: movie.image,
        director: movie.director,
        platforms: movie.platforms as string[],
        score: movie.score,
        reviews: movie.reviews as string[],
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      };
    });

    return moviesList;
  }

  async getMovieById(id: string): Promise<Movie> {
    const movie = await MovieMongo.findById(id)
      .populate('platforms')
      .populate('reviews');

    if (!movie) {
      throw new ElementNotFoundError('Movie not found');
    }

    const reviewsByPlatform: { [platform: string]: Review[] } = {};
    const reviews = movie.reviews as ReviewDoc[];
    for (const platform of movie.platforms) {
      const currentReviews = reviews.filter(
        (review) => review.platform.toString() === platform._id.toString()
      );

      reviewsByPlatform[platform.title] = currentReviews.map((review) => {
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
      platforms: movie.platforms as string[],
      score: movie.score,
      reviews: reviewsByPlatform,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async createMovie(movieCreateDto: MovieCreateDto): Promise<Movie> {
    const platforms = await PlatformMongo.find({
      _id: { $in: movieCreateDto.platforms },
    });

    if (platforms.length !== movieCreateDto.platforms.length) {
      throw new ElementNotFoundError('Platforms not found, please check ids');
    }

    const slug = movieCreateDto.title
      .toLocaleLowerCase()
      .replace(/ /g, '-')
      .replace(/:/g, '');

    const data = {
      title: movieCreateDto.title,
      slug,
      image: movieCreateDto.image,
      director: movieCreateDto.director,
      platforms: movieCreateDto.platforms,
    };

    const newMovie = MovieMongo.build(data);
    await newMovie.save();

    return {
      id: newMovie.id,
      title: newMovie.title,
      slug: newMovie.slug,
      image: newMovie.image,
      director: newMovie.director,
      platforms: newMovie.platforms as string[],
      score: newMovie.score,
      reviews: {},
      createdAt: newMovie.createdAt,
      updatedAt: newMovie.updatedAt,
    };
  }

  async updateMovie(
    id: string,
    movieUpdateDto: MovieUpdateDto
  ): Promise<Movie> {
    const movie = await MovieMongo.findById(id);

    if (!movie) {
      throw new ElementNotFoundError('Movie not found');
    }

    const platforms = movieUpdateDto.platforms
      ? await PlatformMongo.find({
          _id: { $in: movieUpdateDto.platforms },
        })
      : [];

    if (platforms.length !== movieUpdateDto.platforms?.length) {
      throw new ElementNotFoundError('Platforms not found, please check ids');
    }

    const newData = {
      ...(movieUpdateDto?.title && { title: movieUpdateDto.title }),
      ...(movieUpdateDto?.image && { image: movieUpdateDto.image }),
      ...(movieUpdateDto?.director && { director: movieUpdateDto.director }),
      ...(movieUpdateDto?.platforms && {
        platforms: platforms.map((platform) => platform._id),
      }),
      ...(movieUpdateDto?.title && {
        slug: movieUpdateDto.title
          .toLocaleLowerCase()
          .replace(/ /g, '-')
          .replace(/:/g, ''),
      }),
    };

    movie.set(newData);
    await movie.save();

    return {
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms as string[],
      score: movie.score,
      reviews: movie.reviews as string[],
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async deleteMovie(id: string): Promise<Movie> {
    const movie = await MovieMongo.findByIdAndDelete(id);

    if (!movie) {
      throw new ElementNotFoundError('Movie not found');
    }

    return {
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms as string[],
      score: movie.score,
      reviews: movie.reviews as string[],
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async cloneMovie(id: string): Promise<Movie> {
    const movie = await MovieMongo.findById(id);

    if (!movie) {
      throw new ElementNotFoundError('Movie not found');
    }

    const data = {
      title: movie.title,
      slug: movie.slug,
      image: movie.image,
      director: movie.director,
      platforms: movie.platforms,
    };

    const newMovie = MovieMongo.build(data);
    await newMovie.save();

    return {
      id: newMovie.id,
      title: newMovie.title,
      slug: newMovie.slug,
      image: newMovie.image,
      director: newMovie.director,
      platforms: newMovie.platforms as string[],
      score: newMovie.score,
      reviews: {},
      createdAt: newMovie.createdAt,
      updatedAt: newMovie.updatedAt,
    };
  }
}
