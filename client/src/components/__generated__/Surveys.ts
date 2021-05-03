/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Surveys
// ====================================================

export interface Surveys_surveys_answers {
  __typename: "Answer";
  id: string;
  text: string;
  count: number;
  rank: number;
}

export interface Surveys_surveys {
  __typename: "Survey";
  id: string;
  title: string | null;
  totalAnswers: number | null;
  answers: Surveys_surveys_answers[];
}

export interface Surveys {
  surveys: Surveys_surveys[];
}
