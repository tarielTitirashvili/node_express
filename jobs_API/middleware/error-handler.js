const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong please try again later",
  };
  if (err instanceof CustomAPIError) {
    return res
      .status(customError.statusCode)
      .json({ msg: customError.message });
  }
  if (err.code) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `user already exists for ${err.keyValue.email}`;
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
