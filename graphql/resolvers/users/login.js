const { UserInputError } = require("apollo-server");
const bcrypt = require("bcrypt");

const { loginInputValidator } = require("../../../util/validator");
const User = require("../../../models/User");
const { genToken } = require("../../../util/genToken");

module.exports.userLogin = async (_, { username, password }) => {
  // Validate inputs from server-side
  const { valid, errors } = loginInputValidator(username, password);
  if (!valid) {
    throw new UserInputError("Errors", errors);
  }
  // Check if user exist
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    errors.username = "username not found";
    throw new UserInputError("Errors", errors);
  }
  // Check if input password match with db record password
  const matchPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchPassword) {
    errors.password = "Password is wrong";
    throw new UserInputError("Errors", errors);
  }
  // generate authorization token
  const token = genToken(existingUser);
  // return user data and token
  return {
    ...existingUser._doc,
    id: existingUser._id,
    token,
  };
};
