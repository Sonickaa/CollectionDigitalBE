const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  username: {
    type: String,
    required: true,
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

// custom signup static method
userSchema.statics.signup = async function (email, password, username) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This email is already in use.");
  }

  if (!email || !password || !username) {
    throw Error("Please fill out all the fields.");
  }
  if (!validator.isEmail(email)) {
    throw Error("This email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Please use at least 8 characters, one symbol, one number and one upper case letter."
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  await user.populate("collections").execPopulate();

  return user;
};

//login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill out all the fields.");
  }
  const user = await this.findOne({ email }).populate("collections");

  if (!user) {
    throw Error("Incorrect email, please try again or sign up first.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password, please try again.");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
