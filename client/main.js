import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { App, Layout, NotFound, Login } from './index'
import { getLoginToken } from 'meteor-apollo-accounts'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface(`/graphql`)
const client = new ApolloClient({
  networkInterface,
})

class AppWrapper extends React.Component {
  render() {
    return (
      <App client={client} />
    )
  }
}

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>, document.getElementById('render-target')
  )
});

<Router history={browserHistory}>
 <Route component={Layout}>
   <Route path="/" component={AppWrapper} />
   <Route path="/login" component={Login} />
   <Route path="*" component={NotFound} />
 </Route>
</Router>
