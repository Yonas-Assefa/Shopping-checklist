const ShoppingItem = require("./../models/ShoppingItem.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlware/async");

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

//@desc Get single shooping items
//@route GET api/v1/shoppingItems/:id
//@acces public
exports.getShoppingItem = asyncHandler(async (req, res, next) => {
  const shoppingItem = await ShoppingItem.findById(req.params.id);
  if (!shoppingItem) {
    return next(
      new ErrorResponse(`shoppingItem not found on id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: shoppingItem });
});

//@desc Create new shoppingItem
//@route POST api/v1/shoppingItems
//@acces private
exports.createShoppingItem = asyncHandler(async (req, res, next) => {
  const shoppingItem = await ShoppingItem.create(req.body);
  res.status(201).json({
    success: true,
    data: shoppingItem,
  });
});

//@desc Update  shoppingItem
//@route PUT api/v1/shoppingItems/:id
//@acces private
exports.updateShoppingItem = asyncHandler(async (req, res, next) => {
  const shoppingItem = await ShoppingItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({ success: true, data: bootcamp });

  if (!shoppingItem) {
    return next(
      new ErrorResponse(`shoppingItem not found on id ${req.params.id}`, 404)
    );
  }
});

//@desc Delete  shoppingItem
//@route Delte api/v1/shoppingItems/:id
//@acces private
exports.deleteShoppingItem = asyncHandler(async (req, res, next) => {
  const shoppingItem = await ShoppingItem.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
  if (!shoppingItem) {
    return next(
      new ErrorResponse(`shoppingItem not found on id ${req.params.id}`, 404)
    );
  }
});
