const { UserInputError } = require("apollo-server");

const Post = require("../../../models/Posts");
const { createPostValidator } = require("../../../util/validator");
const { checkAuth } = require("../../../util/checkAuth");

/**
 * argumnets:- (parent, args, context, info)
 */
module.exports.createPost = async (_, { postInput: { body } }, context) => {
  //Check for authenticated user
  const user = checkAuth(context);

  // validate inputs from server side
  const { errors, valid } = createPostValidator(body);
  if (!valid) {
    throw new UserInputError("Input errors", errors);
  }

  const newPost = new Post({
    body: body,
    username: user.username,
    user: user.id,
    createdAt: new Date().toISOString(),
  });
  const result = await newPost.save();

  return { id: result._id, ...result._doc };
};
