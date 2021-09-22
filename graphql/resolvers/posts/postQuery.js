const Posts = require("../../../models/Posts");

module.exports = {
  Query: {
    // get all posts
    async getPosts() {
      try {
        const posts = await Posts.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    // get single post-by-id
    async getPost(id) {
      try {
        const post = await Posts.findById(id);
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
