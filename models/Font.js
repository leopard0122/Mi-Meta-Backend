const mongoose = require("mongoose");

const FontSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Font = mongoose.model("font", FontSchema);

module.exports = Font;
