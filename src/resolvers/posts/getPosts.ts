import { ForbiddenError } from 'apollo-server-core';

import { Resolvers, GetPostsIsPublished } from 'src/generated/graphql';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import Post from 'src/models/post';
import { ApolloContextType } from 'src/util/context';

export const getPosts: Resolvers<ApolloContextType>['Query']['getPosts'] = async (
  _,
  { getPostsInput },
  { userCan },
) => {
  let searchConditions = { isPublished: true };

  if (getPostsInput) {
    if (getPostsInput.isPublished === GetPostsIsPublished.NotPublished) {
      if (!userCan.getUnpublishedPosts()) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

      searchConditions = { ...searchConditions, isPublished: false };
    }

    if (getPostsInput.isPublished === GetPostsIsPublished.All) {
      if (!userCan.getUnpublishedPosts()) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

      delete searchConditions.isPublished;
    }
  }

  const posts = await Post.find(searchConditions);

  return posts.map(post => post.toObject());
};
