import { Meteor } from 'meteor/meteor'
import { Resolvers } from 'meteor/nicolaslopezj:apollo-accounts'
import _ from 'underscore'
import { Posts } from './index'

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
        return Posts.find({}).fetch()
      }
    }
  },
  Mutation: {
    ...Resolvers,
    updateProfile(root, args, context){
      let { userId } = context ? context : { userId: null }
      let user = Meteor.users.findOne(userId)
      let profile = _.extend(user.profile, args)
      Meteor.users.update(user._id, { $set: { profile: profile } });
      return { success: true }
    },
    insertPost(root, args, context){
      let { userId } = context ? context : { userId: null }
      if(userId) {
        return { _id: Posts.insert(args) }
      } else {
        throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
      }
    },
    deletePost(root, args, context){
      let { userId } = context ? context : { userId: null }
      if(userId) {
        return { success: Posts.remove(args) }
      } else {
        throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
      }
    },
  }
}

export default resolvers
