import { Game } from './Game';
import { BadGuess } from './Guess';
import { Host, Player } from './NamedEntity';
import { Round } from './Round';
import { Survey } from './Survey';
import { Team } from './Team';
import { BuzzingPlayers, TeamPlayer } from './TeamPlayer';

const createSurvey = () => {
  const answers = [{ answerRanking: 0 }, { answerRanking: 1 }];
  return new Survey(answers);
};

const createRound = (survey: Survey, buzzingPlayers: BuzzingPlayers) => {
  return new Round(survey, buzzingPlayers);
};

const createHost = () => ({
  name: 'Steve Harvey'
});

const createTeam = (name: string): Team => {
  const now = Date.now();
  return {
    name,
    players: [
      { name: `A${now}` },
      { name: `B${now}` }
    ]
  };
};

const toTeamPlayer = (team: Team, player: Player): TeamPlayer => ({
  team,
  player,
});

const createGame = (): Game => {
  const survey = createSurvey();
  const team1 = createTeam('Team 1');
  const team2 = createTeam('Team 2');
  // const [team1FirstPlayer] = team1.players;
  // const [team2FirstPlayer] = team2.players;
  const team1Player = toTeamPlayer(team1, team1.players[0])
  const team2Player = toTeamPlayer(team2, team2.players[0])

  const round = createRound(
    survey, 
    [team1Player, team2Player]
  );

  return {
    host: createHost(),
    rounds: [
      round,
    ],
    teams: [
      team1,
      team2,
    ],
  };
}


// Play a game
// GameService?
(() => {
  const game = createGame();

  console.log('Created Game');
  console.log(game);

  const { rounds, teams } = game;
  const [currentRound] = rounds;
  // const [currentRound] = rounds;
  // const [team1, team2] = teams;
  // const [team1FirstPlayer] = team1.players;
  // const [team2FirstPlayer] = team2.players;
  // const team1Player = toTeamPlayer(team1, team1.players[0])
  // const team2Player = toTeamPlayer(team2, team2.players[0])

  const startedRound = currentRound.startRound();

  console.log('Started Round');
  console.log(startedRound);

  // const revealedSurvey = startedRound.survey.reveal();

  // console.log('Survey Revealed');
  // console.log(revealedSurvey);

  const guessResponse = startedRound.buzzIn(
    startedRound.buzzingPlayers[0],
    'Some bad guess',
  );

  console.log('Guess Response');
  if (guessResponse.response === BadGuess) {
    console.log('Bad Guess');
  }
  console.log(guessResponse);

  // Next step is pass or play

})();
