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
    strikes: Int!
  }

  type Player {
    id: ID!
    name: String
  }

  enum RoundStatus {
    Faceoff,
    Playing,
    Steal,
    Completed
  }

  type Round {
    status: RoundStatus
  }

  type Game {
    token: String
    players: [Player!]!
    survey: Survey
    turn: Int
    currentRound: Round
  }

  type Query {
    surveys: [Survey!]!
    survey(id: ID!): Survey
    games: [Game]
  }

  type Mutation {
    createGame: Game
    startGame(token: String): Game
    joinGame(token: String!, playerName: String!): Game
    revealAnswer(answerId: String!, token: String!): Game
    giveStrike(surveyId: String!): Game
  }
  
  type Subscription {
    gameCreated: Game
    gameStarted: Game
    playerJoined: Game,
    answerRevealed: Game,
    strikeGiven: Game
  }
`;

module.exports = typeDefs;
