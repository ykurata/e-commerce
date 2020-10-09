const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const config = require("./config");
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Connected");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT} !`));

module.exports = app;