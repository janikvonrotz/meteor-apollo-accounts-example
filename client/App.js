import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class App extends React.Component {

  render() {
    let { posts, me, loading } = this.props.data

    return (loading || !me) ? (<p>Loading...</p>) : (
      <div>
        <small>Make sure to reload this page after login or logout. <a href="https://github.com/nicolaslopezj/meteor-apollo-accounts/issues/1"> Help fixing this issue.</a></small>
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
    profile {
      firstname
      lastname
    }
  }
}
`
App = graphql(query)(App)

export default App
