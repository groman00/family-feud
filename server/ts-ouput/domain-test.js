"use strict";
exports.__esModule = true;
var Round_1 = require("./Round");
var Survey_1 = require("./Survey");
var createSurvey = function () {
    var answers = [{ answerRanking: 0 }, { answerRanking: 1 }];
    return new Survey_1.Survey(answers);
};
var createRound = function (survey) {
    return new Round_1.Round(survey);
};
var createGame = function () {
    var survey = createSurvey();
    var round = createRound(survey);
    return {
        host: {
            name: 'Steve Harvey'
        },
        rounds: [
            round,
        ],
        teams: []
    };
};
console.log(createGame());
