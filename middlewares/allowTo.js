const httpStatus = require("../utils/httpStatusText");
const appError = require("../utils/appError");

function allowTo(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.decodedToken.role;
    if (!allowedRoles.includes(userRole)) {
      const error = appError.make(
        "not allowed for this user",
        401,
        httpStatus.ERROR
      );
      return next(error);
    }
    next();
  };
}

module.exports = allowTo;
