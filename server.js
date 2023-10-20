const express = require("express");
const app = express();
const PORT = 7070;
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

const userRoutes = require("./routes/user");

connectDB();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const API =
  "https://api.vam.ac.uk/v2/objects/search?q=worth%20wedding%20dress&page=1&page_size=15&year_made_from=1870&year_made_to=1900&id_category=THES49044";

app.get("/", (req, res) => {
  res.send("Welcome to digital collective");
});

app.get("/objects", async (req, res) => {
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
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`.rainbow);
});
