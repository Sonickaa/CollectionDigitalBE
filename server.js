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

app.get("/", (req, res) => {
  res.send("Welcome to Collection Digital");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`.rainbow);
});
