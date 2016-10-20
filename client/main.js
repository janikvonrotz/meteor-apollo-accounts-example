import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import { getLoginToken } from 'meteor-apollo-accounts'

const networkInterface = createNetworkInterface(`/graphql`)
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers.authorization = getLoginToken() || null
    next()
  }
}]);
const apollo = new ApolloClient({
  networkInterface,
})

Meteor.startup(() => {
  render(<ApolloProvider client={apollo}>
    <App client={apollo} />
  </ApolloProvider>, document.getElementById('render-target'))
});
