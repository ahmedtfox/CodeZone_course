const httpStatus = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");

exports.getAllUsers = asyncWrapper(async (req, res) => {
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find(null, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  if (!users) {
    const error = appError.make("resource not found", 404, httpStatus.ERROR);
    return next(error);
  }
  return res.status(200).json({ status: "success", data: { users } });
});

exports.register = asyncWrapper(async (req, res, next) => {
  const firstName = req.body.firstName || false;
  const lastName = req.body.lastName || false;
  const email = req.body.email || false;
  const passwordText = req.body.password || false;

  if (!(firstName && lastName && email && passwordText)) {
    const error = appError.make("fields not found", 400, httpStatus.ERROR);
    return next(error);
  }

  // hash password
  let salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(passwordText, salt);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  // generate token

  const token = generateJWT({ email: newUser.email, id: newUser._id });

  newUser.token = token;
  const result = await newUser.save();

  return res.status(200).json({ status: httpStatus.SUCCESS, data: result });
});

exports.login = asyncWrapper(async (req, res, next) => {
  const email = req.body.email || false;
  const password = req.body.password || false;
  if (!(email && password)) {
    const error = appError.make(
      "email and password are required",
      400,
      httpStatus.ERROR
    );
    return next(error);
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error = appError.make("user not exist", 400, httpStatus.ERROR);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    const error = appError.make("something wrong", 500, httpStatus.ERROR);
    return next(error);
  }

  // logged in successfully
  const token = generateJWT({ email: user.email, id: user._id });
  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { token },
  });
});
