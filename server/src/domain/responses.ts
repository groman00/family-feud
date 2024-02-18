import { BestAnswer, RevealedAnswer } from "./Answer";
import { PlayingRound } from "./Round";
import { CompletedSurvey, Survey } from "./Survey";
import { BadGuess } from "./Guess";

export type GuessResponse = {
  response: BadGuess;
  // response: BestAnswer | RevealedAnswer | BadGuess;
  // playingRound: PlayingRound;
  // survey: CompletedSurvey | Survey;
}