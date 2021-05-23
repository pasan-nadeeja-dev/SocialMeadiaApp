const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../../models/User");
const { registerInputValidator } = require("../../../util/validator");
const { genToken } = require("../../../util/genToken");

module.exports.userRegister = async (
  _,
  { registerInput: { username, password, confirmPassword, email } }
) => {
  //validate values from server side
  const { valid, errors } = registerInputValidator(
    username,
    password,
    confirmPassword,
    email
  );
  if (!valid) {
    throw new UserInputError("Input errors", errors);
  }
  //make sure user doesn't exist
  const existingUser = await User.findOne(
    {
      $or: [{ username: username }, { email: email }],
    },
    { username: 1, email: 1 }
  );
  if (existingUser) {
    if (existingUser.username === username) {
      errors.username = "Username is taken";
    }
    if (existingUser.email === email) {
      errors.email = "Email is taken";
    }
    throw new UserInputError("Errors", errors);
  }
  //hash the password
  const hashPassword = await bcrypt.hash(password, 12);
  //save to db
  const newUser = new User({
    username,
    password: hashPassword,
    email,
    createdAt: new Date().toISOString(),
  });
  const result = await newUser.save();
  //generate token
  const token = genToken(result);
  //   return response (newly created user, token)
  return {
    ...result._doc,
    id: result._id,
    token,
  };
};
