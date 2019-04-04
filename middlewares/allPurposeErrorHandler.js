// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  return res.status(error.status).send({
    error: {
      message: error.message
    }
  });
};
