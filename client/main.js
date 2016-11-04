import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { App, Layout, NotFound, Register, Login } from './index'
import { getLoginToken } from 'meteor-apollo-accounts'
import { Router, Route, browserHistory } from 'react-router'

const networkInterface = createNetworkInterface(`/graphql`)
const client = new ApolloClient({
  networkInterface,
})

Meteor.startup(() => {
  render(<ApolloProvider client={client}>
    <Router history={browserHistory}>
     <Route component={Layout}>
       <Route path="/" component={App} />
       <Route path="/register" component={Register} />
       <Route path="/login" component={Login} />

       <Route path="*" component={NotFound} />
     </Route>
   </Router>
    <App client={apollo} />
  </ApolloProvider>, document.getElementById('render-target'))
});
