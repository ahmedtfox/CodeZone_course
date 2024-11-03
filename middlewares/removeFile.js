const fs = require("fs");
const path = require("path");

function removeFile(filename) {
  const filePath = path.join("uploads", filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file has been removed");
  });
}
module.exports = removeFile;
