/* eslint-disable no-trailing-spaces */
import express from 'express';

import { userController } from '../controllers';

const router = express.Router();

const {
  // eslint-disable-next-line indent
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} = userController;

router.route('/register').post(createUser);

router.route('/allUsers').get(getAllUsers);

router.route('/:id').patch(updateUser);

router.route('/:id').delete(deleteUser);

export default router;
