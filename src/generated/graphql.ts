import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AccessTToken = {
   __typename?: 'AccessTToken',
  token: Scalars['String'],
  expire: Scalars['Int'],
};

export type CreatePostInput = {
  title: Scalars['String'],
  body: Scalars['String'],
  isPublished?: Maybe<Scalars['Boolean']>,
};

export type GetPostsInput = {
  isPublished?: Maybe<GetPostsIsPublished>,
};

export enum GetPostsIsPublished {
  All = 'ALL',
  Published = 'PUBLISHED',
  NotPublished = 'NOT_PUBLISHED'
}

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginPayload = {
   __typename?: 'LoginPayload',
  user: User,
  accessToken: AccessTToken,
};

export type MePayload = {
   __typename?: 'MePayload',
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  register?: Maybe<Scalars['Boolean']>,
  login: LoginPayload,
  refreshToken: RefreshTokenPayload,
  createPost: Post,
};


export type MutationRegisterArgs = {
  registerInput?: Maybe<RegisterInput>
};


export type MutationLoginArgs = {
  loginInput?: Maybe<LoginInput>
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput
};

export type Post = {
   __typename?: 'Post',
  _id: Scalars['ID'],
  title: Scalars['String'],
  body: Scalars['String'],
  isPublished: Scalars['Boolean'],
  author: User,
};

export type Query = {
   __typename?: 'Query',
  me: MePayload,
  getPosts: Array<Post>,
  getPost: Post,
};


export type QueryGetPostsArgs = {
  getPostsInput?: Maybe<GetPostsInput>
};


export type QueryGetPostArgs = {
  _id: Scalars['ID']
};

export type RefreshTokenPayload = {
   __typename?: 'RefreshTokenPayload',
  user: User,
  accessToken: AccessTToken,
};

export type RegisterInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  role: UserRole,
};

export enum UserRole {
  Client = 'CLIENT',
  Internal = 'INTERNAL',
  Admin = 'ADMIN'
}


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  MePayload: ResolverTypeWrapper<MePayload>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  UserRole: UserRole,
  GetPostsInput: GetPostsInput,
  GetPostsIsPublished: GetPostsIsPublished,
  Post: ResolverTypeWrapper<Post>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  RegisterInput: RegisterInput,
  LoginInput: LoginInput,
  LoginPayload: ResolverTypeWrapper<LoginPayload>,
  AccessTToken: ResolverTypeWrapper<AccessTToken>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  RefreshTokenPayload: ResolverTypeWrapper<RefreshTokenPayload>,
  CreatePostInput: CreatePostInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  MePayload: MePayload,
  User: User,
  String: Scalars['String'],
  UserRole: UserRole,
  GetPostsInput: GetPostsInput,
  GetPostsIsPublished: GetPostsIsPublished,
  Post: Post,
  ID: Scalars['ID'],
  Boolean: Scalars['Boolean'],
  Mutation: {},
  RegisterInput: RegisterInput,
  LoginInput: LoginInput,
  LoginPayload: LoginPayload,
  AccessTToken: AccessTToken,
  Int: Scalars['Int'],
  RefreshTokenPayload: RefreshTokenPayload,
  CreatePostInput: CreatePostInput,
};

export type AccessTTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessTToken'] = ResolversParentTypes['AccessTToken']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  expire?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type LoginPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  accessToken?: Resolver<ResolversTypes['AccessTToken'], ParentType, ContextType>,
};

export type MePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MePayload'] = ResolversParentTypes['MePayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationRegisterArgs>,
  login?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, MutationLoginArgs>,
  refreshToken?: Resolver<ResolversTypes['RefreshTokenPayload'], ParentType, ContextType>,
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'createPostInput'>>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['MePayload'], ParentType, ContextType>,
  getPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, QueryGetPostsArgs>,
  getPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryGetPostArgs, '_id'>>,
};

export type RefreshTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RefreshTokenPayload'] = ResolversParentTypes['RefreshTokenPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  accessToken?: Resolver<ResolversTypes['AccessTToken'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  AccessTToken?: AccessTTokenResolvers<ContextType>,
  LoginPayload?: LoginPayloadResolvers<ContextType>,
  MePayload?: MePayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  RefreshTokenPayload?: RefreshTokenPayloadResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
