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
  },
  // username is nice to have
  username: {
    type: String,
    required: true,
  },
});

// custom signip static method
userSchema.statics.signup = async function (email, password, username) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("email already in use");
  }

  if (!email || !password || !username) {
    throw Error("all fields bitte filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "make sure to use min 8 chars, symbol, number and upper case letter"
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

//login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("all fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
