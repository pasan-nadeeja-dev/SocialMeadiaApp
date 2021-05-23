const Posts = require("../../models/Posts");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Posts.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
