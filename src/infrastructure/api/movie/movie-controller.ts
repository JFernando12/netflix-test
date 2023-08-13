import { Request, Response } from 'express';
import { MovieCases } from '../../../application/movie/movie-cases';
import response from '../../../shared/network/response';

export class MovieController {
  constructor(private readonly movieCases: MovieCases) {}

  async getMovies(req: Request, res: Response) {
    try {
      const movies = await this.movieCases.getMovies();
      response.success(req, res, 200, movies);
    } catch (error) {
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
      const movie = await this.movieCases.createMovie(req.body);
      response.success(req, res, 201, movie);
    } catch (error) {
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
