import { UserModelProps } from 'src/models/user';
import { UserRole } from 'src/generated/graphql';
import { PostModelProps } from 'src/models/post';

export type UserCanPayload = {
  getUser(): boolean;
  getUsers(): boolean;
  getUnpublishedPosts(): boolean;
  createPost(): boolean;
  getPost(post: PostModelProps): boolean;
  updatePost(post: PostModelProps): boolean;
  deletePost(post: PostModelProps): boolean;
};

export function userCan(user: UserModelProps | undefined): UserCanPayload {
  function canManageUsers() {
    return user && [UserRole.Admin].includes(user.role);
  }

  function canManagePosts() {
    return user && [UserRole.Internal, UserRole.Admin].includes(user.role);
  }

  return {
    getUser() {
      return canManageUsers();
    },
    getUsers() {
      return canManageUsers();
    },
    getUnpublishedPosts() {
      return canManagePosts();
    },
    createPost() {
      return canManagePosts();
    },
    getPost(post) {
      if (!post.isPublished) {
        return canManagePosts();
      }

      return true;
    },
    updatePost(post) {
      return canManagePosts();
    },
    deletePost(post) {
      return canManagePosts();
    },
  };
}
