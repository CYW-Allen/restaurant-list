const mysql = require('mysql2/promise');
require('dotenv').config();

mysql.createConnection({
  user: process.env.DB_USER_NAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
})
  .then((connection) => {
    const dbName = process.env.DB_NAME || 'restaurant';
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
      .then(() => {
        console.log('The app database requirement is fulfilled.');
        process.exit();
      })
      .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err));