const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

module.exports.genToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
