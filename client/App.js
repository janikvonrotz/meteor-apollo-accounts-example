import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class App extends React.Component {

  render() {
    let { posts, me, loading } = this.props.data

    return loading ? (<p>Loading...</p>) : (
      <div>
        { me ? <p>Hi {me.profile.firstname} {me.profile.lastname}, you are logged in.</p> : <p>You are logged out.</p> }
        { (me && !me.emails[0].verified) ? <p>Please verify your email address.</p> : ''}
        { posts ? (
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
        ) : '' }
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
    profile {
      firstname
      lastname
    }
    emails {
      verified
    }
  }
}
`
App = graphql(query)(App)

export default App
