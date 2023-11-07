const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    url: { type: String },
    description: { type: String }
}); 

module.exports = mongoose.model("image", Image)