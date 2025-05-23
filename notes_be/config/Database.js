import { Sequelize } from "sequelize";
import "dotenv/config";

Object.keys(process.env).forEach((val) => {
  console.log(val + ": " + process.env[val]);
});

const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
