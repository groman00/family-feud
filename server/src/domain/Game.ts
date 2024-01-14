import { Host } from "./NamedEntity";
import { Round } from "./Round";
import { IdleTeam, PlayingTeam, Team } from "./Team";

export type Game = {
  rounds: Round[],
  host: Host,
  teams: Array<Team | PlayingTeam | IdleTeam>
};