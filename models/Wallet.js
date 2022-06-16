const mongoose = require("mongoose");
const WalletSchema = new mongoose.Schema({
  ethWallet: {
    type: Array,
  },
  maticWallet: {
    type: Array,
  },
  solWallet: {
    type: Array,
  },
  btcWallet: {
    type: Array,
  },
  usdtWallet: {
    type: Array,
  },
  adminId: {
    type:String,
  }
 
});

const Wallet = mongoose.model("wallets", WalletSchema);
module.exports = Wallet;