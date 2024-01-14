"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CompletedSurvey = exports.Survey = void 0;
;
// export type RevealedSurvey = TSurvey {}
var Survey = /** @class */ (function () {
    // value: string;
    function Survey(answers) {
        this.answers = answers;
    }
    return Survey;
}());
exports.Survey = Survey;
var CompletedSurvey = /** @class */ (function (_super) {
    __extends(CompletedSurvey, _super);
    function CompletedSurvey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CompletedSurvey;
}(Survey));
exports.CompletedSurvey = CompletedSurvey;
;
// class HiddenSurvey extends Survey {
//   reveal: RevealSurvey = () => {
//     return new RevealedSurvey()
//   }
// }
// export class RevealedSurvey extends Survey {
//   // constructor ()
// }
