const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db/datasource");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function createTable() {
  try {
    await User.sync();
  } catch (error) {
    console.error("Unable to create table\n", error.message);
  }
}

createTable();

module.exports = User;
