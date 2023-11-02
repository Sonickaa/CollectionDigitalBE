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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Collection", CollectionSchema);
