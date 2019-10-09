import { createVadidator } from 'schemat';

import { ApolloContextType } from 'src/util/context';
import { Resolvers } from 'src/generated/graphql';
import { minStringValidator } from 'src/validators/minStringValidator';
import { requiredValidator } from 'src/validators/requiredValidator';
import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import Post from 'src/models/post';

const getPostValidation = createVadidator({
  _id: [requiredValidator, minStringValidator(1)],
});

export const deletePost: Resolvers<ApolloContextType>['Mutation']['deletePost'] = async (_, input, { userCan }) => {
  const validationErrors = getPostValidation(input);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  const post = await Post.findById(input._id);
  if (!post) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR_NO_SUCH_RECORD);

  if (!userCan.deletePost(post)) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

  await Post.findByIdAndRemove(input._id);

  return null;
};
