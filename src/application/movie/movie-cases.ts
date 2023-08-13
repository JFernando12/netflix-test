import { MovieCreateDto, MovieUpdateDto } from '../../domain/movie';
import { MovieRepository } from '../../domain/movie/movie-repository';

export class MovieCases {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getMovies() {
    return await this.movieRepository.getMovies();
  }

  async getMovieById(id: string) {
    return await this.movieRepository.getMovieById(id);
  }

  async createMovie(movie: MovieCreateDto) {
    return await this.movieRepository.createMovie(movie);
  }

  async updateMovie(id: string, movie: MovieUpdateDto) {
    return await this.movieRepository.updateMovie(id, movie);
  }

  async deleteMovie(id: string) {
    return await this.movieRepository.deleteMovie(id);
  }

  async cloneMovie(id: string) {
    return await this.movieRepository.cloneMovie(id);
  }
}
