const express = require("express");
//imported controllers
const {
  getAllCollections,
  getOneCollection,
  createCollection,
  UpdateCollection,
  deleteOneCollection,
} = require("../controllers/collection");

const api = express.Router();

//executing controllers on the specific actions
api.route("/name").get(getAllCollections).post(createCollection);
api
  .route("/name/:id")
  .get(getOneCollection)
  .put(UpdateCollection)
  .delete(deleteOneCollection);

module.exports = api;
