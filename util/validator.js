function validateUsername(username, errors) {
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  return;
}

function validateResponse(errors) {
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

module.exports.registerInputValidator = (
  username,
  password,
  confirmPassword,
  email
) => {
  const errors = {};
  //empty username validation
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  //empty and format of email validation
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else if (
    !email.match(/^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/)
  ) {
    errors.email = "Email must be in valid format";
  }
  //password length validation
  if (password.length < 8 && password.length > 15) {
    errors.password = "Password length must be between 8 and 15";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must be match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.loginInputValidator = (username, password) => {
  const errors = {};
  validateUsername(username, errors);

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (password.length < 8 && password.length > 15) {
    errors.password = "Password length must be between 8 and 15";
  }
  return validateResponse(errors);
};

module.exports.createPostValidator = (body) => {
  const errors = {};
  if (body.trim() === "") {
    errors.body = "Body must not be empty";
  }
  return validateResponse(errors);
};
