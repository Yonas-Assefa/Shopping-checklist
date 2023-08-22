const ShoppingItem = require("./../models/ShoppingItem.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlware/async");

//@desc Get all shopping items
//@route GET api/v1/shoppingItems
//@acces public
exports.getTotalCosts = asyncHandler(async (req, res, next) => {
    const totalCost = await ShoppingItem.aggregate([
        {
          $group: {
            _id: null,
            totalCost: { $sum: "$cost" }
          }
        }
      ]);
  
      const totalBoughtCost = await ShoppingItem.aggregate([
        { $match: { isBought: true } },
        {
          $group: {
            _id: null,
            totalBoughtCost: { $sum: "$cost" }
          }
        }
      ]);
  
      res.status(200).json({
        totalCost: totalCost[0]?.totalCost || 0,
        totalBoughtCost: totalBoughtCost[0]?.totalBoughtCost || 0
      });

  });