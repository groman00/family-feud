const { surveyRepository } = require('../repository');

class SurveyService {

  getByGameId(gameId) {
    return surveyRepository.findOneByFields({ gameId });
  }

  getById(id) {
    return surveyRepository.findOneByFields({ id });
  }

  setGame(id, gameId) {
    return surveyRepository.updateWithFields({ 
      gameId,
      strikes: 0,
    }, { 
      id 
    });
  }
}

module.exports = new SurveyService();