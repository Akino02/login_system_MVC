const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  legs: { type: Number, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Cat", schema);