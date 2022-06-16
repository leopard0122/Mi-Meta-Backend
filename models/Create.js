const mongoose = require("mongoose");

const CreateSchema = new mongoose.Schema({
  allow721: {
    type: Boolean,
    default: true
  },
  allow1155: {
    type: Boolean,
    default: true
  },
  allowDTC: {
    type: Boolean,
    default: true
  },
  allowEthereum: {
    type: Boolean,
    default: true
  },
  allowSolana: {
    type: Boolean,
    default: true
  },
  allowPolygon: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Create = mongoose.model("creates", CreateSchema);

module.exports = Create;
