const express = require("express");
const path = require("path");
const config = require("config");

var app = express();
app.use(express.json());
const url = config.get('dbURI');

const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const port = 8000;

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
