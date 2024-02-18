"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartedRound = exports.Round = void 0;
const Guess_1 = require("./Guess");
;
class Round {
    constructor(survey, buzzingPlayers) {
        this.startRound = () => {
            const revealedSurvey = this.survey.reveal();
            return new StartedRound(revealedSurvey, this.buzzingPlayers);
        };
        this.survey = survey;
        this.buzzingPlayers = buzzingPlayers;
    }
}
exports.Round = Round;
class StartedRound {
    // passOrPlay: PassOrPlay;
    constructor(survey, buzzingPlayers) {
        this.buzzIn = (player, guess) => ({
            response: Guess_1.BadGuess
            // playingRound: PlayingRound;
            // survey: CompletedSurvey | Survey;
        });
        this.survey = survey;
        this.buzzingPlayers = buzzingPlayers;
    }
}
exports.StartedRound = StartedRound;
;
