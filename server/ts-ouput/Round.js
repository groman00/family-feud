"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartedRound = exports.Round = void 0;
;
class Round {
    constructor(survey) {
        this.startRound = (buzzingPlayers) => {
            return new StartedRound(this.survey, buzzingPlayers);
        };
        this.survey = survey;
    }
}
exports.Round = Round;
class StartedRound {
    constructor(survey, buzzingPlayers) {
        this.survey = survey;
        this.buzzingPlayers = buzzingPlayers;
    }
}
exports.StartedRound = StartedRound;
;
