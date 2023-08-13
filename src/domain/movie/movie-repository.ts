import { MovieCreateDto, MovieUpdateDto } from './movie-dto';
import { Movie } from './movie-entity';

export interface MovieRepository {
  getMovies(): Promise<Movie[] | null>;
  getMovieById(id: string): Promise<Movie | null>;
  createMovie(movie: MovieCreateDto): Promise<Movie | null>;
  updateMovie(id: string, movie: MovieUpdateDto): Promise<Movie | null>;
  deleteMovie(id: string): Promise<Movie | null>;
  cloneMovie(id: string): Promise<Movie | null>;
}
