import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { loginWithPassword, logout } from 'meteor-apollo-accounts'
import { ApolloClient } from './index'

class App extends React.Component {

  async login(event) {
    event.preventDefault();
    let { data } = this.props
    let { email, password } = this.refs
    email = email.value
    password = password.value
    try {
      const response = await loginWithPassword({email, password}, ApolloClient)
      console.log(response)
      data.refetch()
    } catch (error) {
      console.log(error)
    }
  }

  async logout(event) {
    event.preventDefault()
    let { data } = this.props
    try {
      const response = await logout(ApolloClient)
      console.log(response)
      data.refetch()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { posts, me } = this.props.data
    return (
      <div>
        <form>
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

          <button type="button" onClick={this.login.bind(this)}>Login</button>
          <button type="button" onClick={this.logout.bind(this)}>Logout</button>
        </form>
        { me ? <p>Hi {me.profile.firstname} {me.profile.lastname}, you are logged in.</p> : <p>You are logged out.</p> }
        {(()=>{
          if(posts){
            return (
              <div>
                <h2>Posts</h2>
                <ul>
                  {posts.map((post) => {
                    return (
                      <li key={post._id}>{post.title}</li>
                    )
                  })}
                </ul>
              </div>
            )
          }
        })()}
      </div>
    )
  }
}

const query = gql`
query getCurrentUser {
  posts {
    _id
    title
  }
  me {
    _id
    profile {
      firstname
      lastname
    }
  }
}
`
const AppWithData = graphql(query)(App)

export default AppWithData
