import { Request, Response } from 'express';
import { MovieCases } from '../../../application/movie/movie-cases';
import response from '../../../shared/network/response';
import { MovieCreateDto } from '../../../domain/movie';

export class MovieController {
  constructor(private readonly movieCases: MovieCases) {}

  async getMovies(req: Request, res: Response) {
    try {
      const { skip, limit } = req.query;

      const params = {
        skip: skip ? Number(skip) : undefined,
        limit: limit ? Number(limit) : undefined,
      };

      const movies = await this.movieCases.getMovies(params);
      response.success(req, res, 200, movies);
    } catch (error) {
      console.log(error);
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async getMovieById(req: Request, res: Response) {
    try {
      const movie = await this.movieCases.getMovieById(req.params.id);
      response.success(req, res, 200, movie);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async createMovie(req: Request, res: Response) {
    try {
      const body: MovieCreateDto = req.body;

      if (!body.title) {
        return response.error(req, res, 400, 'Title is required');
      }

      if (!body.image) {
        return response.error(req, res, 400, 'Image is required');
      }

      if (!body.director) {
        return response.error(req, res, 400, 'Director is required');
      }

      if (!body.platforms) {
        return response.error(req, res, 400, 'Platforms is required');
      }

      const movie = await this.movieCases.createMovie(body);
      response.success(req, res, 201, movie);
    } catch (error) {
      console.log(error);
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async updateMovie(req: Request, res: Response) {
    try {
      const movie = await this.movieCases.updateMovie(req.params.id, req.body);
      response.success(req, res, 200, movie);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async deleteMovie(req: Request, res: Response) {
    try {
      const movie = await this.movieCases.deleteMovie(req.params.id);
      response.success(req, res, 200, movie);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }

  async cloneMovie(req: Request, res: Response) {
    try {
      const movie = await this.movieCases.cloneMovie(req.params.id);
      response.success(req, res, 200, movie);
    } catch (error) {
      response.error(req, res, 500, 'Internal server error');
    }
  }
}
