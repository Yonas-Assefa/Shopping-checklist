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
  if ((process.env.NODE_ENV = "production")) {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
  });
};

//@desc GET current loggen in user
//@route GET api/v1/auth/getCurrentUser
//@acces private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
