const express = require("express");
const userControl = require("../controllers/usersControl");
const route = express.Router();

route.get("/", userControl.getAllUsers);
route.post("/register", userControl.register);
route.post("/login", userControl.login);

module.exports = route;
