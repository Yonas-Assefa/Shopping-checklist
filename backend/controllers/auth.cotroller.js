const User = require("./../models/User.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlware/async");

//@desc create a user
//@route POST api/v1/
//@acces public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: shoppingItem });
});
