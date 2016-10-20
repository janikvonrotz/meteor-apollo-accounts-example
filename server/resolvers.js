import { Meteor } from 'meteor/meteor'
import { Resolvers as Auth } from 'meteor/nicolaslopezj:apollo-accounts'

const resolvers = {
  Query: {
    me (root, args, context) {
      var { userId } = context
      if (userId) {
        return Meteor.users.findOne(userId)
      }
    },
    posts (root, args, context) {
      var { userId } = context
      if(userId) {
        return [
          {"_id": "85vf9834h893ml28c9sn232",
          "title": "Secret post title."},
          {"_id": "324f9dfddd834h893ml28cs",
          "title": "Another secret post title."},
        ]
      } else {
        return []
      }
    }
  },
  Mutation: {
    ...Auth
  }
}

export default resolvers
