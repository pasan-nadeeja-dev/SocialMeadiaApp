const {
  AuthenticationError,
  CheckResultAndHandleErrors,
} = require("apollo-server");

const { checkAuth } = require("../../../util/checkAuth");
const Post = require("../../../models/Posts");

/**
 * args:- (parent, arguments, context, info)
 */
module.exports.deletePost = async (_, { postId }, context) => {
  // check for authenticated user
  const user = checkAuth(context);

  try {
    // find post in db
    const post = await Post.findById({ _id: postId });
    // if null, post has already deleted
    if (post === null) return "Post has already deleted";
    // allow only post owner to be able to delete post
    else if (post.username === user.username) {
      await Post.findByIdAndDelete(postId);
      return "Delete successful";
      // not allow for other users to delete others post
    } else return new AuthenticationError("Action not allowd");
  } catch (error) {
    return new CheckResultAndHandleErrors(error);
  }
};
