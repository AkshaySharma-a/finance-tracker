const dotenv = require("dotenv");
dotenv.config();

const config = require("../config/index");
const app = require("../app");

const startServer = async () => {
  try {
    await config.connectDB();

    const PORT = config.PORT;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} (${config.NODE_ENV} mode)`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
