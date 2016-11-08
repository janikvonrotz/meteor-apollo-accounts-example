import { Meteor } from 'meteor/meteor'
import { Resolvers as Auth } from 'meteor/nicolaslopezj:apollo-accounts'
import _ from 'underscore'

const resolvers = {
  Query: {
    me (root, args, context) {
      var { userId } = context ? context : { userId: null }
      if (userId) {
        return Meteor.users.findOne(userId)
      }
    },
    posts (root, args, context) {
      var { userId } = context ? context : { userId: null }
      if(userId) {
        return [
          {"_id": "85vf9834h893ml28c9sn232",
          "title": "Secret post title."},
          {"_id": "324f9dfddd834h893ml28cs",
          "title": "Another secret post title."},
        ]
      }
    }
  },
  Mutation: {
    ...Auth,
    updateProfile(root, args, context){
      let { userId } = context ? context : { userId: null }
      let user = Meteor.users.findOne(userId)
      let profile = _.extend(user.profile, args)
      Meteor.users.update(user._id, { $set: { profile: profile } });
      return { success: true }
    }
  }
}

export default resolvers
