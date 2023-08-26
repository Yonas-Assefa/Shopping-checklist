const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User.model");

//protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
   
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
  
    token = req.cookies.token;
  }

  //check if token exist
  console.log(token);
  if (!token) {
    return next(new ErrorResponse("not authorized to access this route", 401));
  }

  try {
    //validate token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("not authorized to access this route", 401));
  }
});
