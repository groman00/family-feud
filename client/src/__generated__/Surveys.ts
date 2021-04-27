/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Surveys
// ====================================================

export interface Surveys_surveys_responses {
  __typename: "SurveyResponse";
  id: string;
  text: string | null;
  count: number | null;
  rank: number | null;
}

export interface Surveys_surveys {
  __typename: "Survey";
  id: string;
  title: string | null;
  totalResponses: number | null;
  responses: (Surveys_surveys_responses | null)[] | null;
}

export interface Surveys {
  surveys: Surveys_surveys[];
}
