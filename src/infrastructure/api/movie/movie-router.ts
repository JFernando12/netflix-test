import { Router } from 'express';
import { MovieController } from './movie-controller';
import { MovieCases } from '../../../application/movie/movie-cases';
import { MovieMongoRepository } from './movie-mongo-repository';

const movieRepository = new MovieMongoRepository();
const movieCases = new MovieCases(movieRepository);
const movieController = new MovieController(movieCases);

const router = Router();

router.get('/', movieController.getMovies.bind(movieController));

router.get('/:id', movieController.getMovieById.bind(movieController));

router.post('/', movieController.createMovie.bind(movieController));

router.put('/:id', movieController.updateMovie.bind(movieController));

router.delete('/:id', movieController.deleteMovie.bind(movieController));

router.post('/:id/clone', movieController.cloneMovie.bind(movieController));

export { router as movieRouter };
