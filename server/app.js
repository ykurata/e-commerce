const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const config = require("./config");
const dotenv = require("dotenv");


const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongoURL, {
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

app.get("/", (req, res) => {
  res.json("Connected");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT} !`));

module.exports = app;