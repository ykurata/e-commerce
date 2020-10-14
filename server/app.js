const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const config = require("./config");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use("/user", userRoute);

// MongoDB set up
dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connection successful");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT} !`));

module.exports = app;