import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Posts } from './index'

export default () => {
  if(Posts.find({}).count() === 0){
    let posts = [
      { title: 'A hundred reasons why Meteor is great!' },
      { title: 'Why you should learn GraphQL with Apollo.' },
      { title: 'React has a promising future.' },
    ]

    console.log(`Add posts to the database.`)

    posts.map((post) => {
      Posts.insert(post)
    })
  }

  if (Meteor.users.find().count() === 0 ) {

    let users = [
      {
        email: 'admin@example.com',
        password: 'password',
        firstname: 'Admin',
        lastname: 'McAdmin',
        roles: ['admin'],
      },
    ];

    users.map((user) => {

      console.log(`Add user ${user.email} to the database.`)

      var userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname,
          name: `${user.firstname} ${user.lastname}`
        },
        roles: user.roles,
      })

      Meteor.users.update(userId, {$set: {'emails.0.verified': true}})
    })
  }
}
