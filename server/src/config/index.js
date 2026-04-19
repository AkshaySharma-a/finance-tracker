const envConfig = require("./env");
const connectDB = require("./db");

module.exports = {
  ...envConfig,
  connectDB,
};
