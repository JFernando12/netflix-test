import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { movieRouter } from './movie/movie-router';
import { platformRouter } from './platform/platform-router';
import { reviewRouter } from './review/review-router';

const app = express();

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug
app.use(morgan('dev'));

// CORS
app.use(cors());

// Routes
app.use('/movie', movieRouter);
app.use('/platform', platformRouter);
app.use('/review', reviewRouter);

export { app };
