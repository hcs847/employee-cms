const util = require("util");
const mysql = require("mysql2");
require("dotenv/config");

// connect to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_CONNECTION,
  database: "employeesDB",
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
