import {Meteor} from 'meteor/meteor'
import {Resolvers as Auth} from 'meteor/nicolaslopezj:apollo-accounts'

const resolvers = {
  Query: {
    me (root, {}, {userId}) {
      if (userId) {
        return Meteor.users.findOne(userId)
      }
    }
  },
  RootMutation: {
    ...Auth
  }
}

export default resolvers;
