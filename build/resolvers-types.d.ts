import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export type Mutation = {
    __typename?: 'Mutation';
    addUserToSession?: Maybe<Session>;
    createSession?: Maybe<Session>;
    createUser?: Maybe<User>;
    updateVote?: Maybe<User>;
};
export type MutationAddUserToSessionArgs = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
};
export type MutationCreateSessionArgs = {
    hostUserId: Scalars['String'];
};
export type MutationCreateUserArgs = {
    username: Scalars['String'];
};
export type MutationUpdateVoteArgs = {
    userId: Scalars['String'];
    vote: Scalars['Int'];
};
export type Query = {
    __typename?: 'Query';
    session?: Maybe<Session>;
    user?: Maybe<User>;
};
export type QuerySessionArgs = {
    id: Scalars['String'];
};
export type QueryUserArgs = {
    id: Scalars['String'];
};
export type Session = {
    __typename?: 'Session';
    hostUserId: Scalars['String'];
    id: Scalars['String'];
    participants?: Maybe<Array<Maybe<User>>>;
};
export type Store = {
    __typename?: 'Store';
    sessions?: Maybe<Array<Maybe<Session>>>;
    users?: Maybe<Array<Maybe<User>>>;
};
export type Subscription = {
    __typename?: 'Subscription';
    hello?: Maybe<Scalars['String']>;
    sessionUpdated?: Maybe<Session>;
};
export type SubscriptionSessionUpdatedArgs = {
    id: Scalars['String'];
};
export type User = {
    __typename?: 'User';
    id: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    vote?: Maybe<Scalars['Int']>;
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    Session: ResolverTypeWrapper<Session>;
    Store: ResolverTypeWrapper<Store>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Subscription: ResolverTypeWrapper<{}>;
    User: ResolverTypeWrapper<User>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    Boolean: Scalars['Boolean'];
    Int: Scalars['Int'];
    Mutation: {};
    Query: {};
    Session: Session;
    Store: Store;
    String: Scalars['String'];
    Subscription: {};
    User: User;
}>;
export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    addUserToSession?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<MutationAddUserToSessionArgs, 'sessionId' | 'userId'>>;
    createSession?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<MutationCreateSessionArgs, 'hostUserId'>>;
    createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'username'>>;
    updateVote?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateVoteArgs, 'userId' | 'vote'>>;
}>;
export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<QuerySessionArgs, 'id'>>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;
export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
    hostUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    participants?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = ResolversObject<{
    sessions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Session']>>>, ParentType, ContextType>;
    users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
    hello?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "hello", ParentType, ContextType>;
    sessionUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Session']>, "sessionUpdated", ParentType, ContextType, RequireFields<SubscriptionSessionUpdatedArgs, 'id'>>;
}>;
export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    vote?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type Resolvers<ContextType = any> = ResolversObject<{
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Session?: SessionResolvers<ContextType>;
    Store?: StoreResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
}>;
