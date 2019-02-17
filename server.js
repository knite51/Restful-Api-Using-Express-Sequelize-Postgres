// eslint-disable-next-line import/no-named-as-default
import 'babel-core/register';
import 'babel-polyfill';
import app from './app';

const port = process.env.PORT || 7000;

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Welcome to your application on port ${port}`));
