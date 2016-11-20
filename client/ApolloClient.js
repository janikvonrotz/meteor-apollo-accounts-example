import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { getLoginToken } from 'meteor-apollo-accounts'
import { Client } from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from './index';

const wsClient = new Client('ws://localhost:8080');

const networkInterface = createNetworkInterface({ uri: '/graphql' })
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers.authorization = getLoginToken() || null
    next()
  }
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
})

export default client
