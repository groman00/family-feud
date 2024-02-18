"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guess_1 = require("./Guess");
const Round_1 = require("./Round");
const Survey_1 = require("./Survey");
const createSurvey = () => {
    const answers = [{ answerRanking: 0 }, { answerRanking: 1 }];
    return new Survey_1.Survey(answers);
};
const createRound = (survey, buzzingPlayers) => {
    return new Round_1.Round(survey, buzzingPlayers);
};
const createHost = () => ({
    name: 'Steve Harvey'
});
const createTeam = (name) => {
    const now = Date.now();
    return {
        name,
        players: [
            { name: `A${now}` },
            { name: `B${now}` }
        ]
    };
};
const toTeamPlayer = (team, player) => ({
    team,
    player,
});
const createGame = () => {
    const survey = createSurvey();
    const team1 = createTeam('Team 1');
    const team2 = createTeam('Team 2');
    // const [team1FirstPlayer] = team1.players;
    // const [team2FirstPlayer] = team2.players;
    const team1Player = toTeamPlayer(team1, team1.players[0]);
    const team2Player = toTeamPlayer(team2, team2.players[0]);
    const round = createRound(survey, [team1Player, team2Player]);
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
};
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
    const guessResponse = startedRound.buzzIn(startedRound.buzzingPlayers[0], 'Some bad guess');
    console.log('Guess Response');
    if (guessResponse.response === Guess_1.BadGuess) {
        console.log('Bad Guess');
    }
    console.log(guessResponse);
    // Next step is pass or play
})();
