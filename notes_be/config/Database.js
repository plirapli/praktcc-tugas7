import { Sequelize } from "sequelize";
import "dotenv/config";

console.log(
  `tesss: ${process.env.DB_HOST}, ${process.env.DB_NAME}, ${process.env.DB_USERNAME}, ${process.env.DB_PASSWORD}`
);

const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
