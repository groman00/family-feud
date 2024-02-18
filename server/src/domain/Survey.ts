import { Answer, Answers, RevealedAnswer } from "./Answer";
import { Team } from "./Team";
import { RevealSurvey } from "./behaviors";

export interface SurveyInterface {
  answers: Answers;
};

export class Survey implements SurveyInterface {
  #value: string;
  answers: Answers;
  reveal: RevealSurvey = () => ({
    answers: this.answers,
    value: this.#value,
  })
  constructor(answers: Answers) {
    this.answers = answers;
    this.#value = 'Test Survey';
  }
}

export type RevealedSurvey = SurveyInterface & {
  value: string;
}

export class CompletedSurvey extends Survey {
  // winningTeam: Team;
};

export type Surveys = Survey | RevealedSurvey | CompletedSurvey;
