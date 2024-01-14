import { Player } from "./NamedEntity";
import { Survey } from "./Survey";
import { PlayingTeam } from "./Team";
import { BuzzingPlayers, TeamPlayer } from "./TeamPlayer";
import { Strikes } from "./aliases";
import { BuzzIn, GuessAnswer, PassOrPlay, StartRound, StealRound } from "./behaviors";

export interface RoundInterface {
  survey: Survey;
};

export class Round implements RoundInterface {
  survey: Survey;
  startRound = (buzzingPlayers: BuzzingPlayers) => {
    return new StartedRound(this.survey, buzzingPlayers);
  }
  constructor(survey: Survey) {
    this.survey = survey;
  }
}

export class StartedRound implements RoundInterface {
  survey: Survey;
  buzzingPlayers: BuzzingPlayers;
  buzzIn: BuzzIn;
  passOrPlay: PassOrPlay;
  constructor(survey: Survey, buzzingPlayers: BuzzingPlayers) {
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