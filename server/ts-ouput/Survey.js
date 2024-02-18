"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedSurvey = exports.Survey = void 0;
;
class Survey {
    constructor(answers) {
        this.reveal = () => ({
            answers: this.answers,
            value: this.#value,
        });
        this.answers = answers;
        this.#value = 'Test Survey';
    }
    #value;
}
exports.Survey = Survey;
class CompletedSurvey extends Survey {
}
exports.CompletedSurvey = CompletedSurvey;
;
