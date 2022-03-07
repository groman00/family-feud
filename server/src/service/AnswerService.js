// Todo: AnswerRepository
const models = require('../../database/models');

class AnswerService {

  reveal(id, revealed = true) {
    return models.Answer.update({
      revealed
    }, {
      where: {
        id
      }
    });    
  }

  revealBySurveyId(surveyId, revealed = true) {
    return models.Answer.update({
      revealed
    }, {
      where: {            
        surveyId
      }
    });    
  }

  getBySurveyId(surveyId) {
    return models.Answer.findAll({
      where: {
        surveyId
      }
    });    
  }
}

module.exports = new AnswerService();