const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const typeDefs = require('./src/schema');
const toResolvers = require('./src/resolvers');
const express = require('express');
const http = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { PubSub } = require('graphql-subscriptions');

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const resolvers = toResolvers(new PubSub())
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
    path: httpServer.graphqlPath,
  });    
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {},
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),  
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }      
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
