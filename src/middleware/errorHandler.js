const UserError = require("../errors/userError");
const TVShowError = require("../errors/tvShowError");
const movieError = require("../errors/movieError");
const myListError = require("../errors/myListError");

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (
    err instanceof movieError ||
    err instanceof movieError ||
    err instanceof UserError ||
    err instanceof TVShowError
  ) {
    return res.status(err.statusCode).json({ error: err.message });
  } else if (err.name === 'CastError') {
    return res.status(400).json({ error: `Resource not found. Invalid :${err.path} ` });
  }

  // Handle other types of errors
  res.status(500).json({ error: "Internal server error." });
};

module.exports = errorHandler;

