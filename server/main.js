import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import schema from './schema';

const GRAPHQL_PORT = 4000;
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
  printErrors: true,
});
var app = express();

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/graphql', bodyParser.json(), apolloExpress({ schema: executableSchema }));
app.listen(GRAPHQL_PORT);

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
