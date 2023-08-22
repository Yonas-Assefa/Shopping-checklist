const mongoose = require("mongoose");
const slugify = require("slugify");

const ShoppingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: [50, "name can not be more than 50 char"],
  },
  description: {
    type: String,
    required: [true, "please add a description"],
    minLength: [50, "description can not be less than 50 characters"],
  },

  cost: {
    type: Number,
    required: true,
  },

  timeToBuy: {
    type: Date,
    required: true,
  },

  isBought: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
  },
});

ShoppingItemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("ShoppingItem", ShoppingItemSchema);
