require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DB_URL,
    dialect: 'postgres',
    operatorsAliases: false
  },
  test: {
    url: process.env.TEST_DB_URL,
    dialect: 'postgres',
    operatorsAliases: false
  }
};
