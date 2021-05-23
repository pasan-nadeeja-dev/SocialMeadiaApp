const { userRegister } = require("./register");

module.exports = {
  Mutation: {
    register: userRegister,
  },
};
