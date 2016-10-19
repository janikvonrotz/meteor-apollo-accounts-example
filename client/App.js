import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { loginWithPassword } from 'meteor-apollo-accounts'

class App extends React.Component {

  login(event){
    event.preventDefault();

    let { client } = this.props
    let { email, password } = this.refs
    email = email.value
    password = password.value

    loginWithPassword({email, password}, client)
    // refetch on successful login
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <h1>App</h1>
          <form onSubmit={this.login.bind(this)}>
            <fieldset>

              Email: <input
              defaultValue="admin@example.com"
              type="email"
              ref="email" /><br />

              Password: <input
              defaultValue="password"
              type="password"
              ref="password" /><br />

              <button type="submit">Login</button>
            </fieldset>
          </form>
      </div>
    );
  }
}

const query = gql`
query getCurrentUser {
  posts {
    title
  }
  me {
    _id
  }
}
`
const AppWithData = graphql(query)(App)

export default AppWithData
