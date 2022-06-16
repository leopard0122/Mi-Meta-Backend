const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    wallet: {
        type: String
    },
    linkNft: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    bio: {
        type: String
    },
    twitter: {
        type: String
    },
    profileImg:{
        cid:String,
        name:String
    },
    bannerImg:{
        cid:String,
        name:String
    },
    instagram: {
        type: String
    },
    discord: {
        type: String
    },
    facebook: {
        type: String
    },
    tiktok: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;