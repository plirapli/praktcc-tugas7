import { Sequelize } from "sequelize";
import "dotenv/config";

Object.keys(process.env).forEach((val) => {
  console.log(process.env[val]);
});

console.log(process.env["DB_HOST"]);
console.log(process.env["DB_NAME"]);
console.log(process.env["DB_USERNAME"]);
console.log(process.env["DB_PASSWORD"]);

const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
