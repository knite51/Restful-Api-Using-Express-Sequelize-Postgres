import express from 'express';

import { userController } from '../controllers';
import { userValidation } from '../middlewares';

const router = express.Router();

const {
  checkRequiredUserFields,
  checkEmptyUserFields,
  checkIfIdentifierIsInUse,
  checkIfUserExists,
  ensureUserParamIsValid,
  validatePassword,
  validateEmail,
  validateUsername
} = userValidation;

const {
  createUser,
  getOneUser,
  getAllUsers,
  updateUserDetails,
  deleteUser
} = userController;

router
  .route('/register')
  .post(
    checkRequiredUserFields,
    checkEmptyUserFields,
    validateUsername,
    validateEmail,
    checkIfIdentifierIsInUse,
    validatePassword,
    createUser
  );

router.route('/allUsers').get(getAllUsers);

router
  .route('/:id')
  .all(ensureUserParamIsValid, checkIfUserExists)
  .get(getOneUser)
  .patch(
    validateUsername,
    validateEmail,
    checkIfIdentifierIsInUse,
    updateUserDetails
  )
  .delete(deleteUser);

export default router;
