const express = require("express");
//imported controllers
const {
  getAllItems,
  getOneItem,
  createItem,
  UpdateItem,
  deleteOneItem,
} = require("../controllers/item");

const api = express.Router();

//executing controllers on the specific actions
api.route("/item").get(getAllItems).post(createItem);
api.route("/item/:id").get(getOneItem).put(UpdateItem).delete(deleteOneItem);

module.exports = api;
