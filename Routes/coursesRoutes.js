const express = require("express");
const courseControl = require("../controllers/coursesControl");
const route = express.Router();

route.get("/", courseControl.getAllCourses);
route.get("/:courseId", courseControl.getCourse);
route.post("/", courseControl.addCourse);

module.exports = route;
