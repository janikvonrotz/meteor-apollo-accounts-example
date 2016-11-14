import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`recover-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
  return Meteor.absoluteUrl(`email-verification/${token}`);
};

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile ? options.profile : { firstname: "", lastname: "", name: "" }

  if (user.services.google) {
    user.profile.firstname = user.services.google.given_name
    user.profile.lastname = user.services.google.family_name
    user.emails = [{ address: user.services.google.email, verified: true }]
  }

  if (user.services.facebook) {
    user.profile.firstname = user.services.facebook.first_name
    user.profile.lastname = user.services.facebook.last_name
    user.emails = [{ address: user.services.facebook.email, verified: true }]
  }

  if ((user.emails.length != -1) && (!user.emails[0].verified)) {
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);
  }

  return user
});
