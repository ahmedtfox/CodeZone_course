const express = require("express");
const courseControl = require("../controllers/coursesControl");
const route = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const role = require("../utils/roles");

const allowTo = require("../middlewares/allowTo");

route.get("/", courseControl.getAllCourses);
route.get("/:courseId", courseControl.getCourse);
route.post(
  "/",
  verifyToken,
  allowTo([role.ADMIN, role.MANGER]),
  courseControl.addCourse
);

module.exports = route;
