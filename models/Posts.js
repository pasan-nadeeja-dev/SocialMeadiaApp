const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  
});

module.exports = model("Posts", postSchema);
