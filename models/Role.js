const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    roleNumber: {
        type: String,
        required: true
    },
    roleAction :{
        customer: Boolean,
        transaction: Boolean,
        token: Boolean,
        content: Boolean,
        notification: Boolean,
        support: Boolean,
        role: Boolean,
        api: Boolean  
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;