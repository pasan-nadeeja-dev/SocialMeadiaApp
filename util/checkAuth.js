const { AuthenticationError } = require("apollo-server");
const { verify } = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

module.exports.checkAuth = (context) => {
  // check for authorization header
  if (context?.headers?.authorization) {
    // extract token from header
    const token = context.headers.authorization.split(" ")[1];
    if (token) {
      try {
        // verify token
        const payload = verify(token, JWT_SECRET);
        return payload;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    } else
      throw new AuthenticationError(
        "Authentication token needs to be in the header"
      );
  } else throw new AuthenticationError("Authorixation headers are required");
};
