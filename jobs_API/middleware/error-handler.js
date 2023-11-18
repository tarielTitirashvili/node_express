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
    const mongoError = Object.keys(
      err.keyValue
    )
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `duplicate value was entered in ${mongoError.map(
      (key, index) =>
        `${key}${
          index === mongoError.length - 1
            ? " "
            : ", "
        }`
    )}field`;
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
