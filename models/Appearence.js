const mongoose = require("mongoose");
const AppearenceSchema = new mongoose.Schema({
  fontType: {
    type: String,
    default:"Italic"
  },
  mainColor: {
    type: String,
    default:"#8D3695"
  },
  secondColor: {
    type: String,
    default:"#F66C7D"
  },
  gradienColor1: {
    type: String,
    default:"#4CE1B6"
  },
  gradienColor2: {
    type: String,
    default:"#70BBFD"
  },
 
  lightImage: {
    type: String,
  },
  darkImage: {
    type: String,
  },
 
});

const Appearence = mongoose.model("appearences", AppearenceSchema);
module.exports = Appearence;