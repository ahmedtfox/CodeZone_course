const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  price: Number,
});

const course = mongoose.model("course", courseSchema);

module.exports = course;
