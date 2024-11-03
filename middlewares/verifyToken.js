const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatusText");
const appError = require("../utils/appError");

function verifyToken(req, res, next) {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) {
    const err = appError.make("token is required", 401, httpStatus.ERROR);
    return next(err);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    const err = appError.make("invalid token", 401, httpStatus.ERROR);
    return next(err);
  }
}

module.exports = verifyToken;
