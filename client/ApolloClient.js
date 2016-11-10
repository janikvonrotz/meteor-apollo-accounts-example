import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { getLoginToken } from 'meteor-apollo-accounts'

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
const client = new ApolloClient({
  networkInterface,
})

export default client
