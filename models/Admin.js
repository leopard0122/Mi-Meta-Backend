const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    // required: true
  },
  displayname: {
    type: String,
    // required: true
  },
 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  url: {
    type: String,
    // required: true
  },
  avatar: {
    type: String,
    // required: true
  },
  banner: {
    type: String,
    // required: true
  },
  role:{
    type:String,
    required:true
  },
  address1: {
    type: String,
    // required: true
  },
  address2: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
 
  postalcode: {
    type: String,
    // required: true
  },
  state: {
    type: String,
    default:"us"
    // required: true
  },
 
  country: {
    type: String,
    // required: true
  },
  bio: {
    type: String,
    // required: true
  },
  wallet:{
    type:String,
  },
  ipAddress:{
    type:String,
  },
  emailVerified:{
    type:Boolean,
    default:false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
