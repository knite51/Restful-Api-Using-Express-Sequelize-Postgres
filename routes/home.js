import express from 'express';

const router = express.Router();

router.route('/').get((req, res) =>
  res.send({
    message: 'Welcome to the Restful Api using Express and Postgres'
  }));

export default router;
