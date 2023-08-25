const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./User.model");

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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true,
  },

  slug: {
    type: String,
  },
});

ShoppingItemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Calculate total cost middleware
ShoppingItemSchema.statics.calculateTotalCost = async function (userId) {
  const totalResult = await this.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: "$user",
        totalCost: { $sum: "$cost" },
      },
    },
  ]);
  console.log(totalResult);

  //calculate sum for already bought items only
  const resultBought = await this.aggregate([
    {
      $match: { user: userId, isBought: true },
    },
    {
      $group: {
        _id: "$user",
        totalBoughtCost: { $sum: "$cost" },
      },
    },
  ]);
  console.log(resultBought);

  //update the users totalcost filed after a change
  try {
    await this.model("User").findByIdAndUpdate(userId, {
      totalCost: totalResult[0].totalCost,
      totalBoughtCost: resultBought[0].totalBoughtCost,
    });
  } catch (error) {}
};

// Call calculateTotalCost after an item is saved
ShoppingItemSchema.post("save", function () {
  this.constructor.calculateTotalCost(this.user);
});

// Call calculateTotalCost before deleting an item
ShoppingItemSchema.pre("remove", function () {
  this.constructor.calculateTotalCost(this.user);
});

module.exports = mongoose.model("ShoppingItem", ShoppingItemSchema);
