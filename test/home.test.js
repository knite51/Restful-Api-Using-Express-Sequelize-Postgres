import supertest from 'supertest';
import app from '../app';

const request = supertest.agent(app);

describe('TEST SUITE FOR HOME ROUTE', () => {
  describe('This is a test for the home route: /resfulApi/', () => {
    it('should successfully access the home endpoint', done => {
      request
        .get('/resfulApi')
        .expect(200)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toHaveProperty(
            'message',
            'Welcome to the Restful Api using Express and Postgres'
          );
          done();
        });
    });
  });
});
