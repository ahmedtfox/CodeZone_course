const multer = require("multer");
const appError = require("../utils/appError");
const moment = require("moment");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const dd = moment().format("YYYY-MM-DD HH-mm-sss");
    const fileName = dd + "." + ext;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    const error = appError.make("file must be image", 400);
    return cb(error, false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter });

module.exports = upload.single("avatar");
