import { Player } from "./NamedEntity";
import { Survey } from "./Survey";
import { PlayingTeam } from "./Team";
import { TeamPlayer } from "./TeamPlayer";
import { Strikes } from "./aliases";
import { BuzzIn, GuessAnswer, PassOrPlay, StartRound, StealRound } from "./behaviors";

export interface RoundInterface {
  survey: Survey;
  // startRound: StartRound;
};

// Where does this go?
// attachSurvey

export class Round implements RoundInterface {
  survey: Survey;
  startRound = () => {
    return new StartedRound();
  }
  constructor(survey: Survey) {
    this.survey = survey;
  }
}

export class StartedRound implements RoundInterface {
  survey: Survey;
  buzzingPlayers: [TeamPlayer, TeamPlayer];
  buzzIn: BuzzIn;
  passOrPlay: PassOrPlay;
};

export type PlayingRound = Round & {
  team: PlayingTeam;
  guessingPlayer: Player;
  strikes: Strikes;
  guessAnswer: GuessAnswer;
  stealRound: StealRound;
};