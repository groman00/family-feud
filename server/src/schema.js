const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Answer {
    id: ID!
    surveyId: ID!
    count: Int!
    text: String!
    rank: Int!
    revealed: Boolean!
  }

  type Survey {
    id: ID!
    title: String
    totalAnswers: Int
    answers: [Answer!]!
    gameId: Int
  }

  type Player {
    id: ID!
    name: String
  }

  type Game {
    token: String
    players: [Player!]!
    survey: Survey
  }

  type GameCreatedResponse {
    game: Game!
  }  

  type GameJoinedResponse {
    game: Game
  }    

  type Query {
    surveys: [Survey!]!
    survey(id: ID!): Survey
    games: [Game]
  }

  type Mutation {
    createGame: GameCreatedResponse
    joinGame(token: String!, playerName: String!): GameJoinedResponse
    # submitAnswer(id)
  }
  
  type Subscription {
    gameCreated: Game
    playerJoined: Game,
    answerRevealed: Game,
  }
`;

module.exports = typeDefs;
