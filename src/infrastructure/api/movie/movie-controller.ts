import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MovieCases } from '../../../application/movie/movie-cases';
import response from '../../network/response';
import { MovieCreateDto, MovieUpdateDto } from '../../../domain/movie';

export class MovieController {
  constructor(private readonly movieCases: MovieCases) {}

  async getMovies(req: Request, res: Response) {
    const { offset, limit } = req.query;

    if (offset && isNaN(Number(offset))) {
      return response.error(req, res, 400, 'Offset must be a number');
    }

    if (limit && isNaN(Number(limit))) {
      return response.error(req, res, 400, 'Limit must be a number');
    }

    const params = {
      offset: offset ? Number(offset) : 0,
      limit: limit ? Number(limit) : 20,
    };

    const movies = await this.movieCases.getMovies(params);
    response.success(req, res, 200, movies, 'Successfully processed', params);
  }

  async getMovieById(req: Request, res: Response) {
    const movieId = req.params.id;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return response.error(req, res, 400, 'Movie ID is required');
    }

    const movie = await this.movieCases.getMovieById(movieId);
    response.success(req, res, 200, movie, 'Successfully processed');
  }

  async createMovie(req: Request, res: Response) {
    const body = req.body;
    const file = req.file as Express.MulterS3.File;
    const image = file?.location;

    if (!image) {
      return response.error(req, res, 400, 'Image is required');
    }

    if (!body.title) {
      return response.error(req, res, 400, 'Title is required');
    }

    if (!body.director) {
      return response.error(req, res, 400, 'Director is required');
    }

    const platformsParsed = body.platforms
      ? JSON.parse(body.platforms)
      : undefined;
    if (!Array.isArray(platformsParsed)) {
      return response.error(req, res, 400, 'Invalid platform IDs');
    }

    const ObjectId = mongoose.Types.ObjectId;
    const isValidPlatformIds = platformsParsed.every(
      (
        platformId:
          | string
          | number
          | mongoose.mongo.BSON.ObjectId
          | mongoose.mongo.BSON.ObjectIdLike
          | Uint8Array
      ) => ObjectId.isValid(platformId)
    );
    if (!isValidPlatformIds) {
      return response.error(req, res, 400, 'Invalid platform IDs');
    }

    const data: MovieCreateDto = {
      image,
      title: body.title,
      director: body.director,
      platforms: platformsParsed,
    };

    const movie = await this.movieCases.createMovie(data);
    response.success(req, res, 201, movie, 'Successfully created');
  }

  async updateMovie(req: Request, res: Response) {
    const movieId = req.params.id;
    const body = req.body;
    const file = req.file as Express.MulterS3.File;
    const image = file?.location;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return response.error(req, res, 400, 'Movie ID is required');
    }

    const platformsParsed = body.platforms
      ? JSON.parse(body.platforms)
      : undefined;
    if (platformsParsed && !Array.isArray(platformsParsed)) {
      return response.error(req, res, 400, 'Invalid platform IDs');
    }

    if (platformsParsed) {
      const ObjectId = mongoose.Types.ObjectId;
      const isValidPlatformIds = platformsParsed.every(
        (
          platformId:
            | string
            | number
            | mongoose.mongo.BSON.ObjectId
            | mongoose.mongo.BSON.ObjectIdLike
            | Uint8Array
        ) => ObjectId.isValid(platformId)
      );
      if (!isValidPlatformIds) {
        return response.error(req, res, 400, 'Invalid platform IDs');
      }
    }

    const data: MovieUpdateDto = {
      image,
      ...body,
      platforms: platformsParsed,
    };

    const movie = await this.movieCases.updateMovie(req.params.id, data);
    response.success(req, res, 200, movie, 'Successfully updated');
  }

  async deleteMovie(req: Request, res: Response) {
    const movieId = req.params.id;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return response.error(req, res, 400, 'Movie ID is required');
    }

    const movie = await this.movieCases.deleteMovie(movieId);
    response.success(req, res, 200, movie, 'Successfully deleted');
  }

  async cloneMovie(req: Request, res: Response) {
    const movieId = req.params.id;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return response.error(req, res, 400, 'Movie ID is required');
    }

    const movie = await this.movieCases.cloneMovie(movieId);
    response.success(req, res, 200, movie, 'Successfully cloned');
  }
}
