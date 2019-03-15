import express from 'express';

import { userController } from '../controllers';

const router = express.Router();

const {
  createUser,
  getOneUser,
  getAllUsers,
  updateUserDetails,
  deleteUser
} = userController;

router.route('/register').post(createUser);

router.route('/allUsers').get(getAllUsers);

router.route('/:id').get(getOneUser);

router.route('/:id').patch(updateUserDetails);

router.route('/:id').delete(deleteUser);

export default router;
