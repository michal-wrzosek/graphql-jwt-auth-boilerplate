import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { createVadidator } from 'schemat';

import { Resolvers } from 'src/generated/graphql';
import { requiredValidator } from 'src/validators/requiredValidator';
import { minStringValidator } from 'src/validators/minStringValidator';
import { booleanValidator } from 'src/validators/booleanValidator';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import Post from 'src/models/post';
import { ApolloContextType } from 'src/util/context';

const createPostValidator = createVadidator({
  title: [requiredValidator, minStringValidator(1)],
  body: [requiredValidator, minStringValidator(1)],
  isPublished: booleanValidator,
});

export const createPost: Resolvers<ApolloContextType>['Mutation']['createPost'] = async (
  _,
  { createPostInput },
  { user },
) => {
  if (!user) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

  const validationErrors = createPostValidator(createPostInput);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  const post = await Post.create({ ...createPostInput, author: user });

  return post.toObject();
};
