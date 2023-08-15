import { MovieCreateDto, MovieUpdateDto } from './movie-dto';
import { Movie } from './movie-entity';

export interface MovieRepository {
  getMovies(params: { offset: number; limit: number }): Promise<Movie[]>;
  getMovieById(id: string): Promise<Movie>;
  createMovie(movie: MovieCreateDto): Promise<Movie>;
  updateMovie(id: string, movie: MovieUpdateDto): Promise<Movie>;
  deleteMovie(id: string): Promise<Movie>;
  cloneMovie(id: string): Promise<Movie>;
}
