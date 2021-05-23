const { userRegister } = require("./register");
const { userLogin } = require("./login");

module.exports = {
  Mutation: {
    register: userRegister,
    login: userLogin,
  },
};
