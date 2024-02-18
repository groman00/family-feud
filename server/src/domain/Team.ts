import { NamedEntity, Player } from "./NamedEntity";

export type Team = NamedEntity & {
  players: Player[];
}

export type PlayingTeam = Team;

export type IdleTeam = Team;

export type Teams = Team | PlayingTeam | IdleTeam;