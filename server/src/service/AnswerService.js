const { answerRepository } = require('../repository');

class AnswerService {

  reveal(id, revealed = true) {
    return answerRepository.updateWithFields({ revealed }, { id });
  }

  revealBySurveyId(surveyId, revealed = true) {
    return answerRepository.updateWithFields({ revealed }, { surveyId });
  }

  getBySurveyId(surveyId) {
    return answerRepository.findAllByFields({ surveyId });
  }
}

module.exports = new AnswerService();