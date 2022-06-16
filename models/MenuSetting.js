const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  unlockableNFT: {
    type: Boolean,
    default: true
  },
  unlockableExplicit: {
    type: Boolean,
    default: true
  },
  categoryItems: {
    type: Array,
  },
  menuItems: {
    type: Array,
  },
  connectList: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const MenuSetting = mongoose.model("menusettings", MenuSchema);

module.exports = MenuSetting;
