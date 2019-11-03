import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

// userRoutes.route('/list').get();
userRoutes.route('/register').post(new UserController().create);
// userRoutes.route('/update').put(UserController.updateUser);
// userRoutes.route('/delete').delete(UserController.deleteUser);

export default userRoutes;
