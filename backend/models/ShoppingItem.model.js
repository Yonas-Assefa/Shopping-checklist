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

// Calculate total bought cost middleware
ShoppingItemSchema.statics.calculateTotalBoughtCost = async function (userId) {
  console.log("Am even here in the second method");
  const result = await this.aggregate([
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
  console.log("Total Bought Result:", result);

  // Update the user's total bought cost fields after a change
  try {
    await this.model("User").findByIdAndUpdate(userId, {
      totalBoughtCost: result[0].totalBoughtCost,
    });
    console.log("User total bought costs updated successfully");
  } catch (error) {}
};

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
  console.log("Total Result:", totalResult);

  // Update the user's total cost fields after a change
  try {
    await this.model("User").findByIdAndUpdate(userId, {
      totalCost: totalResult[0].totalCost,
    });
    console.log("User total costs updated successfully");
  } catch (error) {}
};

// Call calculateTotalCost after an item is saved
ShoppingItemSchema.post("deleteOne", async function () {
  // await this.constructor.calculateTotalBoughtCost(this.user);
  // await this.constructor.calculateTotalCost(this.user);
});

// Call calculateTotalCost after deleting an item
ShoppingItemSchema.post("save", async function () {
  console.log("deleteOne called");
  console.log(typeof this.constructor.calculateTotalBoughtCost(this.user));
  await this.constructor.calculateTotalBoughtCost(this.user);
  await this.constructor.calculateTotalCost(this.user);
});

module.exports = mongoose.model("ShoppingItem", ShoppingItemSchema);
