const Posts = require("../../models/Posts");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Posts.find();
        console.log("posts =======>", posts);
        return posts;
      } catch (error) {
        console.log("error =========>", error);
        throw new Error(error);
      }
    },
  },
};
