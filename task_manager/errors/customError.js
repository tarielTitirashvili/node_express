class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  };
};

const createCustomAPIError = (message, statusCode) => new CustomAPIError(message, statusCode);

module.exports = { CustomAPIError, createCustomAPIError };