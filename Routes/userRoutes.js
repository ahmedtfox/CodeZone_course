const express = require("express");
const userControl = require("../controllers/usersControl");
const route = express.Router();
const allowTo = require("../middlewares/allowTo");
const verifyToken = require("../middlewares/verifyToken");
const role = require("../utils/roles");
const uploadFiles = require("../middlewares/uploadFiles");

route.get(
  "/",
  verifyToken,
  allowTo([role.ADMIN, role.MANGER]),
  userControl.getAllUsers
);

route.post("/register", uploadFiles, userControl.register);
route.post("/login", userControl.login);

module.exports = route;
