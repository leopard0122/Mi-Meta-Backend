const jwt = require("jsonwebtoken");
const {Security_key} = require("../config/config")

function generateAccessToken(userdata) {
  return jwt.sign(userdata, Security_key, {
    expiresIn: "3600s",
  });
}

module.exports = {
  generateAccessToken,
};
