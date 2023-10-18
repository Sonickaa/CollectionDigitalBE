const express = require("express");
const app = express();
const PORT = 7070;
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to digital collective");
});

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`.rainbow);
});
