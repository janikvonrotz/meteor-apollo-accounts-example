import {SchemaMutations as Auth} from 'meteor/nicolaslopezj:apollo-accounts'

const schema = `
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
  ${Auth}
}
type Query {
  me: User
}
schema {
  query: Query
  mutation: Mutation
}
`
export default [schema];
