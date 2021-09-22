const postQuery = require("./postQuery");
const { createPost } = require("./createPost");
const { deletePost } = require("./deletePost");

module.exports = {
  Query: {
    ...postQuery.Query,
  },
  Mutation: {
    createPost: createPost,
    deletePost: deletePost,
  },
};
