import React from 'react'
import { resetPassword, forgotPassword } from 'meteor-apollo-accounts'
import { ApolloClient } from './index'

class RecoverPassword extends React.Component {

  reset(event){
    event.preventDefault()

  }

  async forgot(event) {
    event.preventDefault()

    let { email } = this.refs
    email = email.value

    try {
      const response = await forgotPassword({ email }, ApolloClient)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log(this.props)
    const { token } = this.props.params;

    return (
      <div>

        <p>Reset your new password.</p>

        <form onSubmit={this.reset.bind(this)}>

          <label>New Password: </label>
          <input
          type="password"
          required="true"
          ref="newPassword" />
          <br />

          <label>Repeat Password: </label>
          <input
          type="password"
          required="true"
          ref="repeatPassword" />
          <br />

          <button type="submit">Set Password</button>
        </form>

        <p>Send password reset link.</p>

        <form onSubmit={this.forgot.bind(this)}>

          <label>Email: </label>
          <input
          defaultValue="user@example.com"
          type="email"
          required="true"
          ref="email" />
          <br />

          <button type="submit">Send Link</button>
        </form>

      </div>
    );
  }
}

export default RecoverPassword
