const mongoose = require("mongoose");
const PermissionSchema = new mongoose.Schema({
  superAdminRole: {
    type: Array,
  },
  adminRole: {
    type: Array,
  },
  managerRole: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

const Permission = mongoose.model("permission", PermissionSchema);
module.exports = Permission;