import {Meteor} from 'meteor/meteor'
import {Resolvers as Auth} from 'meteor/nicolaslopezj:apollo-accounts'

const resolvers = {
  Query: {
    me (root, {}, {userId}) {
      if (userId) {
        return Meteor.users.findOne(userId)
      }
    },
    posts (root, {}, {userId}) {
      if(userId) {
        return [
          {"_id": "85vf9834h893ml28c9sn232",
          "title": "Only authenticated users can see this text."},
          {"_id": "324f9dfddd834h893ml28cs",
          "title": "Only authenticated users can see this text."},
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
