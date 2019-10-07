import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';

import { Resolvers } from 'src/generated/graphql';
import { register } from 'src/resolvers/register';
import { login } from './resolvers/login';
import { me } from './resolvers/me';
import { refreshToken } from './resolvers/refreshToken';
import { createPost } from './resolvers/posts/createPost';
import { getPosts } from './resolvers/posts/getPosts';
import { author } from './resolvers/posts/author';
import { ApolloContextType, context } from './util/context';
import { getPost } from './resolvers/posts/getPost';

const typeDefs = gql`
  enum UserRole {
    CLIENT
    INTERNAL
    ADMIN
  }

  type User {
    email: String!
    role: UserRole!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    isPublished: Boolean!
    author: User!
  }

  type AccessTToken {
    token: String!
    expire: Int!
  }

  type MePayload {
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    isPublished: Boolean
  }

  type LoginPayload {
    user: User!
    accessToken: AccessTToken!
  }

  type RefreshTokenPayload {
    user: User!
    accessToken: AccessTToken!
  }

  enum GetPostsIsPublished {
    ALL
    PUBLISHED
    NOT_PUBLISHED
  }

  input GetPostsInput {
    isPublished: GetPostsIsPublished
  }

  type Query {
    me: MePayload!
    getPosts(getPostsInput: GetPostsInput): [Post!]!
    getPost(_id: ID!): Post!
  }

  type Mutation {
    register(registerInput: RegisterInput): Boolean
    login(loginInput: LoginInput): LoginPayload!
    refreshToken: RefreshTokenPayload!
    createPost(createPostInput: CreatePostInput!): Post!
  }
`;

export const PASSWORD_MIN_LENGTH = 6;

const resolvers: Resolvers<ApolloContextType> = {
  Query: {
    me,
    getPosts,
    getPost,
  },
  Mutation: {
    register,
    login,
    refreshToken,
    createPost,
  },
  Post: {
    author,
  },
};

export const getApp = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  server.applyMiddleware({ app });

  return app;
};
