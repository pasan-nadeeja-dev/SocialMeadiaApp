const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { JWT_SECRET } = require("../../config");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } },
    ) {
      //validate values from server side
      //make sure user doesn't exist
      const existingUser = await User.findOne(
        {
          $or: [{ username: username }, { email: email }],
        },
        { username: 1, email: 1 }
      );
      console.log(existingUser);
      if (existingUser && existingUser.username === username) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      if (existingUser && existingUser.email === email) {
        throw new UserInputError("email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }
      //hash the password
      const hashPassword = await bcrypt.hash(password, 12);
      //save to db
      const newUser = new User({
        username,
        hashPassword,
        email,
        createdAt: new Date().toISOString(),
      });
      const result = await newUser.save();
      //generate token
      //   console.log("new user : ", result);
      const token = jwt.sign(
        {
          id: result._id,
          email: result.email,
          username: result.username,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      //   return response (newly created user, token)
      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};
