import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const networkInterface = createNetworkInterface(`/graphql`);
const apollo = new ApolloClient({
  networkInterface
});

Meteor.startup(() => {
  render(<ApolloProvider client={apollo}>
    <App client={apollo} />
  </ApolloProvider>, document.getElementById('render-target'));
});
