import { Sequelize } from "sequelize";

// Konfigurasi database ditulis manual
const db = new Sequelize("tugas_notes", "root", "inipassword", {
  host: "104.154.138.53",
  dialect: "mysql",
});

export default db;
