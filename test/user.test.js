import supertest from 'supertest';
import app from '../app';
import models from '../models';
import { resourceCreator } from '../helpers';

const request = supertest.agent(app);

const regularUser = resourceCreator.createRegularUser();
const emptyUserFields = resourceCreator.createEmptyUserField();
const emptyUsernameField = resourceCreator.createEmptyUsernameField();
const emptyPasswordField = resourceCreator.createEmptyPasswordField();
const emptyEmailField = resourceCreator.createEmptyEmailField();
const noUsernameParams = resourceCreator.createWithNoUsername();
const noEmailParams = resourceCreator.createWithNoEmail();
const noPasswordParams = resourceCreator.createWithNoPassword();
const invalidUserUsername = resourceCreator.userWithInvalidUsername();
const onlyNumsUsername = resourceCreator.userWithOnlyNumsForUsername();
const oneCharUsername = resourceCreator.userWithOneCharUsername();
const invalidUserEmail = resourceCreator.userWithInvalidEmail();
const invalidUserPassword = resourceCreator.userWithInvalidPassword();

const signupRoute = '/resfulApi/users/register';

describe('USER TEST SUITE', () => {
  beforeAll(() => models.sequelize.sync({ force: true }));
  afterAll(() => models.sequelize.sync({ force: true }));

  describe(`CREATION OF HABITS: ${signupRoute}`, () => {
    it('should create a user when all params are valid', done => {
      request
        .post(signupRoute)
        .send(regularUser)
        .expect(201)
        .then(response => {
          expect(response.status).toBe(201);
          expect(response.body.data).toHaveProperty(
            'username',
            regularUser.username,
            'email',
            regularUser.email
          );
          done();
        });
    });

    it('should not create a user when username supplied already exist', done => {
      request
        .post(signupRoute)
        .send({
          ...regularUser,
          password: 'unusedPassword',
          email: 'unusedemail@dev.com'
        })
        .then(response => {
          expect(response.status).toBe(409);
          expect(response.body.error).toHaveProperty(
            'message',
            'Username already in use'
          );
          done();
        });
    });

    it('should not create user when email supplied already exist', done => {
      request
        .post(signupRoute)
        .send({
          ...regularUser,
          username: 'unusedUsername',
          password: 'unusedPassword'
        })
        .then(response => {
          expect(response.status).toBe(409);
          expect(response.body.error).toHaveProperty(
            'message',
            'Email already in use'
          );
          done();
        });
    });

    it('should fail to create user when fields are empty', done => {
      request
        .post(signupRoute)
        .send(emptyUserFields)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(3);
          expect(errorArray[0]).toEqual('username cannot be empty');
          expect(errorArray[1]).toEqual('email cannot be empty');
          expect(errorArray[2]).toEqual('password cannot be empty');
          done();
        });
    });

    it('should fail to create when username field is empty', done => {
      request
        .post(signupRoute)
        .send(emptyUsernameField)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(1);
          expect(errorArray[0]).toEqual('username cannot be empty');
          done();
        });
    });

    it('should fail to create when email field is empty', done => {
      request
        .post(signupRoute)
        .send(emptyEmailField)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(1);
          expect(errorArray[0]).toEqual('email cannot be empty');
          done();
        });
    });

    it('should fail to create when password field is empty', done => {
      request
        .post(signupRoute)
        .send(emptyPasswordField)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(1);
          expect(errorArray[0]).toEqual('password cannot be empty');
          done();
        });
    });
    it('should fail creation when no required field is supplied', done => {
      request
        .post(signupRoute)
        .send({})
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(3);
          expect(errorArray[0]).toEqual('username is required');
          expect(errorArray[1]).toEqual('email is required');
          expect(errorArray[2]).toEqual('password is required');
          done();
        });
    });

    it('should fail to create when username is not supplied', done => {
      request
        .post(signupRoute)
        .send(noUsernameParams)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(1);
          expect(errorArray[0]).toEqual('username is required');
          done();
        });
    });

    it('should fail to create when email is not supplied', done => {
      request
        .post(signupRoute)
        .send(noEmailParams)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(1);
          expect(errorArray[0]).toEqual('email is required');
          done();
        });
    });

    it('should fail to create when password is not supplied', done => {
      request
        .post(signupRoute)
        .send(noPasswordParams)
        .then(response => {
          const errorArray = JSON.parse(response.body.error.message);
          expect(response.status).toBe(400);
          expect(errorArray).toHaveLength(1);
          expect(errorArray[0]).toEqual('password is required');
          done();
        });
    });

    it('Should fail creation when username does not match rules', done => {
      request
        .post(signupRoute)
        .send(invalidUserUsername)
        .then(response => {
          expect(response.status).toEqual(400);
          expect(response.body.error.message).toMatch('Username is invalid');
          done();
        });
    });

    it('Should fail creation when username is numbers only', done => {
      request
        .post(signupRoute)
        .send(onlyNumsUsername)
        .then(response => {
          expect(response.status).toEqual(400);
          expect(response.body.error.message).toMatch('A two-character username must have only letters');
          done();
        });
    });

    it('Should fail creation when username is one character only', done => {
      request
        .post(signupRoute)
        .send(oneCharUsername)
        .then(response => {
          expect(response.status).toEqual(400);
          expect(response.body.error.message).toMatch('Username must be at least two characters');
          done();
        });
    });

    it('Should fail creation when email address in payload is invalid', done => {
      request
        .post(signupRoute)
        .send(invalidUserEmail)
        .then(response => {
          expect(response.status).toEqual(400);
          expect(response.body.error).toHaveProperty(
            'message',
            'The email address provided is invalid'
          );
          done();
        });
    });

    it('Should fail creation when password fails to match rules', done => {
      request
        .post(signupRoute)
        .send(invalidUserPassword)
        .then(response => {
          expect(response.status).toEqual(400);
          expect(response.body.error.message).toMatch('The password failed to match');
          done();
        });
    });
  });
});
