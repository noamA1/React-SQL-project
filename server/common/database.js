import mysql from "mysql2";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Aa123456!",
//   database: "Vacations",
//   timezone: "Z",
// });
const connection = mysql.createConnection({
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
  timezone: "Z",
});

export default connection;
