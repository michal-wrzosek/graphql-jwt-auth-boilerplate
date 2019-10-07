import { Resolvers } from 'src/generated/graphql';
import User from 'src/models/user';

export const author: Resolvers['Post']['author'] = async post => {
  return await User.findOne({ _id: post.author });
};
