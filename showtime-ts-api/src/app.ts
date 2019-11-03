import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import logger from './utils/logger';
import cors from 'cors';

class App {
  public app: Application

  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.set('port', process.env.PORT || 3333);
    this.app.use(cors());
    this.app.use((req, res, next) => {
      if (!req.secure) {
        res.redirect(`https://${req.hostname}:${process.env.PORT + req.url}`);
      }
      next();
    });
    this.app.use(morgan('dev'));
    logger.info('Middlewares OK!');
  }

  private routes(): void {
    this.app.use('/user', userRoutes);
    this.app.get('/', (req, res) => {
      res.json({ message: 'Hello World' });
    });
    logger.info('Routes OK!');
  }
}

export default new App().app;
