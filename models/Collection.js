const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  bannerImg: {
    cid:String,
    name:String
  },
  collectionImg: {
    cid:String,
    name:String
  },
  logoImg: {
    cid:String,
    name:String
  },
  url: {
    type: String,
    // required: true
  },
  creator: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  floor_price: {
    type: String,
    // required: true
  },
  trading: {
    type: String,
    // required: true
  },
  items: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Collection = mongoose.model("Collection", CollectionSchema);

module.exports = Collection;
