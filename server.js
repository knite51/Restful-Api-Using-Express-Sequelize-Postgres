const express = require('express');

const app = express();

const port = 7000;

app.get('/', (req, res) => res.send('Sup World'));

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Welcome to your application on port ${port}`));
