const User = require("./../models/User.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlware/async");

//@desc create a user
//@route POST api/v1/auth/register
//@acces public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

//@desc get a user
//@route GET api/v1/auth/login
//@acces public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("please provide an email and password", 400));
  }

  //look for a user
  const user = await User.findOne({ email: email }).select("+password");

  //check a user exist
  if (!user) {
    return next(new ErrorResponse("email or password incorrect", 401));
  }

  //check if password match
  isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse("email or password incorrect", 401));
  }

  sendTokenResponse(user, 200, res);
});

//@desc GET current loggen in user
//@route GET api/v1/auth/getCurrentUser
//@acces private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("shoppingItems");
  console.log();
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc LOG out current loggen in user
//@route GET api/v1/auth/logout
//@acces private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
  });
});

//@desc Update logged in user's profile
//@route PUT api/v1/auth/updateDetails
//@acces private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc Update users password
//@route PUT api/v1/auth/updatePassword
//@acces private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  //take the current logged in user
  const user = await User.findById(req.user.id).select("+password");

  //check if the old password entered is mached with the password saved in the database
  isMached = await user.matchPassword(req.body.currentPassword);
  if (!isMached) {
    return next(new ErrorResponse("password is incorrect", 401));
  }

  //change the password
  user.password = req.body.newPassword;
  await user.save();

  //send a token
  sendTokenResponse(user, 200, res);
});

//get token from model, create a cookie and return it
const sendTokenResponse = (user, statusCode, res) => {
  //generate token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if ((process.env.NODE_ENV = "production")) {
  //   console.log("procution not", process.env.NODE_ENV);
  //   options.secure = true;
  // }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
