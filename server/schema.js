import { SchemaMutations, SchemaTypes } from 'meteor/nicolaslopezj:apollo-accounts'

const schema = `
${SchemaTypes}
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
  name: String
}
type Mutation {
  ${SchemaMutations}
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
