const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const courseRoute = require("./Routes/coursesRoutes");
const userRoute = require("./Routes/userRoutes");
const httpStatus = require("./utils/httpStatusText");
const path = require("path");

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoute);
app.use("/api/users", userRoute);

app.all("*", (req, res, next) => {
  console.log(req.url);
  return res
    .status(404)
    .json({ status: httpStatus.ERROR, message: "this resource not available" });
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
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
