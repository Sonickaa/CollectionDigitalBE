const express = require("express");
//imported controllers
const {
  getAllCollections,
  getOneCollection,
  createCollection,
  UpdateCollection,
  deleteOneCollection,
} = require("../controllers/collection");

const requireAuth = require("../middlewares/requireAuth");
const api = express.Router();
api.use(requireAuth);
//executing controllers on the specific actions
api.route("/").get(getAllCollections).post(createCollection);
api
  .route("/:id")
  .get(getOneCollection)
  .put(UpdateCollection)
  .delete(deleteOneCollection);

module.exports = api;
