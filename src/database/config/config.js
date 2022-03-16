require('dotenv').config();

// const environment = process.env.NODE_ENV || "test";

// const suffix = {
//   prod: "",
//   production: "",
//   dev: "-dev",
//   development: "-dev",
//   test: "-test",
// };

// const options = {
//   host: process.env.MYSQL_HOST || 'mysql',
//   port: process.env.MYSQL_PORT || '3306',
//   database: 
//     `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
//   username: process.env.MYSQL_USER || 'root',
//   password: process.env.MYSQL_PASSWORD || 'password',
//   dialect: 'mysql',
//   dialectOptions: {
//     timezone: 'Z',
//   },
//   logging: false,
// };

// module.exports = {
//   development: {
//     ...options,
//   },
//   test: {
//     ...options,
//   },
//   production: {
//     ...options,
//   },
// };

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: `${process.env.MYSQL_DB_NAME}${'-dev'}`,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: `${process.env.MYSQL_DB_NAME}${'-test'}`,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
};