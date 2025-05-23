import { Sequelize } from "sequelize";
import "dotenv/config";

import fs from "node:fs";
fs.readFile(".env", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
