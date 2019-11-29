import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import userRoutes from './routes/userRoutes';
import logger from './utils/logger';
import { SES_SECRET } from './utils/secrets';
import { sessionStore } from './db';

class App {
  public app: Application

  private trustedProxy = false;

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
    if (process.env.DYNO) {
      this.trustedProxy = true;
    }
    this.app.set('trust proxy', this.trustedProxy);
    this.app.use(session({
      secret: `${SES_SECRET}`,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 172800000,
        secure: true,
        sameSite: true,
        httpOnly: false,
      },
      store: sessionStore,
      name: 'showtime-cookie',
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use((req, _res, next) => {
      if (!req.user
        && req.path !== '/user/login'
        && req.path !== '/user/signup') {
        if (req.session) req.session.returnTo = req.path;
      } else if (req.user && req.path === '/user/profile') {
        if (req.session) req.session.returnTo = req.path;
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
