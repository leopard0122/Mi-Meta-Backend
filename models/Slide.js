const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");
const SlideSchema = new mongoose.Schema({

  unlockable: {
    type: boolean,
    default:true
  },
  slideImage: {
    type: String,
  },
  slideName: {
    type: String,
  },
  headerLine: {
    type: String,
    default:""
 
  },
  subTxt: {
    type: String,
  
  },
  buttonColor1: {
    type: String,
    default:"#8D3695"
  },
  buttonColor2: {
    type: String,
    default:"#A71A13"
  },
 
  buttonText1: {
    type: String,
  },
  buttonText2: {
    type: String,
  },
  url1: {
    type: String,
  },
  url2: {
    type: String,
  },
  duration: {
    type: String,
  },
  skipSlide: {
    type: boolean,
    default:false
  },
  buttonText2: {
    type: String,
  },
});

const Slide = mongoose.model("slides", SlideSchema);
module.exports = Slide;