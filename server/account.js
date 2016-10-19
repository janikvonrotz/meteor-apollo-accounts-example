import {Meteor} from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export default () => {

  Accounts.onCreateUser((options, user) => {

    user.profile = options.profile ? options.profile : {};
    user.admin = options.admin;

    return user;
  });
}
