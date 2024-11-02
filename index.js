const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const { error } = require("node:console");
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const courseRoute = require("./Routes/coursesRoutes");
const httpStatus = require("./utils/httpStatusText");

app.use(cors());
app.use(express.json());

app.use("/courses", courseRoute);

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: httpStatus.ERROR, message: "this resource not available" });
});

app.use((error, req, res, next) => {
  return res.status(error.statusCose || 500).json({
    status: error.statusText,
    message: error.message,
    data: null,
    code: error.statusCode,
  });
});

mongoose
  .connect(DB_URL, { dbName: "CodeZone" })
  .then((res) => {
    console.log("db connection success");
    app.listen(PORT, () => {
      console.log("Listening Now !");
    });
  })
  .catch((error) => {
    console.log(error);
  });
