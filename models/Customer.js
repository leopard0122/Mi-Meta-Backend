const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
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
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  url: {
    type: String,
    // required: true
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
 
  postal_code: {
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
  price:{
    type:Number,
  },
  wallet:{
    type:String,
  },
  ipAddress:{
    type:String,
  },
  avatar: {
    type: String
  },
  banner: {
    type: String
  },
  user_check: {
    type: Boolean,
    default: false
  },
  blocked : {
    type: Boolean,
    default: false
  },
  adminId : {
    type: String,
    required: true
  },
  registerTime : {
    type: Date,
    default: Date.now
  },
 
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;
