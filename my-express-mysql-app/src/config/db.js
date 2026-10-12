require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });
// Or simply: require("dotenv").config(); if you only use .env

const mysql = require("mysql2");

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// console.log('poll====',pool);


// Export promise version for async/await
const db = pool.promise();

module.exports = db;
