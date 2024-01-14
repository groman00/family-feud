import { Player } from "./NamedEntity";
import { Team } from "./Team";

export type TeamPlayer = {
  player: Player;
  team: Team;
}

export type BuzzingPlayers = [TeamPlayer, TeamPlayer];