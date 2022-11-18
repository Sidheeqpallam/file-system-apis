const { Sequelize } = require("sequelize");
const { DATABASE, USER_NAME, PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, USER_NAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});
const Datas = require("./models/Data");

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await Datas.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connect;
