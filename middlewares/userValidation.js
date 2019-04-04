import { Op } from 'sequelize';
import models from '../models';
import { isEmpty, usernameTester, emailTester, uuidTester } from '../helpers';

const { Users } = models;

const bodyParams = ['username', 'email', 'password'];

export default {
  checkRequiredUserFields: (req, res, next) => {
    const requiredPayloadParams = [];

    bodyParams.forEach(param => {
      if (!Object.keys(req.body).includes(param)) {
        requiredPayloadParams.push(`${param} is required`);
      }
    });

    if (requiredPayloadParams.length) {
      const error = new Error(JSON.stringify(requiredPayloadParams));
      error.status = 400;
      return next(error);
    }

    return next();
  },

  checkEmptyUserFields(req, res, next) {
    const emptyPayloadParams = [];

    bodyParams.forEach(param => {
      if (isEmpty(req.body[param])) {
        emptyPayloadParams.push(`${param} cannot be empty`);
      }
    });

    if (emptyPayloadParams.length) {
      const error = new Error(JSON.stringify(emptyPayloadParams));
      error.status = 400;
      return next(error);
    }

    return next();
  },

  async checkIfIdentifierIsInUse(req, res, next) {
    let { username, email } = req.body;
    username = username && username.trim();
    email = email && email.trim();
    const userByUsername = await Users.findOne({
      where: { username: { [Op.regexp]: `^${username}$` } }
    });
    const userByEmail = await Users.findOne({
      where: { email: { [Op.regexp]: `^${email}$` } }
    });
    if (userByUsername && req.params.id !== userByUsername.id) {
      const error = new Error('Username already in use');
      error.status = 409;
      return next(error);
    } else if (userByEmail && req.params.id !== userByEmail.id) {
      const error = new Error('Email already in use');
      error.status = 409;
      return next(error);
    }
    return next();
  },

  async checkIfUserExists(req, res, next) {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      const error = new Error(`No user with id ${req.params.id}`);
      error.status = 404;
      return next(error);
    }
    return next();
  },

  ensureUserParamIsValid(req, res, next) {
    if (uuidTester(req.params.id)) return next();
    const error = new Error('Invalid uuid user id param');
    error.status = 400;
    return next(error);
  },

  validatePassword(req, res, next) {
    const validPasswordRegex = /^[a-zA-Z0-9]{8,32}$/;

    const message = `The password failed to match the following rules
      <br>
      1. It must contain ONLY lower case, upper case or numerics
      <br>
      2. It must be at least 8 characters long, and not more than 32 characters
    `;

    if (!validPasswordRegex.test(req.body.password)) {
      const error = new Error(message);
      error.status = 400;
      return next(error);
    }

    return next();
  },

  validateEmail(req, res, next) {
    let { email } = req.body;
    email = email && email.trim();

    const message = 'The email address provided is invalid';

    if (typeof email === 'string' && !emailTester(email)) {
      const error = new Error(message);
      error.status = 400;
      return next(error);
    }

    return next();
  },

  validateUsername(req, res, next) {
    let { username } = req.body;
    username = username && username.trim();
    let message;
    if (typeof username === 'string' && username.length < 2) {
      message = 'Username must be at least two characters';
      const error = new Error(message);
      error.status = 400;
      return next(error);
    } else if (
      typeof username === 'string' &&
      username.length === 2 &&
      !/^[A-Z]{2}$/i.test(username)
    ) {
      message = 'A two-character username must have only letters';
      const error = new Error(message);
      error.status = 400;
      return next(error);
    } else if (!usernameTester(username)) {
      message =
        'Username is invalid. A username can only have numbers at the end, and can have only _ as the allowed special character only after the first two letters';
      const error = new Error(message);
      error.status = 400;
      return next(error);
    }
    return next();
  },

  ensureFalseyValueForDeactivation(req, res, next) {
    const {
      body: { isActive }
    } = req;
    if (isActive === 'true' || isActive === true) {
      const error = new Error('Paramaters are incorrect. Try again.');
      error.status = 403;
      return next(error);
    }
    return next();
  },

  ensureTruthyValueForReactivation(req, res, next) {
    const {
      body: { isActive }
    } = req;
    if (isActive === 'false' || isActive === false) {
      const error = new Error('Paramaters are incorrect. Try again.');
      error.status = 403;
      next(error);
    }
    return next();
  }
};
