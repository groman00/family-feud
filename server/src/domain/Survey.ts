import { Answer, Answers, RevealedAnswer } from "./Answer";
import { Team } from "./Team";
// import { RevealSurvey } from "./behaviors";

export interface SurveyInterface {
  answers: Answers;
  value?: string;
  // reveal: RevealSurvey;
};

// export type RevealedSurvey = TSurvey {}

export class Survey implements SurveyInterface {
  answers: Answers;
  // value: string;
  constructor(answers: Answers) {
    this.answers = answers;
  }
}

export class CompletedSurvey extends Survey {
  // winningTeam: Team;
};


// class HiddenSurvey extends Survey {
//   reveal: RevealSurvey = () => {
//     return new RevealedSurvey()
//   }
// }

// export class RevealedSurvey extends Survey {
//   // constructor ()
// }