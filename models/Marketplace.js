const mongoose = require("mongoose");
const MarketplaceSchema = new mongoose.Schema({
  allowList: {
    type: Object,
  },
  checkList: {
    type: Object,
  },
  stripeData: {
    type: Object,
  },
  paypalData: {
    type: Object,
  },
  venmoData: {
    type: Object,
  },
 
 
});

const Marketplace = mongoose.model("marketplaces", MarketplaceSchema);
module.exports = Marketplace;