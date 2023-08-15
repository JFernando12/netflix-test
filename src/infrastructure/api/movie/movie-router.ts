import { Router } from 'express';
import { MovieController } from './movie-controller';
import { MovieCases } from '../../../application/movie/movie-cases';
import { MovieMongoRepository } from './movie-mongo-repository';
import { uploadImage } from '../../middlewares';

const movieRepository = new MovieMongoRepository();
const movieCases = new MovieCases(movieRepository);
const movieController = new MovieController(movieCases);

const router = Router();

// Get all movies
router.get('/', movieController.getMovies.bind(movieController));

// Get movie by id
router.get('/:id', movieController.getMovieById.bind(movieController));

// Create movie
router.post(
  '/',
  uploadImage('image'),
  movieController.createMovie.bind(movieController)
);

// Update movie
router.put(
  '/:id',
  uploadImage('image'),
  movieController.updateMovie.bind(movieController)
);

// Delete movie
router.delete('/:id', movieController.deleteMovie.bind(movieController));

// Clone movie
router.post('/clone/:id', movieController.cloneMovie.bind(movieController));

export { router as movieRouter };
