import { BadGuess } from "./Guess";
import { Player } from "./NamedEntity";
import { RevealedSurvey, Survey, Surveys } from "./Survey";
import { PlayingTeam } from "./Team";
import { BuzzingPlayers, TeamPlayer } from "./TeamPlayer";
import { Strikes } from "./aliases";
import { BuzzIn, GuessAnswer, PassOrPlay, StartRound, StealRound } from "./behaviors";

export interface RoundInterface {
  survey: Surveys;
  // Do we need buzzing players?
  buzzingPlayers: BuzzingPlayers;
};

export class Round implements RoundInterface {
  survey: Survey;
  buzzingPlayers: BuzzingPlayers;
  startRound = () => {
    const revealedSurvey = this.survey.reveal();
    return new StartedRound(revealedSurvey, this.buzzingPlayers);
  }
  constructor(survey: Survey, buzzingPlayers: BuzzingPlayers) {
    this.survey = survey;
    this.buzzingPlayers = buzzingPlayers;
  }
}

export class StartedRound implements RoundInterface {
  survey: RevealedSurvey;
  buzzingPlayers: BuzzingPlayers;
  buzzIn: BuzzIn = (player, guess) => ({
    response: BadGuess
    // playingRound: PlayingRound;
    // survey: CompletedSurvey | Survey;
  });
  // passOrPlay: PassOrPlay;
  constructor(survey: RevealedSurvey, buzzingPlayers: BuzzingPlayers) {
    this.survey = survey;
    this.buzzingPlayers = buzzingPlayers
  }
};

export type PlayingRound = Round & {
  team: PlayingTeam;
  guessingPlayer: Player;
  strikes: Strikes;
  guessAnswer: GuessAnswer;
  stealRound: StealRound;
};