import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';

import { Resolvers } from 'src/generated/graphql';
import { ApolloContextType } from './types/ApolloContextType';
import { register } from 'src/resolvers/register';
import { login } from './resolvers/login';
import { me } from './resolvers/me';
import { refreshToken } from './resolvers/refreshToken';
import { createPost } from './resolvers/posts/createPost';
import { getPosts } from './resolvers/posts/getPosts';

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

  input GetPostsInput {
    isPublished: Boolean
  }

  type Query {
    me(accessToken: String!): MePayload!
    getPosts(accessToken: String!, getPostsInput: GetPostsInput): [Post!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): Boolean
    login(loginInput: LoginInput): LoginPayload!
    refreshToken: RefreshTokenPayload!
    createPost(accessToken: String!, createPostInput: CreatePostInput!): Post!
  }
`;

export const PASSWORD_MIN_LENGTH = 6;

const resolvers: Resolvers<ApolloContextType> = {
  Query: {
    me,
    getPosts,
  },
  Mutation: {
    register,
    login,
    refreshToken,
    createPost,
  },
};

export const getApp = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }): ApolloContextType => ({ req, res }),
  });
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  server.applyMiddleware({ app });

  return app;
};
