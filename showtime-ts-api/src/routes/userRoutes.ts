import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import isAuthenticated from '../auth/passport';

const userRoutes = Router();

userRoutes.route('/login').post(UserController.login);
userRoutes.route('/logout').post(UserController.logout);
userRoutes.route('/signup').post(UserController.signUp);
userRoutes.route('/update').put(isAuthenticated, UserController.updateUser);
// userRoutes.route('/delete').delete(UserController.deleteUser);

export default userRoutes;
