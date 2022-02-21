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
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  surveyId: Scalars['ID'];
  count: Scalars['Int'];
  text: Scalars['String'];
  rank: Scalars['Int'];
  revealed: Scalars['Boolean'];
};

export type Game = {
  __typename?: 'Game';
  token?: Maybe<Scalars['String']>;
  players: Array<Player>;
  survey?: Maybe<Survey>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame?: Maybe<Game>;
  startGame?: Maybe<Game>;
  joinGame?: Maybe<Game>;
  revealAnswer?: Maybe<Game>;
  giveStrike?: Maybe<Game>;
};


export type MutationStartGameArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationJoinGameArgs = {
  token: Scalars['String'];
  playerName: Scalars['String'];
};


export type MutationRevealAnswerArgs = {
  answerId: Scalars['String'];
  token: Scalars['String'];
};


export type MutationGiveStrikeArgs = {
  surveyId: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  surveys: Array<Survey>;
  survey?: Maybe<Survey>;
  games?: Maybe<Array<Maybe<Game>>>;
};


export type QuerySurveyArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  gameCreated?: Maybe<Game>;
  gameStarted?: Maybe<Game>;
  playerJoined?: Maybe<Game>;
  answerRevealed?: Maybe<Game>;
  strikeGiven?: Maybe<Game>;
};

export type Survey = {
  __typename?: 'Survey';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  totalAnswers?: Maybe<Scalars['Int']>;
  answers: Array<Answer>;
  gameId?: Maybe<Scalars['Int']>;
  strikes: Scalars['Int'];
};

