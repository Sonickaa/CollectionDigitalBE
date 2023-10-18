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

/* const API = "https://api.vam.ac.uk/v2"; */

app.get("/", (req, res) => {
  res.send("Welcome to digital collective");
});

/* app.get("/objects", async (req, res) => {
  try {
    const response = await axios.get(API);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API" });
  }
}); */

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`.rainbow);
});
