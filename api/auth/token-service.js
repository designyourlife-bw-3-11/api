const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "testing secret";

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: "60m"
  };

  return jwt.sign(payload, secret, options);
}
