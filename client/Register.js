import React from 'react'
import { createUser } from 'meteor-apollo-accounts'

createUser({username, email, password}, apollo)

class Register extends React.Component {

  async register(event) {
    event.preventDefault();

    let { client, data } = this.props
    let { firstname, lastnameemail, password } = this.refs
    firstname = firstname.value
    lastname = lastname.value
    email = email.value
    password = password.value

    try {
      const response = await createUser({email, password}, client)
      console.log('response', response)
      data.refetch()
    } catch (error) {
      alert(error)
    }
  }

  render() {
    let { posts, me } = this.props.data
    return (
      <div>
          <form onSubmit={this.register.bind(this)}>
              <label>Firstname: </label>
              <input
              type="text"
              ref="firstname" />
              <br />

              <label>Lastname: </label>
              <input
              type="text"
              ref="lastname" />
              <br />

              <label>Email: </label>
              <input
              defaultValue="admin@example.com"
              type="email"
              ref="email" />
              <br />

              <label>Password: </label>
              <input
              defaultValue="password"
              type="password"
              ref="password" />
              <br />

              <button type="submit">Register</button>
          </form>
      </div>
    );
  }
}

export default Register
