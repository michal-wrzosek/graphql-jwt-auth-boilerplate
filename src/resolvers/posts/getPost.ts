import { createVadidator } from 'schemat';

import { ApolloContextType } from 'src/util/context';
import { Resolvers, UserRole } from 'src/generated/graphql';
import { minStringValidator } from 'src/validators/minStringValidator';
import { requiredValidator } from 'src/validators/requiredValidator';
import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import Post from 'src/models/post';

const getPostValidation = createVadidator({
  _id: [requiredValidator, minStringValidator(1)],
});

export const getPost: Resolvers<ApolloContextType>['Query']['getPost'] = async (_, input, { user }) => {
  const validationErrors = getPostValidation(input);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  const post = await Post.findOne({ _id: input._id });
  if (!post) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR_NO_SUCH_RECORD);

  if (!post.isPublished && (!user || ![UserRole.Internal, UserRole.Internal].includes(user.role)))
    throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

  return post.toObject();
};
