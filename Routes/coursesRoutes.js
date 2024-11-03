const express = require("express");
const courseControl = require("../controllers/coursesControl");
const route = express.Router();
const verifyToken = require("../middlewares/verifyToken");

route.get("/", courseControl.getAllCourses);
route.get("/:courseId", courseControl.getCourse);
route.post("/", verifyToken, courseControl.addCourse);

module.exports = route;
