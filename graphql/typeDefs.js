const { gql } = require("apollo-server");

module.exports = gql`
  "type : Post => includes id, body, username, createdAt"
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  "type : User => includes id, email, username, token, createdAt"
  type User {
    id: ID!
    email: String!
    username: String!
    "Authorization token for use with requests to authenticated routes"
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;
