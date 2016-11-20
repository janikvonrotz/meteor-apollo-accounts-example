import { Meteor } from 'meteor/meteor'
import { Resolvers } from 'meteor/nicolaslopezj:apollo-accounts'
import _ from 'underscore'
import { Posts, pubsub } from './index'

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
        let _id = Posts.insert(args)
        args._id = _id
        pubsub.publish('postInserted', args)
        return { _id: _id }
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
    updatePost(root, args, context){
      let { userId } = context ? context : { userId: null }
      if(userId) {
        let _id = args._id
        delete args._id
        return { success: Posts.upsert(_id, { $set: args }) }
      } else {
        throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
      }
    },
  },
  Subscription: {
    postInserted(post) {
      // the subscription payload is the post.
      return post;
    },
 },
}

export default resolvers
