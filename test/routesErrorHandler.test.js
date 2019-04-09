import supertest from 'supertest';
import app from '../app';

const request = supertest.agent(app);

describe('ROUTE ERROR HANDLING TEST', () => {
  describe('Unknown routes error message', () => {
    it('should return error message: ROUTE NOT FOUND', done => {
      request
        .get('/madeup-route')
        .expect(404)
        .then(response => {
          expect(response.status).toBe(404);
          expect(response.body.error).toHaveProperty(
            'message',
            'Route Not Found'
          );
          done();
        });
    });
  });
});
