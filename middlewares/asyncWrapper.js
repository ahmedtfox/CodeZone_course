const removeFile = require("./removeFile");

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      if (req.file.filename) {
        console.log(req.file.filename);
        removeFile(req.file.filename);
      }
      next(err);
    });
  };
};
