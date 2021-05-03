const { gql } = require('apollo-server');

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
  
  type Query {
    surveys: [Survey!]!
    survey(id: ID!): Survey
  }
`;

  // type SurveyCreatedResponse {
  //   success: Boolean!
  //   message: String
  //   survey: Survey
  // }

  // type Mutation {
  //   createSurvey(title: String): SurveyResponse
  // }

module.exports = typeDefs;
