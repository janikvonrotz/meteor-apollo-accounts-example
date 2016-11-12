import React from 'react'
import { createUser } from 'meteor-apollo-accounts'
import { ApolloClient, Notification } from './index'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { browserHistory } from 'react-router'

class Register extends React.Component {

  async register(event) {
    event.preventDefault();

    let { client, data, updateProfile } = this.props
    let { firstname, lastname, email, password } = this.refs
    firstname = firstname.value
    lastname = lastname.value
    email = email.value
    password = password.value

    try {
      const response = await createUser({email, password}, ApolloClient)
      Notification.success(response)
      ApolloClient.resetStore()
      updateProfile({firstname: firstname, lastname: lastname})
      .then((response) => {
        Notification.success(response)
        browserHistory.push('/email-verification')
      }).catch((error) => {
        Notification.error(error)
      });
    } catch (error) {
      Notification.error(error)
    }
  }

  render() {
    return (
      <div>
          <form onSubmit={this.register.bind(this)}>
              <label>Firstname: </label>
              <input
              defaultValue="John"
              type="text"
              required="true"
              ref="firstname" />
              <br />

              <label>Lastname: </label>
              <input
              defaultValue="Smith"
              type="text"
              required="true"
              ref="lastname" />
              <br />

              <label>Email: </label>
              <input
              defaultValue="user@example.com"
              type="email"
              required="true"
              ref="email" />
              <br />

              <label>Password: </label>
              <input
              defaultValue="password"
              type="password"
              required="true"
              ref="password" />
              <br />

              <button type="submit">Register</button>
          </form>
      </div>
    );
  }
}


const updateProfile = gql`
mutation updateProfile($firstname: String, $lastname: String) {
  updateProfile(firstname: $firstname, lastname: $lastname){
    success
  }
}
`

Register = graphql(updateProfile, {
  props({ mutate }) {
    return {
      updateProfile({firstname, lastname}) {
        return mutate({ variables: { firstname, lastname }})
      }
    }
  },
})(Register)

export default Register
