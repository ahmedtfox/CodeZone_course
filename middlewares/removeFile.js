const fs = require("fs");
const path = require("path");
const appError = require("../utils/appError");

function removeFile(filename) {
  const filePath = path.join("uploads", filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      const error = appError.make("remove not complete", 500);
      console.log(err);
    }
    console.log("file has been removed");
  });
}
module.exports = removeFile;
