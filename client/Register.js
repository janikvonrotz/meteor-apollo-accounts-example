import React from 'react'
import { createUser } from 'meteor-apollo-accounts'
import { ApolloClient } from './index'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
      console.log(response)
      updateProfile({firstname: firstname, lastname: lastname})
      .then((response) => {
        console.log(response)
        // browserHistory.push(`/email-verification`)
      }).catch((error) => {
        console.log(error)
      });
    } catch (error) {
      console.log(error)
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
