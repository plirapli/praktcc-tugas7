import { Sequelize } from "sequelize";
import "dotenv/config";

console.log(Object.keys(process.env));

const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
