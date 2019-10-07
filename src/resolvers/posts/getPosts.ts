import { ForbiddenError } from 'apollo-server-core';

import { Resolvers, UserRole } from 'src/generated/graphql';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import { getAuthenticatedUser } from 'src/util/getAuthenticatedUser';
import Post from 'src/models/post';

export const getPosts: Resolvers['Query']['getPosts'] = async (_, { accessToken, getPostsInput }) => {
  const user = await getAuthenticatedUser(accessToken);

  let searchConditions = { isPublished: true };

  if (getPostsInput && typeof getPostsInput.isPublished !== 'undefined') {
    if (![UserRole.Internal, UserRole.Admin].includes(user.role))
      throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

    searchConditions = { isPublished: getPostsInput.isPublished };
  }

  const posts = await Post.find(searchConditions);

  return posts;
};
