const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Answer {
    id: ID!
    surveyId: ID!
    count: Int!
    text: String!
    rank: Int!
  }

  type Survey {
    id: ID!
    title: String
    totalAnswers: Int
    answers: [Answer!]!
  }

  type Game {
    token: String
  }

  type GameCreatedResponse {
    game: Game!
  }  

  type Query {
    surveys: [Survey!]!
    survey(id: ID!): Survey
    games: [Game]
  }

  type Mutation {
    createGame: GameCreatedResponse
  }
  
  type Subscription {
    gameCreated: Game
  }
`;

module.exports = typeDefs;
