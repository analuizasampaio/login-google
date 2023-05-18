const path = require("path");
const { Sequelize } = require("sequelize");

const databaseFile = path.resolve(
  __dirname,
  "../",
  "../",
  "databases",
  "db.db"
);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databaseFile,
});

async function connectDB() {
  // connect to database
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database\n", error);
  }
}

module.exports = { sequelize, connectDB };
