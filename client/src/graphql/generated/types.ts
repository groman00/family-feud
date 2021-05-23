import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Answer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  surveyId: Scalars['ID'];
  count: Scalars['Int'];
  text: Scalars['String'];
  rank: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Query = {
  __typename?: 'Query';
  surveys: Array<Survey>;
  survey?: Maybe<Survey>;
};


export type QuerySurveyArgs = {
  id: Scalars['ID'];
};

export type Survey = {
  __typename?: 'Survey';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  totalAnswers?: Maybe<Scalars['Int']>;
  answers: Array<Answer>;
};


export type SurveysQueryVariables = Exact<{ [key: string]: never; }>;


export type SurveysQuery = (
  { __typename?: 'Query' }
  & { surveys: Array<(
    { __typename?: 'Survey' }
    & Pick<Survey, 'id' | 'title' | 'totalAnswers'>
    & { answers: Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'id' | 'surveyId' | 'text' | 'count' | 'rank'>
    )> }
  )> }
);


export const SurveysDocument = gql`
    query Surveys {
  surveys {
    id
    title
    totalAnswers
    answers {
      id
      surveyId
      text
      count
      rank
    }
  }
}
    `;

/**
 * __useSurveysQuery__
 *
 * To run a query within a React component, call `useSurveysQuery` and pass it any options that fit your needs.
 * When your component renders, `useSurveysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSurveysQuery({
 *   variables: {
 *   },
 * });
 */
export function useSurveysQuery(baseOptions?: Apollo.QueryHookOptions<SurveysQuery, SurveysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SurveysQuery, SurveysQueryVariables>(SurveysDocument, options);
      }
export function useSurveysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SurveysQuery, SurveysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SurveysQuery, SurveysQueryVariables>(SurveysDocument, options);
        }
export type SurveysQueryHookResult = ReturnType<typeof useSurveysQuery>;
export type SurveysLazyQueryHookResult = ReturnType<typeof useSurveysLazyQuery>;
export type SurveysQueryResult = Apollo.QueryResult<SurveysQuery, SurveysQueryVariables>;