export type CreateGameMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGameMutation = (
  { __typename?: 'Mutation' }
  & { createGame?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type GiveStrikeMutationVariables = Exact<{
  surveyId: Scalars['String'];
}>;


export type GiveStrikeMutation = (
  { __typename?: 'Mutation' }
  & { giveStrike?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type JoinGameMutationVariables = Exact<{
  token: Scalars['String'];
  playerName: Scalars['String'];
}>;


export type JoinGameMutation = (
  { __typename?: 'Mutation' }
  & { joinGame?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type OnAnswerRevealedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnAnswerRevealedSubscription = (
  { __typename?: 'Subscription' }
  & { answerRevealed?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type OnGameCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnGameCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { gameCreated?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type OnGameStartedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnGameStartedSubscription = (
  { __typename?: 'Subscription' }
  & { gameStarted?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type OnPlayerJoinedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnPlayerJoinedSubscription = (
  { __typename?: 'Subscription' }
  & { playerJoined?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type RevealAnswerMutationVariables = Exact<{
  answerId: Scalars['String'];
  token: Scalars['String'];
}>;


export type RevealAnswerMutation = (
  { __typename?: 'Mutation' }
  & { revealAnswer?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export type StartGameMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type StartGameMutation = (
  { __typename?: 'Mutation' }
  & { startGame?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

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

export type GameFieldsFragment = (
  { __typename?: 'Game' }
  & Pick<Game, 'token'>
  & { survey?: Maybe<(
    { __typename?: 'Survey' }
    & Pick<Survey, 'id' | 'title' | 'totalAnswers' | 'strikes'>
    & { answers: Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'id' | 'surveyId' | 'text' | 'count' | 'rank' | 'revealed'>
    )> }
  )>, players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'name'>
  )> }
);

export type OnStrikeGivenSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnStrikeGivenSubscription = (
  { __typename?: 'Subscription' }
  & { strikeGiven?: Maybe<(
    { __typename?: 'Game' }
    & GameFieldsFragment
  )> }
);

export const GameFieldsFragmentDoc = gql`
    fragment GameFields on Game {
  survey {
    id
    title
    totalAnswers
    answers {
      id
      surveyId
      text
      count
      rank
      revealed
    }
    strikes
  }
  token
  players {
    id
    name
  }
}
    `;
export const CreateGameDocument = gql`
    mutation CreateGame {
  createGame {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const GiveStrikeDocument = gql`
    mutation GiveStrike($surveyId: String!) {
  giveStrike(surveyId: $surveyId) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type GiveStrikeMutationFn = Apollo.MutationFunction<GiveStrikeMutation, GiveStrikeMutationVariables>;

/**
 * __useGiveStrikeMutation__
 *
 * To run a mutation, you first call `useGiveStrikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGiveStrikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [giveStrikeMutation, { data, loading, error }] = useGiveStrikeMutation({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useGiveStrikeMutation(baseOptions?: Apollo.MutationHookOptions<GiveStrikeMutation, GiveStrikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GiveStrikeMutation, GiveStrikeMutationVariables>(GiveStrikeDocument, options);
      }
export type GiveStrikeMutationHookResult = ReturnType<typeof useGiveStrikeMutation>;
export type GiveStrikeMutationResult = Apollo.MutationResult<GiveStrikeMutation>;
export type GiveStrikeMutationOptions = Apollo.BaseMutationOptions<GiveStrikeMutation, GiveStrikeMutationVariables>;
export const JoinGameDocument = gql`
    mutation JoinGame($token: String!, $playerName: String!) {
  joinGame(token: $token, playerName: $playerName) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type JoinGameMutationFn = Apollo.MutationFunction<JoinGameMutation, JoinGameMutationVariables>;

/**
 * __useJoinGameMutation__
 *
 * To run a mutation, you first call `useJoinGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGameMutation, { data, loading, error }] = useJoinGameMutation({
 *   variables: {
 *      token: // value for 'token'
 *      playerName: // value for 'playerName'
 *   },
 * });
 */
export function useJoinGameMutation(baseOptions?: Apollo.MutationHookOptions<JoinGameMutation, JoinGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument, options);
      }
export type JoinGameMutationHookResult = ReturnType<typeof useJoinGameMutation>;
export type JoinGameMutationResult = Apollo.MutationResult<JoinGameMutation>;
export type JoinGameMutationOptions = Apollo.BaseMutationOptions<JoinGameMutation, JoinGameMutationVariables>;
export const OnAnswerRevealedDocument = gql`
    subscription OnAnswerRevealed {
  answerRevealed {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;

/**
 * __useOnAnswerRevealedSubscription__
 *
 * To run a query within a React component, call `useOnAnswerRevealedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnAnswerRevealedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnAnswerRevealedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnAnswerRevealedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnAnswerRevealedSubscription, OnAnswerRevealedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnAnswerRevealedSubscription, OnAnswerRevealedSubscriptionVariables>(OnAnswerRevealedDocument, options);
      }
export type OnAnswerRevealedSubscriptionHookResult = ReturnType<typeof useOnAnswerRevealedSubscription>;
export type OnAnswerRevealedSubscriptionResult = Apollo.SubscriptionResult<OnAnswerRevealedSubscription>;
export const OnGameCreatedDocument = gql`
    subscription OnGameCreated {
  gameCreated {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;

/**
 * __useOnGameCreatedSubscription__
 *
 * To run a query within a React component, call `useOnGameCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnGameCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnGameCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnGameCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnGameCreatedSubscription, OnGameCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnGameCreatedSubscription, OnGameCreatedSubscriptionVariables>(OnGameCreatedDocument, options);
      }
export type OnGameCreatedSubscriptionHookResult = ReturnType<typeof useOnGameCreatedSubscription>;
export type OnGameCreatedSubscriptionResult = Apollo.SubscriptionResult<OnGameCreatedSubscription>;
export const OnGameStartedDocument = gql`
    subscription OnGameStarted {
  gameStarted {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;

/**
 * __useOnGameStartedSubscription__
 *
 * To run a query within a React component, call `useOnGameStartedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnGameStartedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnGameStartedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnGameStartedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnGameStartedSubscription, OnGameStartedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnGameStartedSubscription, OnGameStartedSubscriptionVariables>(OnGameStartedDocument, options);
      }
export type OnGameStartedSubscriptionHookResult = ReturnType<typeof useOnGameStartedSubscription>;
export type OnGameStartedSubscriptionResult = Apollo.SubscriptionResult<OnGameStartedSubscription>;
export const OnPlayerJoinedDocument = gql`
    subscription OnPlayerJoined {
  playerJoined {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;

/**
 * __useOnPlayerJoinedSubscription__
 *
 * To run a query within a React component, call `useOnPlayerJoinedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnPlayerJoinedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnPlayerJoinedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnPlayerJoinedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnPlayerJoinedSubscription, OnPlayerJoinedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnPlayerJoinedSubscription, OnPlayerJoinedSubscriptionVariables>(OnPlayerJoinedDocument, options);
      }
export type OnPlayerJoinedSubscriptionHookResult = ReturnType<typeof useOnPlayerJoinedSubscription>;
export type OnPlayerJoinedSubscriptionResult = Apollo.SubscriptionResult<OnPlayerJoinedSubscription>;
export const RevealAnswerDocument = gql`
    mutation RevealAnswer($answerId: String!, $token: String!) {
  revealAnswer(answerId: $answerId, token: $token) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type RevealAnswerMutationFn = Apollo.MutationFunction<RevealAnswerMutation, RevealAnswerMutationVariables>;

/**
 * __useRevealAnswerMutation__
 *
 * To run a mutation, you first call `useRevealAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevealAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revealAnswerMutation, { data, loading, error }] = useRevealAnswerMutation({
 *   variables: {
 *      answerId: // value for 'answerId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRevealAnswerMutation(baseOptions?: Apollo.MutationHookOptions<RevealAnswerMutation, RevealAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevealAnswerMutation, RevealAnswerMutationVariables>(RevealAnswerDocument, options);
      }
export type RevealAnswerMutationHookResult = ReturnType<typeof useRevealAnswerMutation>;
export type RevealAnswerMutationResult = Apollo.MutationResult<RevealAnswerMutation>;
export type RevealAnswerMutationOptions = Apollo.BaseMutationOptions<RevealAnswerMutation, RevealAnswerMutationVariables>;
export const StartGameDocument = gql`
    mutation StartGame($token: String!) {
  startGame(token: $token) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type StartGameMutationFn = Apollo.MutationFunction<StartGameMutation, StartGameMutationVariables>;

/**
 * __useStartGameMutation__
 *
 * To run a mutation, you first call `useStartGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startGameMutation, { data, loading, error }] = useStartGameMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useStartGameMutation(baseOptions?: Apollo.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, options);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = Apollo.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = Apollo.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
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
export const OnStrikeGivenDocument = gql`
    subscription onStrikeGiven {
  strikeGiven {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;

/**
 * __useOnStrikeGivenSubscription__
 *
 * To run a query within a React component, call `useOnStrikeGivenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnStrikeGivenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnStrikeGivenSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnStrikeGivenSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnStrikeGivenSubscription, OnStrikeGivenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnStrikeGivenSubscription, OnStrikeGivenSubscriptionVariables>(OnStrikeGivenDocument, options);
      }
export type OnStrikeGivenSubscriptionHookResult = ReturnType<typeof useOnStrikeGivenSubscription>;
export type OnStrikeGivenSubscriptionResult = Apollo.SubscriptionResult<OnStrikeGivenSubscription>;