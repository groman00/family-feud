import { Host } from "./NamedEntity";
import { Round } from "./Round";
import { IdleTeam, PlayingTeam, Team, Teams } from "./Team";

export type Game = {
  rounds: Round[], // This should be a triple
  host: Host,
  teams: [Teams, Teams]
};