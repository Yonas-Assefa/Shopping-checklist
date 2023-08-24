const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add your number"],
    trim: true,
    maxLength: [50, "name can not be more than 50 char"],
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: [true, "email already exist. use diffrent email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please add a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minLength: 6,
    select: false,
  },
});

//encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to generate jwt and cookie
UserSchema.methods.getSignedJwtToken = function (next) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
