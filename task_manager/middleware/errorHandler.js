const errorHandler = (err, req, res, next) => res.status(500).json({ msg: "internal server error"})

module.exports = errorHandler