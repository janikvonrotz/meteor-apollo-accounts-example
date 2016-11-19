import { SchemaMutations, SchemaTypes } from 'meteor/nicolaslopezj:apollo-accounts'

const schema = `
${SchemaTypes}
type Mutation {
  ${SchemaMutations}
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
type Query {
  me: User
  posts: [Post]
}
schema {
  query: Query
  mutation: Mutation
}
`
export default [schema];
