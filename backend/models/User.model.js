const mongoose = require("mongoose");

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
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: [true, "please add an email"],
    minLength: 6,
    select: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
