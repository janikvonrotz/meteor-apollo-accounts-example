import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class App extends React.Component {

  render() {
    let { posts, me } = this.props.data
    return (
      <div>
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
