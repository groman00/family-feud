import { BestAnswer, RevealedAnswer } from "./Answer";
import { PlayingRound } from "./Round";
import { CompletedSurvey, Survey } from "./Survey";
import { BadGuess } from "./aliases";

export type GuessResponse = {
  response: BestAnswer | RevealedAnswer | BadGuess;
  playingRound: PlayingRound;
  survey: CompletedSurvey | Survey;
}