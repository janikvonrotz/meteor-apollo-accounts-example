import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloClient, Notification } from './index'
import update from 'react-addons-update'

const subscription_query = gql`
  subscription postInserted {
    postInserted {
      _id
      title
    }
  }
`;

class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.subscription = null
  }

  componentWillReceiveProps(nextProps) {
    // we don't resubscribe on changed props, because it never happens in our app
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = this.props.data.subscribeToMore({
        document: subscription_query,
        updateQuery: (previousResult, { subscriptionData }) => {
          console.log('updateQuery', subscriptionData)
          console.log('previousResult', previousResult)
          return update(previousResult, {
            posts: {
              $push: [subscriptionData.data.postInserted],
            },
          })
        },
      })
    }
  }

  async insert(event) {
    event.preventDefault()

    let { insertPost, data } = this.props
    let { insertTitle } = this.refs
    let title = insertTitle.value

    try {
      const response = await insertPost({ title })
      Notification.success(response)
    } catch (error) {
      Notification.error(error)
    }
  }

  async delete(_id, event) {
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

  edit(_id) {
    this.setState({edit: _id})
  }

  async update(_id) {
    let { updatePost, data } = this.props

    let { updateTitle } = this.refs
    let title = updateTitle.value

    try {
      const response = await updatePost({ _id, title })
      Notification.success(response)
      this.setState({edit: null})
      data.refetch()
    } catch (error) {
      Notification.error(error)
    }
  }

  render() {
    let { posts, loading } = this.props.data
    let { edit } = this.state

    return loading ? (<p>Loading...</p>) : (
      <div>
        <h2>Posts</h2>
        <form onSubmit={this.insert.bind(this)}>
          <label>Title: </label>
          <input
          defaultValue="Untitled"
          type="text"
          required="true"
          ref="insertTitle" />
          <br />
          <button type="submit">Insert Post</button>
        </form>
        { posts ? (
          <ul>
            {posts.map((post) => {
              return (
                edit === post._id ?
                  <li key={post._id}>
                    <input
                    ref="updateTitle"
                    defaultValue={post.title}
                    size="50"
                    type="text" />
                    <button onClick={this.update.bind(this, post._id)}>Update</button>
                  </li> : <li key={post._id}>
                    <span onClick={this.edit.bind(this, post._id)}>{post.title} </span>
                    <button onClick={this.delete.bind(this, post._id)}>Delete</button>
                  </li>
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

const updatePost = gql`
mutation updatePost($_id: ID, $title: String) {
  updatePost(_id: $_id, title: $title){
    success
  }
}
`

PostList = graphql(updatePost, {
  props({ mutate }) {
    return {
      updatePost({_id, title}) {
        return mutate({ variables: { _id, title }})
      }
    }
  },
})(graphql(deletePost, {
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
})(graphql(query)(PostList))))

export default PostList
