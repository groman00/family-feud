const { gql } = require('apollo-server');

const typeDefs = gql`
  type Response {
    id: ID!
    total: Int
    text: String
    rank: Int
  }

  type Survey {
    id: ID!
    title: String
    totalResponses: Int
    responses: [Response]
  }
  
  type Query {
    surveys: [Survey]!
    survey(id: ID!): Survey
  }

  type SurveyResponse {
    success: Boolean!
    message: String
    survey: Survey
  }

  type Mutation {
    createSurvey(title: String): SurveyResponse
  }
`;

module.exports = typeDefs;
