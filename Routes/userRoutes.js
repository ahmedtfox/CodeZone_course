const express = require("express");
const userControl = require("../controllers/usersControl");
const route = express.Router();

const verifyToken = require("../middlewares/verifyToken");

route.get("/", verifyToken, userControl.getAllUsers);
route.post("/register", userControl.register);
route.post("/login", userControl.login);

module.exports = route;
