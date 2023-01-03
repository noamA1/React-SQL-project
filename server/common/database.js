import mysql from "mysql2";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Aa123456!",
//   database: "Vacations",
//   timezone: "Z",
// });
const connection = mysql.createConnection({
  database: "",
  host: "",
  user: "",
  password: "",
  port: "",
  timezone: "Z",
});

export default connection;
