import { Player } from "./NamedEntity";

export type Team = {
  players: Player[],
}

export type PlayingTeam = Team;

export type IdleTeam = Team;