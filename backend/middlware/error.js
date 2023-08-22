const ErrorResponse = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);

  //bootcamp ID not existing in the database
  if (err.name === "CastError") {
    const message = `resource not found on id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //duplicate key in the database
  if (err.code === 11000) {
    const message = `duplicate filed value entered`;
    error = new ErrorResponse(message, 400);
  }

  //validation failed
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  //attach the error respons with res
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || `server error` });
};

module.exports = errorHandler;
