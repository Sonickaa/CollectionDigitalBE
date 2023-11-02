const express = require("express");
const app = express();
const PORT = 7070;
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

const userRoutes = require("./routes/user");
const item = require("./routes/item");
const collection = require("./routes/collection");

const imagesRoutes = require("./routes/imagesRoutes")


connectDB();

app.use(express.json());
app.use(cors());

// middleware for the form submission
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Collection Digital");
});

app.use("/user", userRoutes);

app.use("/collection/item", item);
app.use("/collection/name", collection);

app.use("/api", imagesRoutes)



app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`.rainbow);
});
