import { SchemaMutations, SchemaTypes } from 'meteor/nicolaslopezj:apollo-accounts'
import { resolvers } from './index'
import { makeExecutableSchema } from 'graphql-tools'

const rootSchema = [`

${SchemaTypes({
  CreateUserProfileInput: `
    firstname: String!
    lastname: String!
    name: String!
  `
})}
type Post {
  _id: ID
  title: String
}
type User {
  _id: ID
  emails: [Email]
  profile: UserProfile
}
type Email {
  address: String
  verified: Boolean
}
type UserProfile {
  firstname: String
  lastname: String
  name: String
}

type Mutation {
  ${SchemaMutations()}
  updateProfile(
    firstname: String
    lastname: String
    name: String
  ): SuccessResponse
  insertPost(
    title: String
  ): Post
  deletePost(
    _id: ID
  ): SuccessResponse
  updatePost(
    _id: ID
    title: String
  ): SuccessResponse
}

type Subscription {
  postInserted: Post
  postDeleted: ID
  postUpdated: Post
}

type Query {
  me: User
  posts: [Post]
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`]

const schema = [...rootSchema]

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  allowUndefinedInResolve: true,
  printErrors: true,
});

export default executableSchema;
