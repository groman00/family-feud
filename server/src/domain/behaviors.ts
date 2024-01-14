import { Player } from "./NamedEntity";
import { PlayingRound, StartedRound } from "./Round";
// import { RevealedSurvey } from "./Survey";
import { Team } from "./Team";
import { Guess } from "./aliases";
import { GuessResponse } from "./responses";

export type StartRound = (teams: Team[]) => StartedRound;

// export type AttachSurvey = () => RevealedSurvey;

export type BuzzIn = (player: Player) => GuessResponse;

export type PassOrPlay = (team: Team) => PlayingRound;

export type GuessAnswer = (guess: Guess) => GuessResponse;

export type StealRound = (guess: Guess) => GuessResponse;