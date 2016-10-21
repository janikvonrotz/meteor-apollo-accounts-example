import { makeExecutableSchema } from 'graphql-tools'
import { resolvers, schema, account, seed } from './index'
import { createApolloServer } from 'meteor/apollo';

seed();

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  allowUndefinedInResolve: true,
  printErrors: true,
});
createApolloServer({
  schema: executableSchema,
});
