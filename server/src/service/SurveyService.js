const { surveyRepository } = require('../repository');

class SurveyService {

  getByGameId(gameId) {
    return surveyRepository.findOneByFields({ gameId });
  }

  async giveStrike(id) {
    const survey = await surveyRepository.findOneByFields({ id });

    if (survey.strikes < 3) {
      await survey.update({
        strikes: survey.strikes + 1
      });
      await survey.save();
    }

    return survey;
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