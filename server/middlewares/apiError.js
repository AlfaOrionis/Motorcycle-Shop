const mongoose = require("mongoose");
const httpStatus = require("http-status");

class ApiError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  const { message, statusCode } = err;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

const convertToApiError = (err, res, req, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || error.status[statusCode];

    error = new ApiError(message, statusCode);
  }
  next(error);
};

module.exports = {
  handleError,
  ApiError,
  convertToApiError,
};
