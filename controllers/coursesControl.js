const Course = require("../models/courses");
const httpStatus = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

exports.getAllCourses = asyncWrapper(async (req, res) => {
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find(null, "title price")
    .limit(limit)
    .skip(skip);

  if (!courses) {
    const error = appError.make("resource not found", 404, httpStatus.ERROR);
    return next(error);
  }
  return res.status(200).json({ status: "success", data: { courses } });
});

exports.getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    const error = appError.make("resource not found", 404, httpStatus.FAIL);
    return next(error);
  }
  return res.status(200).json({ status: httpStatus.SUCCESS, data: { course } });
});

exports.addCourse = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCourse = Course(req.body);
    if (req.body.title === "") {
      throw new error("title is empty");
    }
    const result = await newCourse.save();
    return res.status(200).json({ status: httpStatus.SUCCESS, data: result });
  } catch (error) {
    res.json({
      status: httpStatus.ERROR,
      message: error.message,
    });
  }
};
