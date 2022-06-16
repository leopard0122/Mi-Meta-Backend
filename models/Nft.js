const mongoose = require("mongoose");

const NftSchema = new mongoose.Schema({
  name: {
    type: String
  },
  creator: {
    type: String
  },
  owner: {
    type: String
  },
  price: {
    type: String
  },
  collectionId: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  royalty: {
    type: String,
    required: true
  },
  rarity: {
    type: String
  },
  edition: {
    type: String,
    required: true
  },
  unlockable: {
    type: String,
    required: true
  },
  explicit: {
    type: String,
    required: true
  },
  propertise: {
    name: String,
    value: String
  },
  listMarketplace: {
    type: Boolean,
    required: true
  },
  listMarketplaceCategory: {
    type: String,
    required: true
  },
  nftImg: {
    cid:String,
    name:String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Nft = mongoose.model("Nft", NftSchema);

module.exports = Nft;
