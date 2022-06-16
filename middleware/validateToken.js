const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const {Security_key} = require("../config/config")


function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401).json('Unauthorized User');
  jwt.verify(token, Security_key, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded;
    next();
  });
}
module.exports = {
  validateToken,
};