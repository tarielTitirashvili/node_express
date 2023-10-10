class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  };
};

const createCustomAPIError = (msg, status) =>{ 
  // console.log(message, statusCode)
  return new CustomAPIError(msg, status);
};

module.exports = { CustomAPIError, createCustomAPIError };