export type Answer = {
  answerRanking: number;
};

export type RevealedAnswer = Answer & {
  value: string;
}

export type BestAnswer = RevealedAnswer & {
  answerRanking: 0;
}

export type Answers = Array<Answer | RevealedAnswer | BestAnswer>;