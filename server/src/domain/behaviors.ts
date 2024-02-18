import { PlayingRound, StartedRound } from "./Round";
import { RevealedSurvey } from "./Survey";
import { Team } from "./Team";
import { TeamPlayer } from "./TeamPlayer";
import { Guess } from "./Guess";
import { GuessResponse } from "./responses";

export type StartRound = (teams: Team[]) => StartedRound;

export type RevealSurvey = () => RevealedSurvey;

export type BuzzIn = (player: TeamPlayer, guess: Guess) => GuessResponse;

export type PassOrPlay = (team: Team) => PlayingRound;

export type GuessAnswer = (guess: Guess) => GuessResponse;

export type StealRound = (guess: Guess) => GuessResponse;