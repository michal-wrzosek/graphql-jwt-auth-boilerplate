import { UserInputError, ForbiddenError, AuthenticationError } from 'apollo-server-core';
import { createVadidator } from 'schemat';

import { Resolvers } from 'src/generated/graphql';
import { minStringValidator } from 'src/validators/minStringValidator';
import { booleanValidator } from 'src/validators/booleanValidator';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import Post from 'src/models/post';
import { ApolloContextType } from 'src/util/context';

const validator = createVadidator({
  title: minStringValidator(1),
  body: minStringValidator(1),
  isPublished: booleanValidator,
});

export const updatePost: Resolvers<ApolloContextType>['Mutation']['updatePost'] = async (
  _,
  { _id, updatePostInput },
  { user, userCan },
) => {
  if (!user) throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  const validationErrors = validator(updatePostInput);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  let post = await Post.findById(_id);
  if (!post) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR_NO_SUCH_RECORD);

  if (!userCan.updatePost(post)) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

  post = await Post.findByIdAndUpdate(_id, updatePostInput, { new: true });

  return post.toObject();
};
