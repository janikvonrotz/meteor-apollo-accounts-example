import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

if (Meteor.users.find().count() === 0 ) {

  var users = [
    {
      email: 'admin@example.com',
      password: 'password',
      firstname: 'Admin',
      lastname: 'McAdmin',
      roles: ['admin'],
    },
  ];

  users.map((user) => {

    console.log(`add user ${user.email} to the database.`)

    var userId = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        firstname: user.firstname,
        lastname: user.lastname,
        name: `${user.firstname} ${user.lastname}`
      },
      roles: user.roles,
    });

    Meteor.users.update(userId, {$set: {'emails.0.verified': true}})
  });
}
