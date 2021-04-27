const { gql } = require('apollo-server');

const typeDefs = gql`
  type SurveyResponse {
    id: ID!
    surveyId: ID!
    count: Int
    text: String
    rank: Int
  }

  type Survey {
    id: ID!
    title: String
    totalResponses: Int
    responses: [SurveyResponse]
  }
  
  type Query {
    surveys: [Survey!]!
    survey(id: ID!): Survey
  }
`;


  // type SurveyResponse {
  //   success: Boolean!
  //   message: String
  //   survey: Survey
  // }

  // type Mutation {
  //   createSurvey(title: String): SurveyResponse
  // }

module.exports = typeDefs;
