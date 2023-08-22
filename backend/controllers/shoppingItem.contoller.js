const ShoppingItem = require("./../models/ShoppingItem.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

//@desc Get all shopping items
//@route GET api/v1/shoppingItems
//@acces public
exports.getShoppingItems = asyncHandler(async (req, res, next) => {
  const shoppingItems = await ShoppingItem.find();

  res.status(200).json({
    count: shoppingItems.length,
    success: true,
    data: shoppingItems,
  });
});
