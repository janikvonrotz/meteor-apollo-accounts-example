import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`recover-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
  return Meteor.absoluteUrl(`email-verification/${token}`);
};

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile ? options.profile : { firstname: "", lastname: "" }

  if (!user.emails[0].verified) {
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);
  }
  
  return user
});
