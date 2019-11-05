import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

userRoutes.route('/search').get(UserController.searchForUser);
userRoutes.route('/register').post(UserController.create);
// userRoutes.route('/update').put(UserController.updateUser);
// userRoutes.route('/delete').delete(UserController.deleteUser);

export default userRoutes;
