const mongoose = require("mongoose");
const CommunicationSchema = new mongoose.Schema({
  socialData: {
    type: Object,
  },
  contactData: {
    type: Object,
  },
  emailData: {
    type: Object,
  },
  
 
});

const Communication = mongoose.model("communications", CommunicationSchema);
module.exports = Communication;