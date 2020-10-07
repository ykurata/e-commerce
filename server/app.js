const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Connected");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} !`));

module.exports = app;