import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloClient, Notification } from './index'

class PostList extends React.Component {

  async insert(event){
    event.preventDefault()

    let { insertPost, data } = this.props
    let { title } = this.refs
    title = title.value

    try {
      const response = await insertPost({ title })
      Notification.success(response)
      data.refetch()
    } catch (error) {
      Notification.error(error)
    }
  }

  async delete(_id, event){
    event.preventDefault()

    let { deletePost, data } = this.props

    try {
      const response = await deletePost({ _id })
      Notification.success(response)
      data.refetch()
    } catch (error) {
      Notification.error(error)
    }
  }

  render() {
    let { posts, loading } = this.props.data

    return loading ? (<p>Loading...</p>) : (
      <div>
        <h2>Posts</h2>
        <form onSubmit={this.insert.bind(this)}>
          <label>Title: </label>
          <input
          defaultValue="Untitled"
          type="text"
          required="true"
          ref="title" />
          <br />
          <button type="submit">Insert Post</button>
        </form>
        { posts ? (
          <ul>
            {posts.map((post) => {
              return (
                <li key={post._id}>{post.title} <button onClick={this.delete.bind(this, post._id)}>Delete</button></li>
              )
            })}
          </ul>
        ) : <p>No posts available.</p> }
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
}
`

const insertPost = gql`
mutation insertPost($title: String) {
  insertPost(title: $title){
    _id
  }
}
`

const deletePost = gql`
mutation deletePost($_id: ID) {
  deletePost(_id: $_id){
    success
  }
}
`

PostList = graphql(deletePost, {
  props({ mutate }) {
    return {
      deletePost({_id}) {
        return mutate({ variables: { _id }})
      }
    }
  },
})(graphql(insertPost, {
  props({ mutate }) {
    return {
      insertPost({title}) {
        return mutate({ variables: { title }})
      }
    }
  },
})(graphql(query)(PostList)))

export default PostList
