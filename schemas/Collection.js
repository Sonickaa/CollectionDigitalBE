const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "min length is two characters"],
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Collection", CollectionSchema);
