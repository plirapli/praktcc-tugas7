import { Sequelize } from "sequelize";
import "dotenv/config";

const {
  DB_HOST: host,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
} = process.env;

console.log(`tesss: ${process.env}, ${database}, ${username}, ${password}`);

const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
