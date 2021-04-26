const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const SurveyAPI = require('./src/datasources/survey');
const { createStore } = require('./src/store');
const resolvers = require('./src/resolvers');


const store = createStore();

const dataSources = () => ({
  surveyAPI: new SurveyAPI({ store }),
});

const server = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers,
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});