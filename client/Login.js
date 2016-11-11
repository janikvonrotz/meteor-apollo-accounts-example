import React from 'react'
import { loginWithPassword } from 'meteor-apollo-accounts'
import { ApolloClient } from './index'

class Login extends React.Component {

  async login(event) {
    event.preventDefault();

    let { data } = this.props
    let { email, password } = this.refs
    email = email.value
    password = password.value

    try {
      const response = await loginWithPassword({ email, passwordc}, ApolloClient)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login.bind(this)}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
