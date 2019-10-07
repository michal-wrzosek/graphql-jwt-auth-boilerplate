import { ForbiddenError } from 'apollo-server-core';

import { Resolvers, UserRole, GetPostsIsPublished } from 'src/generated/graphql';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import Post from 'src/models/post';
import { ApolloContextType } from 'src/util/context';

export const getPosts: Resolvers<ApolloContextType>['Query']['getPosts'] = async (_, { getPostsInput }, { user }) => {
  let searchConditions = { isPublished: true };

  if (getPostsInput) {
    if (getPostsInput.isPublished === GetPostsIsPublished.NotPublished) {
      if (!user) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);
      if (![UserRole.Internal, UserRole.Admin].includes(user.role))
        throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

      searchConditions = { ...searchConditions, isPublished: false };
    }

    if (getPostsInput.isPublished === GetPostsIsPublished.All) {
      if (!user) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);
      if (![UserRole.Internal, UserRole.Admin].includes(user.role))
        throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

      delete searchConditions.isPublished;
    }
  }

  const posts = await Post.find(searchConditions);

  return posts.map(post => post.toObject());
};
