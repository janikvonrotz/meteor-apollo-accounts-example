import { makeExecutableSchema } from 'graphql-tools'
import { resolvers, schema, account, seed, Posts } from './index'
import { createApolloServer } from 'meteor/apollo';

// seed the database
seed()

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
