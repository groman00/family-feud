"use strict";
exports.__esModule = true;
exports.StartedRound = exports.Round = void 0;
;
// Where does this go?
// attachSurvey
var Round = /** @class */ (function () {
    function Round(survey) {
        this.startRound = function () {
            return new StartedRound();
        };
        this.survey = survey;
    }
    return Round;
}());
exports.Round = Round;
var StartedRound = /** @class */ (function () {
    function StartedRound() {
    }
    return StartedRound;
}());
exports.StartedRound = StartedRound;
;
