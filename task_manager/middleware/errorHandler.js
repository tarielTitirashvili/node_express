const { CustomAPIError } = require("../errors/customError")
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError){
    return res.status(err.status).json({ msg: err.message });
  }
    return res.status(500).json({ msg: "Internal Server Error"});
}

module.exports = errorHandler;