import React from 'react'
import { loginWithPassword } from 'meteor-apollo-accounts'

class Login extends React.Component {

  async function login(event) => {
    event.preventDefault();
    let { client, data } = this.props
    let { email, password } = this.refs
    email = email.value
    password = password.value
    try {
      const response = await loginWithPassword({email, password}, client)
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
    );
  }
}

export default Login
