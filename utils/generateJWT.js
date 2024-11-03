const jwt = require("jsonwebtoken");

function generateJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TOKEN,
  });
  return token;
}

module.exports = generateJWT;
