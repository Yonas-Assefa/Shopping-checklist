const ShoppingItem = require("./../models/ShoppingItem.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlware/async");

//@desc Get all shopping items
//@route GET api/v1/shoppingItems
//@acces public
exports.getShoppingItems = asyncHandler(async (req, res, next) => {
  let query;
  // const reqQuery = { ...req.query };
  // const removableQuery = ["select", "sort"];

  // //remove these queries
  // removableQuery.forEach((params) => delete reqQuery[params]);

  // let queryString = JSON.stringify(reqQuery);

  // queryString = queryString.replace(
  //   /\b(gt|gte|lt|lte|in|nin)\b/g,
  //   (match) => `$${match}`
  // );
  const conditions = {user: req.user.id}

  query = ShoppingItem.find(conditions);

  //select fileds to be displayed on response
  // if (req.query.select) {
  //   const fileds = req.query.select.split(",").join(" ");
  //   query = query.select(fileds);
  //   console.log(fileds);
  // }

  //sort by the given parameter. if not given, use timeToBuy as a default
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   query = query.sort(sortBy);
  //   console.log(sortBy);
  // } else {
  //   query = query.sort("-timeToBuy");
  // }
  query = query.sort("-timeToBuy");

  const shoppingItems = await query;

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
  //add creator of the item(item user) to the req.body
  req.body.user = req.user.id;

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
  const shoppingItem = await ShoppingItem.findById(req.params.id);

  if (!shoppingItem) {
    return next(
      new ErrorResponse(`shoppingItem not found on id ${req.params.id}`, 404)
    );
  }

  //check if the current user is the owner of the shopping item
  if (shoppingItem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user with user is not allowed to update this shopping item`,
        401
      )
    );
  }
  shoppingItem = await ShoppingItem.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: shoppingItem });
});

//@desc Delete  shoppingItem
//@route Delte api/v1/shoppingItems/:id
//@acces private
exports.deleteShoppingItem = asyncHandler(async (req, res, next) => {
  const shoppingItem = await ShoppingItem.findById(req.params.id);

  if (!shoppingItem) {
    return next(
      new ErrorResponse(`shoppingItem not found on id ${req.params.id}`, 404)
    );
  }

  //check if the current user is the owner of the shopping item
  if (shoppingItem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user with user is not allowed to update this shopping item`,
        401
      )
    );
  }

  shoppingItem = await ShoppingItem.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
