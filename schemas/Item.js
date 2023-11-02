const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  object_type: {
    type: String,
    required: true,
    minLength: [2, "min length is two characters"],
    maxLength: 100,
  },
  primary_date: {
    type: String,
    required: true,
  },
  artist_maker: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
