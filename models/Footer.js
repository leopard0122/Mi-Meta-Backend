const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
    enableLogo: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    require:true
  },
  contact : {
    type: String,
    require:true
  },
  copyright : {
    type: String,
    require:true
  },
  faq : {
    type: String,
    require:true
  },
  gdpr : {
    type: String,
    require:true
  },
  policy: {
    type: String,
    require:true
  },
  support : {
    type: String,
    require:true
  },
  term : {
    type: String,
    require:true
  },
 
  date: {
    type: Date,
    default: Date.now
  }
});

const Footer = mongoose.model("footers", FooterSchema);

module.exports = Footer;
