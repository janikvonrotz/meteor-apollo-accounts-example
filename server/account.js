import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile ? options.profile : { firstname: "", lastname: "" }
  return user
});
