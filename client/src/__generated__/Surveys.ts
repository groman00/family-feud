/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Surveys
// ====================================================

export interface Surveys_surveys {
  __typename: "Survey";
  id: string;
  title: string | null;
  totalResponses: number | null;
}

export interface Surveys {
  surveys: Surveys_surveys[];
}
